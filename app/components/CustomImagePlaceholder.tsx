import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface Props {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

const isValidUrl = (url?: string): boolean => {
    return !!url && (url.startsWith("https://") || url.startsWith("http://"));
};

const CustomImagePlaceholder = ({
                                    src,
                                    alt,
                                    width = 800,
                                    height = 800,
                                    className = "",
                                }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const verifiedSrc = isValidUrl(src) ? src : undefined;

    return (
        <div className={`${className} w-full max-w-40 h-full max-h-40`}>
            {/* Placeholder (while loading or on error) */}
            {!imageLoaded || imageError ? (
                <div className="bg-gray-300 p-4">
                    <div className="flex items-center justify-center">
                        <p className="text-gray-500"><ImageOff /></p>
                    </div>
                </div>
            ) : null}

            {/* Actual Image */}
            {verifiedSrc && !imageError && (
                <Image
                    src={verifiedSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            )}
        </div>
    );
};

export default CustomImagePlaceholder;