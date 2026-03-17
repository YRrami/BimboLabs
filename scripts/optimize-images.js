import fs from "fs";
import path from "path";

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (err) {
    console.error('\nSharp is not installed. Run: npm install --save-dev sharp\n');
    process.exit(1);
  }

  const inputDir = path.resolve(process.cwd(), 'src', 'assets', 'companies');
  const outDir = path.join(inputDir, 'optimized');
  if (!fs.existsSync(inputDir)) {
    console.error('Input directory not found:', inputDir);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const widths = [320, 640, 1024];
  const formats = ['webp', 'avif'];
  const supported = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

  const files = fs.readdirSync(inputDir).filter(f => supported.includes(path.extname(f).toLowerCase()));
  const manifest = {};

  for (const file of files) {
    const name = path.parse(file).name;
    const ext = path.parse(file).ext;
    const inputPath = path.join(inputDir, file);
    manifest[file] = [];

    for (const width of widths) {
      for (const fmt of formats) {
        const outName = `${name}-${width}.${fmt}`;
        const outPath = path.join(outDir, outName);
        try {
          await sharp(inputPath)
            .resize({ width, withoutEnlargement: true })
            .toFormat(fmt, { quality: 80 })
            .toFile(outPath);

          manifest[file].push({ width, format: fmt, path: `src/assets/companies/optimized/${outName}` });
          console.log(`Generated ${outName}`);
        } catch (err) {
          console.error(`Failed to convert ${file} -> ${outName}:`, err.message);
        }
      }
    }
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('\nDone. Generated optimized images in src/assets/companies/optimized and manifest.json');
  console.log('Next: install sharp (`npm install --save-dev sharp`) and run `npm run optimize-images`.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
