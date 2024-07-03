import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, selectUser, updateUserProfile } from "../features/Auth/authSlice";
import Avatar from '../assets/avatar.jpeg'; // Default fallback image

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [panCard, setPanCard] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [imagePreview, setImagePreview] = useState(Avatar); // Default to Avatar
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setMobile(profile.mobile_number || '');
      setPanCard(profile.pan_no || '');
      setAddress(profile.address || '');
      setGst(profile.gst_no || '');
      setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
    }
  }, [profile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedProfile = { 
      name, 
      photo: imagePreview, 
      address, 
      pan_no: panCard, 
      gst_no: gst, 
      mobile_number: mobile 
    };
    dispatch(updateUserProfile(updatedProfile));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(profile.name || '');
    setEmail(profile.email || '');
    setMobile(profile.mobile_number || '');
    setPanCard(profile.pan_no || '');
    setAddress(profile.address || '');
    setGst(profile.gst_no || '');
    setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
  };

  if (!profile) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl w-full bg-white rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-primary-color mb-8">Account Overview</h1>
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
          {isEditing ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Name", value: name, setter: setName },
                  { label: "Email", value: email, setter: () => {}, readonly: true },
                  { label: "Mobile", value: mobile, setter: setMobile },
                  { label: "PAN Card", value: panCard, setter: setPanCard },
                  { label: "Address", value: address, setter: setAddress },
                  { label: "GST", value: gst, setter: setGst },
                ].map(({ label, value, setter, readonly }, index) => (
                  <div className="flex flex-col" key={index}>
                    <label className="text-gray-700 mb-2 text-lg">{label}</label>
                    {readonly ? (
                      <div className="border border-gray-300 p-3 w-full rounded-md bg-gray-100 text-gray-700 text-lg">
                        <span>{value}</span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 text-lg"
                        placeholder={label}
                      />
                    )}
                  </div>
                ))}
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-2 text-lg">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300"
                  />
                  {isLoading ? (
                    <div className="flex justify-center items-center mt-2">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <img src={imagePreview} alt="Profile Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-primary-color text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 text-lg"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-700 text-lg"><strong>Name:</strong> {profile.name || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Email:</strong> {profile.email || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Mobile:</strong> {profile.mobile_number || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>PAN Card:</strong> {profile.pan_no || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Address:</strong> {profile.address || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>GST:</strong> {profile.gst_no || '-'}</p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>
          )}
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="mt-8 bg-primary-color text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 text-lg"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
