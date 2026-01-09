import Image, { ImageProps } from "next/image";
import { useState } from "react";

type SkeletonImageProps = ImageProps & {
  wrapperClassName?: string;
};

// Shows a lightweight skeleton until the Next.js Image finishes loading
export default function SkeletonImage({
  wrapperClassName = "",
  className = "",
  onLoadingComplete,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      <Image
        {...props}
        className={`transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`.trim()}
        onLoadingComplete={(img) => {
          setLoaded(true);
          onLoadingComplete?.(img);
        }}
      />
    </div>
  );
}
