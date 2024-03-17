"use client"

import { Avatar, Button, IconButton, MobileNav, Navbar, Typography } from '../../tailwind_mui_components.js';
import Image from 'next/image';
import darkLogo from '../../public/images/pawfinity_dark.png';
import lightLogo from '../../public/images/pawfinity_light.png';
import globalStyles from '../app/Global.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navigation = () => {
    const [openNav, setOpenNav] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [navbarStyle, setNavbarStyle] = useState('dark');

    useEffect(() => {
        let token = localStorage.getItem('bearer');
        if (token) {
            setIsAuthenticated(true);
        }
    })

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navList = [
        { linkText: 'Home', slug: '/home' },
        { linkText: 'Browse Pets', slug: '/browsepets' },
        { linkText: 'Post Add', slug: '/postadd' },
        { linkText: 'About', slug: '/about' },
        { linkText: 'FAQs', slug: '/faqs' },
        { linkText: 'Blogs', slug: '/blogs' },
    ];

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            setNavbarStyle("light");
        } else {
            setNavbarStyle("dark");
        }
    };

    return (
        <Navbar className={`fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-10 lg:py-2 border-none shadow-none backdrop-saturate-0 backdrop-blur-none ${navbarStyle === "dark" ? globalStyles.darkMode : globalStyles.lightMode}`}>
            <div className='flex items-center justify-between'>
                <div className='left-nav-section flex items-center gap-5'>
                    <div className='logo-banner flex gap-1 items-center'>
                        <IconButton
                            variant='text'
                            className='h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                                </svg>

                            )}
                        </IconButton>
                        <Image src={navbarStyle === "dark" ? darkLogo : lightLogo} width={80} height={80} alt='' />
                        <Typography className={`${navbarStyle === "dark" ? globalStyles.highlightText : globalStyles.darkColor} tracking-wider hidden lg:block`} variant='h4'>PAWFINITY</Typography>
                    </div>
                    <div className='navigation-items'>
                        <div className="hidden lg:block">
                            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                                {
                                    navList.map((navitem, index) => {
                                        return (
                                            <Typography
                                                as="li"
                                                variant="small"
                                                className={`p-1 font-medium ${navbarStyle === 'light' ? globalStyles.darkColor : ''}`}
                                                key={index + 1}
                                            >
                                                <Link href={navitem.slug} className={`${navbarStyle === 'light' ? globalStyles.darkColor : ''}`}>{navitem.linkText}</Link>
                                            </Typography>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='right-nav-section'>
                    {
                        !isAuthenticated ?
                            <div className='flex items-center gap-2'>
                                <Button className={`${navbarStyle !== "dark" ? globalStyles.darkMode : ''}`}>
                                    <Link href={'/login'}>Login</Link>
                                </Button>
                                <Button className={`${navbarStyle !== "dark" ? globalStyles.darkMode : ''}`}>
                                    <Link href={'/signup'}>Signup</Link>
                                </Button>
                            </div> :
                            <div className='flex items-center justify-between gap-5'>
                                <div className='social-buttons flex items-center gap-2'>
                                    <IconButton variant='text'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                                            <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                                        </svg>

                                    </IconButton>
                                    <IconButton variant='text'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                                        </svg>

                                    </IconButton>
                                </div>
                                <div className='profile flex items-center gap-4'>
                                    <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                                    <div className='hidden lg:block'>
                                        <Typography variant="h6">Shubham Gurav</Typography>
                                        <Typography variant="small" color="gray" className={`${globalStyles.lightColor} font-normal`}>
                                            Web Developer
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        {
                            navList.map((navitem, index) => {
                                return (
                                    <Typography
                                        as="li"
                                        variant="small"
                                        className="p-1 font-medium"
                                        key={index + 1}
                                    >
                                        <Link href={navitem.slug}>{navitem.linkText}</Link>
                                    </Typography>
                                )
                            })
                        }
                    </ul>
                </div>
            </MobileNav>
        </Navbar>
    )
}

export default Navigation