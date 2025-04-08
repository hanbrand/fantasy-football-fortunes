
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ScrapedImageProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "square" | "rounded" | "circle";
}

const ScrapedImage = ({
  src,
  alt,
  fallback,
  className,
  size = "md",
  shape = "rounded"
}: ScrapedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Size mapping
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  // Shape mapping
  const shapeClasses = {
    square: "rounded-none",
    rounded: "rounded-lg",
    circle: "rounded-full"
  };

  // Create initials from alt text for fallback
  const getInitials = () => {
    if (!alt) return fallback || "?";
    
    return alt
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  if (!src || hasError) {
    // Show fallback avatar
    return (
      <Avatar 
        className={cn(
          sizeClasses[size],
          shapeClasses[shape],
          className
        )}
      >
        <AvatarFallback className="bg-field-light text-highlight">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0 z-10",
            sizeClasses[size],
            shapeClasses[shape]
          )}
        />
      )}
      <img
        src={src}
        alt={alt || "Image"}
        className={cn(
          "object-cover w-full h-full transition-opacity",
          shapeClasses[shape],
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default ScrapedImage;
