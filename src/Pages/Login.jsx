import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle, selectUser, selectAuthError, selectLoading, setUser } from '../features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import LoginVideo from '../assets/LoginPage.mp4';

const Login = ({ setModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const authError = useSelector(selectAuthError);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setModal(); // Close the modal
      navigate('/dashboard/profile');
    }
  }, [user, navigate, setModal]);

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.button
        whileHover={{ rotate: -90 }}
        whileTap={{ scale: 0.85 }}
        className="absolute top-1 right-1 -p-1 bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={setModal}
      > 
        <IoClose className="text-gray-500 cursor-pointer" />
      </motion.button>
      <motion.div
        className="flex-1 max-w-md p-4"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <video
          src={LoginVideo}
          className="rounded-lg w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
          style={{ pointerEvents: 'none' }} // Prevent video interaction
        />
      </motion.div>
      <motion.div
        className="flex-1 max-w-md p-4 flex flex-col gap-5 items-center justify-center"
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-primary-color mb-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        >
          Login with Google
        </motion.h2>
        <button
          onClick={handleSignInWithGoogle}
          className="flex items-center p-3 bg-white text-primary-color rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          disabled={loading}
        >
          <FaGoogle className="text-xl mr-2" />
          <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
        {authError && (
          <motion.p
            className="text-red-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {authError}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

Login.propTypes = {
  setModal: PropTypes.func.isRequired,
};

export default Login;
