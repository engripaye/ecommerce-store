'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { text } from 'stream/consumers';

const AnnouncementBar = () => {
    return (

        <div className='w-full bg-black py-2'>
            <div className='container mx-auto flex items-center justify-center px-8'>
                <span className='text-center text-sm font-medium tracking-wide text-white'>
                    FREE SHIPPING ON ORDERS OVER $15.00 ★ FREE RETURNS
                </span>
            </div>

        </div>
    )
}

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrolledUp = currentScrollY < prevScrollY;

            if (scrolledUp) {
                setIsOpen(true); 
            } else if (currentScrollY > 100){
                setIsOpen(false);
            }
            setPrevScrollY(currentScrollY);
        }
        setPrevScrollY(window.scrollY);

        window.addEventListener('scroll', handleScroll);

        return () => {window.removeEventListener('scroll', handleScroll);
        }
    }, [prevScrollY])
  return (
    <header className='w-full sticky top-0 z-50'>
        <div 
        className={`w-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <AnnouncementBar />

            <div className='w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
                <div className='flex justify-between items-center container mx-auto px-8'>
                    <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'>
                        <button className='text-gray-700 hover:text-gray-900 md:hidden'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                                </svg>
                        </button>

                        <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
                            <Link href='#'>Shop</Link>
                            <Link href='#'>New Arrival</Link>
                            <Link href='#'>Sale</Link>

                        </nav>

                    </div>

                    <Link href='#'>DEAL</Link>

                        
                        <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
                            <button className='text-gray-700 hover:text-gray-900 hidden sm:block'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 1 1-2.93 13.41M21 21l-4.35-4.35" />
                            </svg>

                            </button>

                            <Link href='/auth/sign-in'>Sign In</Link>
                            <Link href='/auth/sign-up'>Sign Up</Link>

                            <button className='text-gray-700 hover:text-gray-900 relative'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 sm:h-6 sm:w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                </svg>
                                    <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 rounded-full flex items-center justify-center'>

                                    </span>
                            </button>

                        </div>
                </div>

            </div>
        </div>
    </header>
  )
}

export default Header