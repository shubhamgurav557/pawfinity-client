"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from '../../public/images/pexels-rrrinna-2071555.jpg';
import image2 from '../../public/images/pexels-nothing-ahead-16278274.jpg';
import image3 from '../../public/images/pexels-spencer-gurley-films-1448056.jpg';
import image4 from '../../public/images/pexels-cheryl-prince-7883862.jpg';
import image5 from '../../public/images/cats.jpg';
import { Typography, Button } from "@material-tailwind/react";
import globalStyles from '../app/Global.module.css';
import Typewriter from 'typewriter-effect';
import Link from "next/link";

const images = [image1, image2, image3, image4, image5];

const phrases = [
    'Where Pet Happiness Begins!',
    'Explore Pet Happiness With Us!',
    'Your Gateway to Happy Pet Moments.',
    'Join Us in Creating Joyful Memories.',
];

const HomeBannerImage = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const currentImage = images[index] || '';

    return (
        <div className="relative">
            <div className="h-56 sm:h-56 md:h-80 lg:h-96 opacity-10">
                <Image
                    src={currentImage}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center flex-col z-5">
                <Typography variant="h1" className={`${globalStyles.highlightText} lg:text-6xl md:text-5xl text-2xl mb-3`}>Welcome to Pawfinity</Typography>
                <Typewriter options={{ strings: phrases, autoStart: true, loop: true, delay: 100, deleteSpeed: 50, }} />
                <Button variant="text" className="absolute bottom-3 rounded-full flex items-center gap-2 mt-5 hover:gap-4" ripple={false}>
                    <Link href={'/about'}>Know More</Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4 transition-transform duration-300 transform translate-x-0 hover:translate-x-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    )
}

export default HomeBannerImage;


