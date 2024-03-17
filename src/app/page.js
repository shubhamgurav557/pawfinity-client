"use client"

import { useEffect } from "react";
import { useRouter } from "next/router";
import {isAuthenticated} from '../utils/auth';
import { Provider } from "react-redux";

function MyApp({Component, pageProps}){
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if(!isAuthenticated() && !['/login', '/signup'].includes(url)){
        router.push('/login')
      }
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    } 
  },[])

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;