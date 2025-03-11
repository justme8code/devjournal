import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface Props {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    imageClassName?: string;
}

const isValidUrl = (url?: string): boolean => {
    return !!url && (url.startsWith("https://") || url.startsWith("http://"));
};

const CustomImagePlaceholder = ({
                                    src,
                                    alt,
                                    width = 800,
                                    height = 800,
                                    imageClassName = "",
                                }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const verifiedSrc = isValidUrl(src) ? src : undefined;

    return (
        <div className={``}>
            {/* Placeholder (while loading or on error) */}
            {!imageLoaded || imageError ? (
                <div className="bg-gray-300 p-4 flex items-center justify-center">
                        <p className="text-gray-500"><ImageOff /></p>
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
                    } w-full h-full ${imageClassName}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            )}
        </div>
    );
};

export default CustomImagePlaceholder;