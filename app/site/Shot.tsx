import Image from 'next/image';

// A screenshot with an optional light-mode version; CSS shows the one that matches the site theme.
export default function Shot({ src, light, alt, sizes }: { src: string; light?: string; alt: string; sizes: string }) {
	if (!light) return <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} />;
	return (
		<>
			<Image className="ss-dark" src={src} alt={alt} width={1440} height={900} sizes={sizes} />
			<Image className="ss-light" src={light} alt={alt} width={1440} height={900} sizes={sizes} />
		</>
	);
}
