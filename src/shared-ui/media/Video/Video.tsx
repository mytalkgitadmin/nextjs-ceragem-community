import { useState, useEffect } from "react";

import styles from "./Video.module.css";

export const Video: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    returnDuration(videoUrl).then(setDuration).catch(console.error);
  }, [videoUrl]);

  const formatDuration = (duration: number): any => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const seconds = Math.floor(duration - hours * 3600 - minutes * 60);

    let parts = [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ];

    if (hours > 0) {
      parts.unshift(hours.toString().padStart(2, "0"));
    }

    return parts.join(":");
  };

  const returnDuration = (url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = url;
      video.ondurationchange = () => {
        resolve(formatDuration(video.duration));
      };
      video.onerror = () => {
        reject(new Error("Failed to load video"));
      };
    });
  };
  return (
    <div className={styles.duration}>{duration && <span>{duration}</span>}</div>
  );
};
