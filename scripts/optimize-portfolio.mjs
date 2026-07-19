import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "port");
const OUT = path.join(ROOT, "public", "portfolio");
const MANIFEST = path.join(ROOT, "src", "data", "portfolio.json");

const CYR_TO_LAT = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function slugify(title, order) {
  const base = title
    .toLowerCase()
    .split("")
    .map((ch) => CYR_TO_LAT[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${String(order).padStart(2, "0")}-${base || "project"}`;
}

/** Число в начале имени файла: 1xxx → 1, 10xxx → 10 */
function leadingNumber(filename) {
  const m = path.parse(filename).name.match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

function sortByLeadingNumber(a, b) {
  const na = leadingNumber(a);
  const nb = leadingNumber(b);
  if (na !== null && nb !== null && na !== nb) return na - nb;
  if (na !== null && nb === null) return -1;
  if (na === null && nb !== null) return 1;
  return a.localeCompare(b, "ru", { numeric: true });
}

/** "1 дом в п. Колодищи" → { order: 1, title: "дом в п. Колодищи" } */
function parseProjectDir(dirName) {
  const m = dirName.match(/^(\d+)\s+(.+)$/u);
  if (!m) return null;
  return { order: Number(m[1]), title: m[2].trim() };
}

async function rmrf(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * Максимальное сжатие без заметной потери качества:
 * WebP q=82 + effort=6, без EXIF, до 1920px по длинной стороне.
 */
async function optimizeFile(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      alphaQuality: 85,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);
}

async function main() {
  await rmrf(OUT);
  await ensureDir(OUT);

  const dirs = (await fs.readdir(SRC, { withFileTypes: true })).filter((d) =>
    d.isDirectory(),
  );

  const manifest = [];

  for (const dir of dirs) {
    const parsed = parseProjectDir(dir.name);
    if (!parsed) {
      console.warn(`Skip folder (no leading order): ${dir.name}`);
      continue;
    }

    const { order, title } = parsed;
    const slug = slugify(title, order);
    const srcDir = path.join(SRC, dir.name);
    const outDir = path.join(OUT, slug);
    await ensureDir(outDir);

    const files = (await fs.readdir(srcDir))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort(sortByLeadingNumber);

    if (files.length === 0) {
      console.warn(`Empty: ${dir.name}`);
      continue;
    }

    const coverName =
      files.find((f) => leadingNumber(f) === 1) ?? files[0];

    /** @type {string[]} */
    const images = [];
    let coverPath = "";

    for (const file of files) {
      const num = leadingNumber(file);
      const rest = path
        .parse(file)
        .name.replace(/^\d+/, "")
        .replace(/[^a-zA-Z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();
      const outName = `${num ?? "x"}-${rest || "photo"}.webp`;
      const inputPath = path.join(srcDir, file);
      const outputPath = path.join(outDir, outName);
      await optimizeFile(inputPath, outputPath);
      const publicPath = `/portfolio/${slug}/${outName}`;
      images.push(publicPath);
      if (file === coverName) coverPath = publicPath;
      process.stdout.write(".");
    }

    if (!coverPath) coverPath = images[0];

    manifest.push({
      order,
      slug,
      title,
      location: "",
      cover: coverPath,
      images,
    });

    console.log(`\n#${order} ${slug}: ${images.length} images, cover=${path.basename(coverPath)}`);
  }

  manifest.sort((a, b) => a.order - b.order);

  await ensureDir(path.dirname(MANIFEST));
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2), "utf8");

  const outSize = (
    await fs.readdir(OUT, { recursive: true, withFileTypes: true })
  )
    .filter((e) => e.isFile())
    .length;

  console.log(`\nDone. Projects: ${manifest.length}, files: ${outSize}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
