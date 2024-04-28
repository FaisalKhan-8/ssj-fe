import React from 'react';
import Logo from '../assets/Logo.png';
import DailyWear from '../assets/EarringsIcon.svg';
import {
  IoHeartOutline,
  IoCartOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import { CiMicrophoneOn } from 'react-icons/ci';

import { HiOutlineUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='flex items-center justify-around font-Raleway sticky top-0 z-50 bg-secondary-color w-full  '>
        <div>
          {/* logo */}
          {/* <img
            src={Logo}
            alt='Logo'
            className='w-20 h-20'
          /> */}
          <h1 className=' text-2xl font-extrabold text-primary-color p-5'>
            Logo
          </h1>
        </div>
        <div className='w-[600px] relative '>
          {/* search bar */}
          <input
            type='text'
            name='search'
            placeholder='Search for Gold Jewellery, Diamond…'
            className=' w-full p-2 rounded-md border-none focus:outline-none'
          />
          <div className='flex items-center gap-5 absolute top-2 right-2 '>
            <button>
              <CiMicrophoneOn className='w-6 h-6 text-primary-color' />
            </button>
            <button>
              <IoSearchOutline className='w-6 h-6 text-primary-color' />
            </button>
          </div>
        </div>
        <div className='flex items-center gap-8 font-[400] '>
          {/* Icons */}
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <img
              src={DailyWear}
              alt=''
              className='w-6 h-6  '
            />
            Dailywear
          </Link>
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-primary-color'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z'
              />
            </svg>
            Stores
          </Link>
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <HiOutlineUser className='w-6 h-6 text-primary-color' />
            Account
          </Link>
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <IoHeartOutline className='w-6 h-6 text-primary-color' />
            Wishlist
          </Link>
          <Link
            to='#/'
            className='flex flex-col items-center uppercase text-sm text-primary-color delay-100 transition-all ease-linear hover:scale-[1.1] '>
            <IoCartOutline className='w-6 h-6 text-primary-color relative' />
            Cart
          </Link>
          <span className=' absolute right-5 top-2 w-3 h-3 bg-primary-color text-white flex items-center justify-center rounded-full text-sm p-2'>
            2
          </span>
        </div>
      </div>
      {/* header link part  */}
      <div className='flex justify-around p-5 px-10 font-Raleway'>
        <div className='uppercase text-sm group cursor-pointer underlineAni '>
          All jewellery
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Gold
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Diamond
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Earrings
        </div>

        <div className='uppercase text-sm  cursor-pointer underlineAni '>
          Rings
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Bestsellers
        </div>
        <div className='uppercase text-sm cursor-pointer underlineAni '>
          Mia
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni '>
          Collections
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Wedding
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Gifting
        </div>
        <div className='uppercase text-sm  cursor-pointer underlineAni'>
          Golden Harvest
        </div>
        <div className='uppercase text-sm cursor-pointer underlineAni '>
          More
        </div>
      </div>
    </>
  );
};

export default Header;
