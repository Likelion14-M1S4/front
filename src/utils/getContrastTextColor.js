// object-fit: cover 기준으로 소스 이미지에서 보이는 영역 좌표를 계산합니다.
function getCoverCrop(srcW, srcH, destW, destH) {
  const srcRatio = srcW / srcH;
  const destRatio = destW / destH;

  let cropW;
  let cropH;
  let cropX;
  let cropY;

  if (srcRatio > destRatio) {
    // 소스가 더 넓음 → 좌우 크롭
    cropH = srcH;
    cropW = srcH * destRatio;
    cropX = (srcW - cropW) / 2;
    cropY = 0;
  } else {
    // 소스가 더 높음 → 상하 크롭
    cropW = srcW;
    cropH = srcW / destRatio;
    cropX = 0;
    cropY = (srcH - cropH) / 2;
  }

  return { cropX, cropY, cropW, cropH };
}

/**
 * 이미지 하단(텍스트 오버레이 영역) 평균 밝기로 검정/하양 텍스트 색을 반환합니다.
 * displayWidth/displayHeight를 넘기면 object-fit: cover 기준으로 보이는 하단을 샘플링합니다.
 */
export async function getContrastTextColor(
  imageUrl,
  { displayWidth, displayHeight } = {},
) {
  if (!imageUrl) return '#000000';

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      try {
        const srcW = img.naturalWidth || img.width;
        const srcH = img.naturalHeight || img.height;
        if (!srcW || !srcH) {
          resolve('#000000');
          return;
        }

        const destW = displayWidth || srcW;
        const destH = displayHeight || srcH;
        const { cropX, cropY, cropW, cropH } = getCoverCrop(
          srcW,
          srcH,
          destW,
          destH,
        );

        // 샘플용 캔버스 (보이는 영역만)
        const sampleCanvasW = Math.max(1, Math.round(destW));
        const sampleCanvasH = Math.max(1, Math.round(destH));
        const canvas = document.createElement('canvas');
        canvas.width = sampleCanvasW;
        canvas.height = sampleCanvasH;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve('#000000');
          return;
        }

        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropW,
          cropH,
          0,
          0,
          sampleCanvasW,
          sampleCanvasH,
        );

        // 텍스트가 올라가는 좌하단 영역만 샘플링
        const sampleX = 0;
        const sampleY = Math.floor(sampleCanvasH * 0.65);
        const sampleW = Math.max(1, Math.floor(sampleCanvasW * 0.7));
        const sampleH = Math.max(1, sampleCanvasH - sampleY);
        const { data } = ctx.getImageData(sampleX, sampleY, sampleW, sampleH);

        let totalLuma = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 128) continue;
          // ITU-R BT.601 휘도
          totalLuma += 0.299 * r + 0.587 * g + 0.114 * b;
          count += 1;
        }

        const average = count ? totalLuma / count : 255;
        resolve(average < 150 ? '#ffffff' : '#000000');
      } catch {
        // 캔버스 읽기 실패 시 오버레이 가독성을 위해 흰색 기본값
        resolve('#ffffff');
      }
    };

    img.onerror = () => resolve('#ffffff');
    img.src = imageUrl;
  });
}
