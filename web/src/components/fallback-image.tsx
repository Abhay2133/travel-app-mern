import { useState } from 'react';
import 
// Image, 
{ ImageProps } from 'next/image';

interface FallbackImageProps extends ImageProps {
  fallbackSrc: string;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src as string);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'Image'}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
};

export default FallbackImage;
