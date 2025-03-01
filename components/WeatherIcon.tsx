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
    <Image
      src={imagePath}
      alt="weather icon"
      width={50}
      height={50}
      className={className}
    />
  );
};

export default WeatherIcon;
