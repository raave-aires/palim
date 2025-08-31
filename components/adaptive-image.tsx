"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

interface AdaptiveImageProps {
  src_light: string;
  src_dark: string;
  alt: string;
  width: number;
  height: number;
}

export function AdaptiveImage({ src_dark, src_light, alt, width, height }: AdaptiveImageProps) {
  const resolvedTheme = useTheme().resolvedTheme;

  return (
    <>
      {resolvedTheme === "light" ? (
        <Image src={src_light} alt={alt} width={width} height={height} />
      ) : (
        <Image src={src_dark} alt={alt} width={width} height={height} />
      )}
    </>
  );
}
