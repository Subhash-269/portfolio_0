import Image from 'next/image';

export default function Photo({ caption = '~/venkat/photo.jpg' }: { caption?: string }) {
	return (
		<figure className="photo">
			<Image className="site-photo-light" src="/photo-light.jpg" alt="Venkat Neelraj Nitta" width={509} height={636} priority />
			<Image className="site-photo-dark" src="/photo-dark.jpg" alt="Venkat Neelraj Nitta" width={509} height={636} priority />
			<figcaption>{caption}</figcaption>
		</figure>
	);
}
