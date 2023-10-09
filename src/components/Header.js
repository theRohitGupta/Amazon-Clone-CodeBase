import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {
    const { data: session, status } = useSession();
    // console.log(session);
    const router = useRouter();

    const items = useSelector(selectItems);

  return (
    <header className='sticky top-0 z-50'>
        {/* TOP */}
        <div className=' flex items-center bg-amazon_blue p-1 flex-grow py-2'>
            <div className=' mt-2 flex items-center flex-grow sm:flex-grow-0'>
                <Image 
                    src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' 
                    width={150} height={40}
                    alt='Amazon'
                    objectFit='contain'
                    className=' cursor-pointer'
                    onClick={() => router.push('/')}
                />
            </div>
            {/* CUSTOM SEARCH BAR */}
            <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 transition-all duration-200'>
                <input className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4' type='text' placeholder='Search Items'/>
                <SearchIcon className="h-12 p-4"/>
            </div>
            <div className='text-white flex items-center text-xs space-x-2 md:space-x-6 mx-6 whitespace-nowrap'>
                <div onClick={!session ? signIn : signOut} className=' header-links'>
                    <p>{session ? `Hello, ${session.user.name}` : 'Sign in'}</p>
                    <p className='font-bold'>Account & Lists</p>
                </div>
                <div className=' header-links' onClick={() => router.push("/orders")}>
                    <p className=''>Returns</p>
                    <p className='font-bold '>& Orders</p>
                </div>
                <div onClick={() => router.push('/checkout')} className=' relative flex items-center gap-2 header-links'>
                    <ShoppingCartIcon className='h-7'/>
                    <div className='h-4 w-4 bg-yellow-500 absolute rounded-full -top-1 left-4 grid place-content-center text-black'>{items.length}</div>
                    <p className='font-bold hidden md:inline'>Basket</p>
                </div>
            </div>
        </div>

        {/* BOTTOM */}
        <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 py-2 px-1 md:px-6'>
            <p className='header-links flex items-center '>
                <MenuIcon className='h-6 mr-1 '/>
                All
            </p>
            <p className="header-links">Prime Video</p>
            <p className="header-links">Amazon Business</p>
            <p className="header-links">Today's Deal</p>
            <p className="header-links hidden md:flex">Electronics</p>
            <p className="header-links hidden md:flex">Food & Grocery</p>
            <p className="header-links hidden lg:flex">Prime</p>
            <p className="header-links hidden lg:flex">Buy Again</p>
            <p className="header-links hidden lg:flex">Shopper Toolkit</p>
            <p className="header-links hidden lg:flex">Health & Personal</p>

        </div>
    </header>
  )
}

export default Header