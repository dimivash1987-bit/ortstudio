import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "port");
const OUT = path.join(ROOT, "public", "portfolio");

/** @type {Record<string, { slug: string; title: string; location: string }>} */
const PROJECTS = {
  алибегова: { slug: "alibegova", title: "Квартира на Алибегова", location: "Минск" },
  апарты1: { slug: "apartments-1", title: "Апартаменты", location: "Минск" },
  апарты2: { slug: "apartments-2", title: "Апартаменты", location: "Минск" },
  баня: { slug: "banya", title: "Баня", location: "Беларусь" },
  глебки: { slug: "glebki", title: "Дом в Глебках", location: "Глебки" },
  "дом НЙ": { slug: "dom-ny", title: "Загородный дом", location: "Беларусь" },
  ЗГ1: { slug: "zg-1", title: "Квартира ЗГ", location: "Минск" },
  ЗГ2: { slug: "zg-2", title: "Квартира ЗГ", location: "Минск" },
  ЗГ3: { slug: "zg-3", title: "Квартира ЗГ", location: "Минск" },
  кинотеатр: { slug: "cinema", title: "Домашний кинотеатр", location: "Минск" },
  княгининская: { slug: "knyagininskaya", title: "Квартира на Княгининской", location: "Минск" },
  колодищи: { slug: "kolodishchi", title: "Дом в Колодищах", location: "Колодищи" },
  "минск мир1": { slug: "minsk-mir", title: "Квартира в Минск Мир", location: "Минск" },
  "северный берег": { slug: "severny-bereg", title: "Северный берег", location: "Минск" },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeFile(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(outputPath);
}

async function main() {
  await ensureDir(OUT);
  const dirs = await fs.readdir(SRC, { withFileTypes: true });
  const manifest = [];

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    const meta = PROJECTS[dir.name];
    if (!meta) {
      console.warn(`Skip unmapped folder: ${dir.name}`);
      continue;
    }

    const srcDir = path.join(SRC, dir.name);
    const outDir = path.join(OUT, meta.slug);
    await ensureDir(outDir);

    const files = (await fs.readdir(srcDir))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, "ru"));

    const images = [];
    for (const file of files) {
      const base = path.parse(file).name.replace(/[^a-zA-Z0-9_-]+/g, "-").toLowerCase();
      const outName = `${base}.webp`;
      const inputPath = path.join(srcDir, file);
      const outputPath = path.join(outDir, outName);
      await optimizeFile(inputPath, outputPath);
      images.push(`/portfolio/${meta.slug}/${outName}`);
      process.stdout.write(".");
    }

    manifest.push({
      slug: meta.slug,
      title: meta.title,
      location: meta.location,
      cover: images[0],
      images,
    });
    console.log(`\n${meta.slug}: ${images.length} images`);
  }

  manifest.sort((a, b) => a.title.localeCompare(b.title, "ru"));
  await fs.writeFile(
    path.join(ROOT, "src", "data", "portfolio.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );
  console.log(`\nDone. Projects: ${manifest.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
