import { IoIosArrowDown } from 'react-icons/io';
import React from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

function Login({ setModal }) {
  return (
    <div className='grid md:grid-cols-2 font-Raleway place-content-center md:h-full h-[50vh]  '>
      <div className=' absolute right-0'>
        <motion.button
          whileHover={{
            rotate: -90,
          }}
          whileTap={{ scale: 0.85 }}
          className='p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
          onClick={setModal}>
          <RxCross2 className=' text-primary-color ' />
        </motion.button>
      </div>
      <div className=''>
        <img
          src='https://i.pinimg.com/564x/8c/98/d0/8c98d0fdb7e0da43f8ad707c4168562e.jpg'
          alt=''
          className=' rounded-l-lg hidden md:block'
        />
      </div>
      <div className='flex flex-col gap-5 items-center justify-center p-5'>
        <h1 className='text-3xl font-semibold text-primary-color'>
          Login Or Signup
        </h1>
        <form className='space-y-4 '>
          <div className='flex items-center justify-center gap-5'>
            <label
              for='mobile'
              className='p-3 border flex items-center gap-2 rounded-md hover:border-red-500 cursor-pointer'>
              +91
              <IoIosArrowDown />
            </label>
            <input
              id='mobile'
              type='tel'
              className='p-3 border rounded-md w-full focus:border-red-500 focus:ring-red-500 outline-none '
              placeholder='Enter your Mobile Number'
            />
          </div>

          <p class='text-center text-sm text-gray-500'>
            By continuing, I agree to{' '}
            <span className=' text-primary-color font-semibold'>
              Terms of Use
            </span>{' '}
            &{' '}
            <span className=' text-primary-color font-semibold '>
              Privacy Policy.
            </span>
          </p>
          <div className='flex justify-center items-center'>
            <button
              onClick={setModal}
              className=' p-2 bg-primary-color text-white rounded-md'>
              Request OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
