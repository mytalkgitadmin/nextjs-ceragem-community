import { useState, useEffect } from 'react';

interface FilePreview {
  url: string;
  type: 'image' | 'video' | 'document' | 'other';
}

export default function useFilePreview(file: File): FilePreview | null {
  const [preview, setPreview] = useState<FilePreview | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const fileType = file.type;
    let type: FilePreview['type'] = 'other';
    if (fileType.startsWith('image/')) {
      type = 'image';
    } else if (fileType.startsWith('video/')) {
      type = 'video';
    } else if (fileType.includes('pdf') || fileType.includes('document')) {
      type = 'document';
    }
    const url = URL.createObjectURL(file);

    setPreview({ url, type });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return preview;
}
