import Link from 'next/link';

export default function PrivatePageTest() {
	return (
		<div className="mx-auto flex h-screen items-center">
			this is a private page{' '}
			<Link href="/logout" className="bg-red-900">
				logout
			</Link>
		</div>
	);
}
