import sharp from 'sharp';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');
const publicBrand = join(repoRoot, 'public', 'brand');

// Определяем исходный файл (приоритет: webp > png)
let inputPath = null;
if (existsSync(join(publicBrand, 'logo-mark.webp'))) {
  inputPath = join(publicBrand, 'logo-mark.webp');
  console.log('Using: logo-mark.webp');
} else if (existsSync(join(publicBrand, 'logo-mark.png'))) {
  inputPath = join(publicBrand, 'logo-mark.png');
  console.log('Using: logo-mark.png');
} else {
  console.error('Error: No logo-mark.webp or logo-mark.png found in public/brand/');
  process.exit(1);
}

async function makeGlyph() {
  try {
    // Загружаем изображение и получаем raw данные
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log(`Input: ${info.width}x${info.height}, channels: ${info.channels}`);

    // Порог для удаления тёмного фона (почти чёрные пиксели)
    const threshold = 30;
    const width = info.width;
    const height = info.height;
    
    // Обрабатываем пиксели: делаем тёмный фон прозрачным
    const processedData = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Если пиксель очень тёмный (почти чёрный), делаем его полностью прозрачным
      if (r < threshold && g < threshold && b < threshold) {
        processedData[i] = 0;
        processedData[i + 1] = 0;
        processedData[i + 2] = 0;
        processedData[i + 3] = 0; // Прозрачный
      } else {
        // Сохраняем оригинальные значения
        processedData[i] = r;
        processedData[i + 1] = g;
        processedData[i + 2] = b;
        processedData[i + 3] = a;
      }
    }

    // Создаём изображение из обработанных данных
    let image = sharp(processedData, {
      raw: {
        width: width,
        height: height,
        channels: 4
      }
    });

    // Обрезаем прозрачные поля (trim)
    image = image.trim({ threshold: 10 });

    // Получаем размеры после trim
    const trimmedMetadata = await image.metadata();
    console.log(`After trim: ${trimmedMetadata.width}x${trimmedMetadata.height}`);

    // Вписываем в квадрат с padding (знак занимает ~90% площади)
    const sizes = [256, 128, 64];
    
    for (const size of sizes) {
      const targetSize = size;
      const padding = Math.floor(targetSize * 0.05); // 5% padding с каждой стороны
      const contentSize = targetSize - padding * 2;
      
      // Вычисляем scale для вписывания
      const scale = Math.min(
        contentSize / trimmedMetadata.width,
        contentSize / trimmedMetadata.height
      );
      
      const scaledWidth = Math.floor(trimmedMetadata.width * scale);
      const scaledHeight = Math.floor(trimmedMetadata.height * scale);
      
      // Центрируем в квадрате
      const offsetX = Math.floor((targetSize - scaledWidth) / 2);
      const offsetY = Math.floor((targetSize - scaledHeight) / 2);
      
      const outputPath = join(publicBrand, `logo-glyph-${size}.png`);
      
      await image
        .clone()
        .resize(scaledWidth, scaledHeight, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .extend({
          top: offsetY,
          bottom: targetSize - scaledHeight - offsetY,
          left: offsetX,
          right: targetSize - scaledWidth - offsetX,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Created: logo-glyph-${size}.png (${targetSize}x${targetSize})`);
    }
    
    console.log('\n✅ Glyph generation complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeGlyph();

