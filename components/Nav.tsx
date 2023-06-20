'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

const Nav = () => {
	const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
	const [providers, setproviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);
	const { data: session, status } = useSession();
	const [toggleDropdown, settoggleDropdown] = useState(false);

	useEffect(() => {
		if (session?.user) {
			setisUserLoggedIn(true);
		} else {
			setisUserLoggedIn(false);
		}
	}, [session]);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();
			setproviders(response);
		};
		setProviders();
	}, []);

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link className='flex gap-2 flex-center' href='/'>
				<Image className='object-contain' src='/assets/images/logo.svg' alt='' width={30} height={30} />
				<p className='logo_text'>Promptopia</p>
			</Link>
			<div className='sm:flex hidden'>
				{isUserLoggedIn ? (
					<div className='flex gap-3 md:gap-5'>
						<Link className='black_btn' href='/create-prompt'>
							Create Post
						</Link>
						<button
							type='button'
							className='outline_btn'
							onClick={() => {
								signOut();
								setisUserLoggedIn(false);
							}}>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src={session!.user!.image!}
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			<div className='sm:hidden flex relative'>
				{isUserLoggedIn ? (
					<div className='flex'>
						<Image
							src={session!.user!.image!}
							width={37}
							height={37}
							className='rounded-full'
							alt='profile'
							onClick={() => settoggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<>
								<div className='dropdown'>
									<Link
										href='/profile'
										className='dropdown_link'
										onClick={() => settoggleDropdown(false)}>
										My Profile
									</Link>
									<Link
										href='/profile'
										className='dropdown_link'
										onClick={() => settoggleDropdown(false)}>
										Create Prompt
									</Link>
									<button
										type='button'
										onClick={() => {
											settoggleDropdown(false);
											setisUserLoggedIn(false);
											signOut();
										}}
										className='mt-5 w-full black_btn'>
										Sign Out
									</button>
								</div>
							</>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className='black_btn'>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
