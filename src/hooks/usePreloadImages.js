import { useEffect, useState, useRef } from "react";

export default function usePreloadImages(imageArray) {
  const [loading, setLoading] = useState(true);
  const result = useRef();
  useEffect(() => {
    const cacheImages = async (srcArray) => {
      const promises = await srcArray.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => reject();
        });
      });
      result.current = await Promise.all(promises);
      setLoading(false);
    };
    cacheImages(imageArray);
  }, [imageArray]);
  return { loading, result: result.current };
}
