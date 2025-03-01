import Image from "next/image";
import React from "react";

interface WeatherIconProps {
  imagePath: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  imagePath,
  className = "text-4xl",
}) => {
  return (
    // unoptimizedオプションを追加して外部URLから画像を使用できるようにする
    <Image
      src={imagePath}
      alt="weather icon"
      width={50}
      height={50}
      className={className}
      unoptimized
    />
  );
};

export default WeatherIcon;
