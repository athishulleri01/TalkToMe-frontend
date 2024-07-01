import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { setUserInfo } from '../../features/userInfo/userInfoSlice';
import ProfileSideBar from '../common/ProfileSideBar';
import { MdEdit } from "react-icons/md";
import Footer from '../common/Footer';
import NavBar from '../common/NavBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function ProfileChangePasswordView() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const userInfo = useSelector((state) => state.userInfo.data);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password don't match.");
      return;
    }
    // change-password/
    try {
      const response = await axiosInstance.post('/api/change-password/', {
        id: userData.id,
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      console.log(response.data);
      console.log(response.status);

      if (response.status === 200) {
        toast.success("Password changed successfully.");
        navigate('/profile');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.detail || "Password change failed.");
      } else {
        toast.error("Network or server error.");
      }
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setCurrentPasswordVisible(!currentPasswordVisible);
        break;
      case 'new':
        setNewPasswordVisible(!newPasswordVisible);
        break;
      case 'confirm':
        setConfirmPasswordVisible(!confirmPasswordVisible);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar current="profile" />
      <div className="flex mt-10 flex-col lg:flex-row sm:items-start sm:justify-start">
        <div className="lg:mt-32">
          <ProfileSideBar />
        </div>
        <div className="lg-ml-5 ml-3 w-full h-96">
          <h1 className='text-white'>Change Password</h1>
          <div className="bg-white dark:bg-indigo-950">
            <div className="max-w-lg mx-auto my-10 bg-slate-200 rounded-lg shadow-md p-5">
              <form onSubmit={handleSubmit}>
                <div className="mt-5 m-3">
                  <div className="m-2 lg:mb-4 flex items-center justify-center">
                    <label className='lg:mr-5'>Current Password: </label>
                    <div className="relative flex items-center">
                      <input
                        className={`text-blue-500 hover:bg-slate-300 ${editMode ? "border-b border-blue-500" : ""}`}
                        type={currentPasswordVisible ? "text" : "password"}
                        placeholder="***************"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2"
                        onClick={() => togglePasswordVisibility('current')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {currentPasswordVisible ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="m-2 lg:mb-4 flex items-center justify-center">
                    <label className='lg:mr-10'>New Password: </label>
                    <div className="relative flex items-center">
                      <input
                        className={`text-blue-500 hover:bg-slate-300 ${editMode ? "border-b border-blue-500" : ""}`}
                        type={newPasswordVisible ? "text" : "password"}
                        placeholder="***************"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2"
                        onClick={() => togglePasswordVisibility('new')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {newPasswordVisible ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="m-2 lg:mb-4 flex items-center justify-center">
                    <label className='lg:mr-4'>Confirm Password: </label>
                    <div className="relative flex items-center">
                      <input
                        className={`text-blue-500 hover:bg-slate-300 ${editMode ? "border-b border-blue-500" : ""}`}
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="***************"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2"
                        onClick={() => togglePasswordVisibility('confirm')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {confirmPasswordVisible ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                  
                    <button
                      onClick={handleEditClick}
                      className={`${editMode ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-md`}
                    >
                      {editMode ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer position="fixed" />
    </>
  );
}

export default ProfileChangePasswordView;
