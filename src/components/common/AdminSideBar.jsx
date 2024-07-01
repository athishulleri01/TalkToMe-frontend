'use client';

import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiBan, HiBookmarkAlt, HiChartPie, HiInbox, HiLockClosed, HiLogout, HiMail, HiOutlineIdentification, HiReply, HiShoppingBag, HiTable, HiUpload, HiUser, HiViewBoards } from 'react-icons/hi';
import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../features/auth/userSlice'
import Swal from 'sweetalert2'



function AdminSideBar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  useEffect(() => {

  }, [userData])

  const handleLogout = () => {

    Swal.fire({
      title: "Logout Confirmation?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        // localStorage.removeItem('user_data');
        dispatch(logoutUser());
        navigate('/login')

      }
    });

  };
  return (
    <Sidebar className='mt-7' aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/admin'}>
            <Sidebar.Item icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to={'/view-user-admin'}>
            <Sidebar.Item icon={HiUser}>
              Users
            </Sidebar.Item>
          </Link>
          <Link to={'/view-banner'}>
            <Sidebar.Item icon={HiUpload}>
              Banner
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiAnnotation}>
            Notification
          </Sidebar.Item>
          <Sidebar.Item icon={HiBan}>
            Report
          </Sidebar.Item>
          <Link onClick={handleLogout}>
            <Sidebar.Item icon={HiLogout}>
              Sign Out
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default AdminSideBar
