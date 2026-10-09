/* eslint-disable @next/next/no-img-element */
import type { IconType } from 'react-icons';
import { SiGithub, SiDatabricks, SiGoogle } from 'react-icons/si';

// Organization marks shown next to their names. Image files live in /public/logos.
const IMG: Record<string, string> = {
	staples: '/logos/staples.png',
	cognida: '/logos/cognida.png',
	northeastern: '/logos/northeastern.png',
	workhuman: '/logos/workhuman.svg',
	deeplearning: '/logos/deeplearning.png',
};
const ICON: Record<string, [IconType, string | null]> = {
	github: [SiGithub, null],
	databricks: [SiDatabricks, '#FF3621'],
	google: [SiGoogle, '#4285F4'],
};

export type OrgKey = keyof typeof IMG | keyof typeof ICON;

export default function OrgLogo({ org, size = 16 }: { org?: string; size?: number }) {
	if (!org) return null;
	if (IMG[org]) return <img className="org-logo" src={IMG[org]} alt="" width={size} height={size} />;
	const hit = ICON[org];
	if (!hit) return null;
	const [Icon, color] = hit;
	return <Icon aria-hidden="true" className="org-logo org-ic" style={{ width: size, height: size, ...(color ? { color } : {}) }} />;
}
