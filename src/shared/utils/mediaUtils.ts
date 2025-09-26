// 이미지 파일 비율 계산
export const calculateImageRatio = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    // 클라이언트 사이드에서만 실행되도록 체크
    if (typeof window === "undefined") {
      console.warn("이미지 비율 계산은 클라이언트 사이드에서만 가능합니다.");
      resolve(1); // 기본값 반환
      return;
    }

    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const ratio = img.height / img.width;
      resolve(parseFloat(ratio.toFixed(2)));
      URL.revokeObjectURL(objectUrl);
    };
  });
};

// 비디오 파일 비율 계산
export const calculateVideoRatio = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    // 클라이언트 사이드에서만 실행되도록 체크
    if (typeof window === "undefined") {
      console.warn("비디오 비율 계산은 클라이언트 사이드에서만 가능합니다.");
      resolve(1); // 기본값 반환
      return;
    }

    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      const ratio = video.videoHeight / video.videoWidth;
      resolve(parseFloat(ratio.toFixed(2)));
      URL.revokeObjectURL(objectUrl);
    };
  });
};

export const isHeic = (file: File): boolean => {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  );
};

export const isSvg = (file: File): boolean => {
  return (
    file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg")
  );
};

export const convertHeicToJpeg = async (file: File): Promise<File | null> => {
  if (!isHeic(file)) return null;

  // 클라이언트 사이드에서만 실행되도록 체크
  if (typeof window === "undefined") {
    console.warn("HEIC 변환은 클라이언트 사이드에서만 가능합니다.");
    return null;
  }

  try {
    // Dynamic import로 heic2any 로드
    const heic2any = (await import("heic2any")).default;

    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.8,
    });

    // convertedBlob이 배열인 경우 처리
    const blobToUse = Array.isArray(convertedBlob)
      ? convertedBlob[0]
      : convertedBlob;

    const convertedFile = new File(
      [blobToUse],
      file.name.replace(/\.(heic|heif)$/i, ".jpg"),
      { type: "image/jpeg" }
    );
    return convertedFile;
  } catch (error) {
    console.error("HEIC 변환 오류:", error);
    return null;
  }
};

export const convertSvgToJpeg = async (file: File): Promise<File | null> => {
  if (!isSvg(file)) return null;

  // 클라이언트 사이드에서만 실행되도록 체크
  if (typeof window === "undefined") {
    console.warn("SVG 변환은 클라이언트 사이드에서만 가능합니다.");
    return null;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const svgString = event.target?.result as string;

      // SVG 문자열로부터 이미지 생성
      const img = new Image();

      img.onload = () => {
        // Canvas 생성 및 SVG 그리기
        const canvas = document.createElement("canvas");
        // 적절한 크기 설정 (필요에 따라 조정)
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;

        // SVG가 너무 작은 경우 최소 크기 설정
        if (canvas.width < 100) canvas.width = 800;
        if (canvas.height < 100) canvas.height = 600;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Canvas 2D 컨텍스트를 생성할 수 없습니다.");
          resolve(null);
          return;
        }

        // 배경을 흰색으로 설정 (투명 배경을 방지)
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // SVG 그리기
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // JPEG로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error("JPEG blob을 생성할 수 없습니다.");
              resolve(null);
              return;
            }

            // 새 파일 생성
            const newFileName = file.name.replace(/\.svg$/i, ".jpg");
            const jpegFile = new File([blob], newFileName, {
              type: "image/jpeg",
              lastModified: new Date().getTime(),
            });

            resolve(jpegFile);
          },
          "image/jpeg",
          0.9 // 품질 설정 (0.0 ~ 1.0)
        );
      };

      // SVG 문자열을 Data URL로 변환하여 이미지로 로드
      img.src =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
    };

    reader.onerror = () => {
      console.error("SVG 파일을 읽는 중 오류가 발생했습니다.");
      resolve(null);
    };

    reader.readAsText(file);
  });
};

export const convertToJpeg = async (file: File): Promise<File | null> => {
  // 클라이언트 사이드에서만 실행되도록 체크
  if (typeof window === "undefined") {
    console.warn("파일 변환은 클라이언트 사이드에서만 가능합니다.");
    return file;
  }

  if (isHeic(file)) {
    return await convertHeicToJpeg(file);
  }

  if (isSvg(file)) {
    return await convertSvgToJpeg(file);
  }
  return file;
};

// export const convertImageFile = async (file: File): Promise<File> => { //CHECK
//   // heic, heif, svg 체크 -> jpg 변환
//   if (isHeic(file) || isSvg(file)) {
//     // const loadingMessage = message.loading(  //CHECK : import { message } from 'antd'
//     //   "이미지를 변환 중입니다. 잠시만 기다려주세요..."
//     // );
//     try {
//       file = (await convertToJpeg(file)) as File;
//     } catch (error) {
//       console.error(`${file.name} 변환 중 오류 발생`, error);
//     }
//     // finally {  //CHECK
//     //   loadingMessage();
//     // }
//   }
//   return file;
// };
