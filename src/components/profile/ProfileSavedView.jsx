import React, { useEffect, useState } from 'react'
// import UserDetails from './UserDetails'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axiosInstance";
import { setUserInfo } from '../../features/userInfo/userInfoSlice'
import ProfileSideBar from '../common/ProfileSideBar'
import { MdEdit } from "react-icons/md";
import Footer from '../common/Footer';
import NavBar from '../common/NavBar';




function ProfileSavedView() {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data);
    const userInfo = useSelector((state) => state.userInfo.data);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    // useEffect(() => {
    //     if (userData?.role === "user") {
    //         navigate('/profile');
    //     } else {
    //         navigate('/login');
    //     }
    //     if (!userData) {
    //         navigate("/login")
    //     }


    //     fetchUserDetails();
    // }, [userData]);

    // const fetchUserDetails = async () => {
    //     try {
    //         const response = await axiosInstance.get("/info/");
    //         console.log(response.data);

    //         if (response.status) {
    //             dispatch(setUserInfo(response.data));
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user details:", error);
    //     }
    // };



    return (
        <>
            <NavBar current="profile" />
            <div className="flex mt-10 flex-col lg:flex-row sm:items-center sm:justify-center">
                <div className="lg:mt-32">
                    <ProfileSideBar />
                </div>                <div className="lg-ml-5 ml-3 w-full h-full">
                    <h1>ProfileSavedView</h1>
                </div>
            </div>
            <Footer position="fixed" />
        </>
    )
}

export default ProfileSavedView
