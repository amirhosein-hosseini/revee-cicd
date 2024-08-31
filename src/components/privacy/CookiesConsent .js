import React, { useState, useEffect } from 'react';
import { BluePrimaryButton } from '../button';
import styles from "./styles.module.scss";

const CookiesConsent = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setAcceptedCookies(true);
  };

  const handleDeclineCookies = () => {
    // Handle decline if needed
  };

  if (acceptedCookies) {
    return null; // Don't show the consent message if cookies are accepted
  }

  return (
    <div className={styles.cookie + " cookies-consent w-[500px] max-md:w-11/12 max-md:mx-auto fixed bottom-[20px] max-md:bottom-[10px] left-[20px] max-md:left-[16px] bg-white z-30 shadow-xl py-10 max-md:py-5"}>
        <div className="container w-11/12 mx-auto flex flex-col gap-10 max-md:gap-4">
            <div className='flex flex-col gap-5 max-md:gap-2'>
                <div className='flex items-center gap-2'>
                    <svg className='w-12 h-12 max-md:w-8 max-md:h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#27bdbe" d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6v0c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9v0c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                    <p className='font-bold text-2xl max-md:text-lg'>
                        Cookie
                    </p>
                </div>
                <p className='max-md:text-sm'>
                    We use cookies to make our site work better by storing limited information about your usage of the site
                </p>
            </div>
            <div className={styles.cookieButton + ' flex items-center justify-between gap-3'}>
                <div className='w-1/2' onClick={handleAcceptCookies}>
                    <BluePrimaryButton>
                        Accept
                    </BluePrimaryButton>
                </div>
                <div className='w-1/2' onClick={handleAcceptCookies}>
                    <BluePrimaryButton>
                        Decline
                    </BluePrimaryButton>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CookiesConsent;
