import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import { fetchUserProfile, selectUser, signOutUser, updateUserProfile } from "../features/Auth/authSlice";
import Spinner from '../Components/Spinner'; 

const ProfileDetails = ({ setModal }) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile ? profile.name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [mobile, setMobile] = useState(profile ? profile.mobile : '');
  const [panCard, setPanCard] = useState(profile ? profile.panCard : '');
  const [address, setAddress] = useState(profile ? profile.address : '');
  const [imagePreview, setImagePreview] = useState(profile ? profile.photo : '');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Fetch user details when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setMobile(profile.mobile);
      setPanCard(profile.panCard);
      setAddress(profile.address);
      setImagePreview(profile.photo);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = { name, email, mobile, panCard, address, photo: imagePreview };
    // dispatch(updateUserProfile(updatedProfile));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true); // Show loading spinner
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsLoading(false); // Hide loading spinner
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset fields to original profile data
    setName(profile.name);
    setEmail(profile.email);
    setMobile(profile.mobile);
    setPanCard(profile.panCard);
    setAddress(profile.address);
    setImagePreview(profile.photo);
  };

  if (!profile) {
    return null; // Render nothing if profile data is not available yet
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full shadow-lg"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 150 }}
        exit={{ y: "100%", transition: { ease: "easeInOut" } }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Profile Details</h2>
          <button onClick={() => setModal(false)}>
            <IoClose className="text-gray-600 cursor-pointer text-2xl hover:text-gray-900 transition-colors duration-300" />
          </button>
        </div>
        <div className="space-y-6">
          <div className="relative flex items-center justify-center overflow-hidden rounded-full border-4 border-primary-color w-36 h-36 mx-auto shadow-md">
            {isLoading ? (
              <Spinner /> // Display spinner while loading
            ) : (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            )}
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-50 bg-black bg-opacity-40 rounded-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
                />
                <LiaUserEditSolid className="text-3xl text-white" />
              </label>
            )}
          </div>
          <div className="flex flex-col gap-6 items-center justify-center px-4 md:px-6 py-4 md:py-6">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-4 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300"
                  placeholder="Name"
                />
                <div className="border border-gray-300 p-4 w-full rounded-md bg-gray-100 text-gray-700 cursor-not-allowed">
                  <span>{email}</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="border border-gray-300 p-4 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300"
                  placeholder="Mobile"
                />
                <input
                  type="text"
                  value={panCard}
                  onChange={(e) => setPanCard(e.target.value)}
                  className="border border-gray-300 p-4 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300"
                  placeholder="PAN Card"
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 p-4 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300"
                  placeholder="Address"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-primary-color text-white px-6 py-3 rounded-md shadow-lg hover:bg-primary-color-dark transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-6 py-3 rounded-md shadow-lg hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <motion.h1
                  className="text-2xl md:text-3xl font-semibold text-primary-color"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {name}
                </motion.h1>
                <motion.h2
                  className="text-xl text-gray-700"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Email: <span className="font-semibold">{email}</span>
                </motion.h2>
                {mobile && (
                  <motion.h2
                    className="text-xl text-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    Mobile: <span className="font-semibold">{mobile}</span>
                  </motion.h2>
                )}
                {panCard && (
                  <motion.h2
                    className="text-xl text-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                  >
                    PAN Card: <span className="font-semibold">{panCard}</span>
                  </motion.h2>
                )}
                {address && (
                  <motion.h2
                    className="text-xl text-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    Address: <span className="font-semibold">{address}</span>
                  </motion.h2>
                )}
                <div className="flex gap-4 mt-4">
                  <motion.button
                    className="flex items-center gap-2 bg-primary-color text-white rounded-md px-4 py-2 shadow-lg hover:bg-primary-color-dark transition duration-300"
                    onClick={handleEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                    <LiaUserEditSolid className="text-xl md:text-2xl" />
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-2 bg-primary-color text-white rounded-md px-4 py-2 shadow-lg hover:bg-primary-color-dark transition duration-300"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                    <IoLogOutOutline className="text-xl md:text-2xl" />
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
