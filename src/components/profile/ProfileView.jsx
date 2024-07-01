import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import ProfileSideBar from '../common/ProfileSideBar';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import axiosInstance from '../../axiosInstance';
import { setUserInfo } from '../../features/userInfo/userInfoSlice';
import ValidationComponent from '../../utils/Validations';
import { storage } from '../../firebaseConfig';

const ProfileView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const userInfo = useSelector((state) => state.userInfo.data);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData.first_name,
    lastName: userData.last_name,
    username: userData.username,
    country: userData.country,
    profile_picture: '',
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [countries, setCountries] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userData || userData.role !== 'user') {
      navigate('/login');
    }

    fetchUserDetails();
    fetchCountries();
  }, [userData]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/api/user/${userData.id}`);
      if (response.status === 200) {
        dispatch(setUserInfo(response.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all/');
      const countryNames = response.data.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      setFormData({
        ...formData,
        profile_picture: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateField = (value, minLength, regex, errorMessage) => {
    return ValidationComponent({ value, minLength, regex, errorMessage });
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    setEditMode(!editMode);

    if (editMode) {
      try {
        let profilePictureUrl = userData.profile_picture;

        if (formData.profile_picture && formData.profile_picture !== userData.profile_picture) {
          const file = formData.profile_picture;
          const storageRef = ref(storage, `profile_pictures/${userData.id}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          profilePictureUrl = await new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
              },
              (error) => {
                console.error('Firebase upload error:', error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
                setFormData({
                  ...formData,
                  profile_picture: downloadURL,
                });
              }
            );
          });
        }

        const updatedData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          country: formData.country,
          profile_picture: profilePictureUrl,
        };

        const response = await axiosInstance.put(`/api/user/${userData.id}/`, updatedData);

        if (response.status === 200) {
          dispatch(setUserInfo(response.data));
          setEditMode(false);
          toast.success('Profile updated successfully');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error updating profile');
      } finally {
        setUploadProgress(0);
      }
    }
  };

  const handleImageClick = () => {
    if (editMode) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <NavBar current="profile" />
      <div className="flex mt-10 flex-col lg:flex-row sm:items-start sm:justify-start">
        <div className="lg:mt-32">
          <ProfileSideBar />
        </div>
        <div className="lg:ml-5 ml-3 w-full h-full">
          <div className="max-w-lg mx-auto my-10 bg-slate-200 rounded-lg shadow-md p-5">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full mx-auto cursor-pointer"
                src={userInfo.profile_picture || 'https://picsum.photos/200'}
                alt="Profile picture"
                onClick={handleImageClick}
              />
              <input
                type="file"
                name="profile_picture"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <div className="flex justify-center mt-5">
              <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                4 Followers
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                10 Following
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">
                8 Likes
              </a>
            </div>
            <div className="mt-5">
              <div className="m-2 flex items-center justify-center">
                <label className="lg:mr-3">First Name : </label>
                <input
                  className={`text-blue-500 hover:bg-slate-300 ${editMode ? 'border-b border-blue-500' : ''}`}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={userInfo.first_name}
                  readOnly={!editMode}
                />
              </div>
              <div className="m-2 flex items-center justify-center">
                <label className="lg:mr-3">Last Name : </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={userInfo.last_name}
                  readOnly={!editMode}
                />
              </div>
              <div className="m-2 flex items-center justify-center">
                <label className="lg:mr-4">Username : </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder={userInfo.username}
                  readOnly={!editMode}
                />
              </div>
              <div className="m-2 flex items-center justify-center">
                <label className="lg:mr-12">Email : </label>
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  placeholder={userInfo.email}
                  disabled
                />
              </div>
              <div className="m-2 flex items-center justify-start">
                <label className="lg:mr-8">Country : </label>
                {editMode ? (
                  <select
                    className={`items-center justify-center w-80 ${editMode ? 'border-b border-blue-500' : ''}`}
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={`items-center justify-center ${editMode ? 'border-b border-blue-500' : ''}`}
                    type="text"
                    name="country"
                    value={formData.country}
                    placeholder={userInfo.country}
                    readOnly={!editMode}
                  />
                )}
              </div>
              <button
                onClick={handleEditClick}
                className={`relative ${editMode ? 'bg-green-500 dark:bg-green-500' : 'bg-red-500 dark:bg-red-500'} text-white px-4 py-2 rounded-md`}
              >
                {editMode ? 'Save' : 'Edit'}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center rounded-md">
                    <div className="relative w-3/4 h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer position="fixed" />
      <ToastContainer />
    </>
  );
};

export default ProfileView;
