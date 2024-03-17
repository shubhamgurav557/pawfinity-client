"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from '../../public/images/pawfinity_dark.png';

const Loader = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, []);

    return (
        loading ? (
            <div className="loader-container fixed top-0 left-0 w-full h-full flex justify-center items-center bg-blue-900 bg-opacity-75 z-50">
                <Image className="image text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={logo} width="120px" height="120px" />
            </div>
        ) : null
    )
}

export default Loader 