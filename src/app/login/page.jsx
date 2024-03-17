"use client"

import Image from 'next/image';
import { Card, Input, Button, Typography, CardHeader, CardBody } from '../../../tailwind_mui_components.js';
import pawfinityLogo from '../../../public/images/pawfinity_dark.png';
import loginPageImage1 from '../../../public/images/girl-and-dog.jpg';
import Link from 'next/link.js';
import '../../css/Login.css';
import style from '../Global.module.css';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { data } from 'autoprefixer';
import GoogleSignInButton from '@/components/GoogleAuth.jsx';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    //const { data: session } = useSession();

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setIsFormValid(validateEmail(value) && password.trim() !== '');
    };

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setIsFormValid(validateEmail(email) && value.trim() !== '');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const setUserDetails = async (token) => {
        const userData = await getUserDetails(token);
        //dispatch(fetchUserDataSuccess(userData));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let formData = new FormData;
        formData.append('email', email);
        formData.append('password', password);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/general/login`, {
                method: "POST",
                body: formData
            })

            const userData = await response.json();

            if (userData.success) {
                alert(userData.message);
                //toast.success(`${userData.message}`);
                //setCookie('token', userData.token, 7);
                //dispatch(login(userData.token));
                setUserDetails(userData.token);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } else {
                //toast.error(`${userData.message}`);
                alert(`${userData.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(`${error}`);
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    return (
        <div className={`${imageLoaded ? 'visible' : 'hidden'} flex flex-col-reverse md:flex-row h-screen`}>
            <div className='md:flex-1 flex items-center justify-center flex-col'>
                <div className='login-header flex w-full justify-center items-center px-5 py-1 mb-5'>
                    <Image src={pawfinityLogo} width={80} height={80} alt='' />
                </div>
                <Card className="w-full max-w-[30rem]" color="transparent" shadow={false}>
                    <CardHeader className='flex justify-center items-center flex-col shadow-none bg-transparent mb-5'>
                        <Typography variant='h2' className={`${style.highlightText} loginCardHeading mb-2`}>
                            Welcome To Pawfinity
                        </Typography>
                        <Typography variant='h6'>
                            Step into a world where every paw finds its perfect match
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <Input type='email' label='Email' className='rounded mb-3' value={email} onChange={handleEmailChange} />
                            <Input type='password' label='Password' className='rounded mb-3' value={password} onChange={handlePasswordChange} />
                            <div className='flex justify-between items-center'>
                                <Typography className='text-xs'>
                                    Don't have an account ?
                                    <Link href="/signup" className={`${style.highlightText} text-xs ml-2 font-semibold`}>
                                        Sign Up
                                    </Link>
                                </Typography>
                                <Typography>
                                    <Link href="/signup" className={`text-xs`}>
                                        Forgot Password ?
                                    </Link>
                                </Typography>
                            </div>
                            <Button type="submit" loading={isLoading} className="mb-3 w-100 flex gap-5 justify-center flex-row-reverse">Login</Button>
                        </form>
                        <div className={style.separatorcontainer}>
                            <div className={style.separatorline}></div>
                            <div className={style.separatortext}>OR</div>
                            <div className={style.separatorline}></div>
                        </div>
                        <div className='socialLogin'>
                            <GoogleSignInButton />
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='md:flex-1 flex items-center justify-center hidden lg:block'>
                <Image src={loginPageImage1} style={{ objectFit: "cover", height: "100vh" }} alt='' onLoad={handleImageLoad} />
            </div>
        </div>
    )
}

export default Login;
