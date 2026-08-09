// 이미지 하단(텍스트 영역) 평균 밝기를 구해 검정/하양 중 더 잘 보이는 색을 반환합니다.
export async function getContrastTextColor(imageUrl) {
  if (!imageUrl) return '#000000';

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (!width || !height) {
          resolve('#000000');
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve('#000000');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // 텍스트가 올라가는 좌하단 영역만 샘플링
        const sampleX = 0;
        const sampleY = Math.floor(height * 0.7);
        const sampleW = Math.floor(width * 0.55);
        const sampleH = height - sampleY;
        const { data } = ctx.getImageData(sampleX, sampleY, sampleW, sampleH);

        let totalLuma = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // ITU-R BT.601 휘도
          totalLuma += 0.299 * r + 0.587 * g + 0.114 * b;
          count += 1;
        }

        const average = count ? totalLuma / count : 255;
        resolve(average < 140 ? '#ffffff' : '#000000');
      } catch {
        resolve('#000000');
      }
    };

    img.onerror = () => resolve('#000000');
    img.src = imageUrl;
  });
}
