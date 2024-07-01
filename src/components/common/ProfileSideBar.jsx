'use client';

import { Sidebar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiArrowSmRight, HiChartPie, HiInbox, HiLockClosed, HiLogout, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import React from 'react'

function ProfileSideBar() {
  return (
    <div className='96'>
      <Sidebar aria-label="Default sidebar example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to={'/profile'}>
              <Sidebar.Item href="#" icon={HiUser}>
                Your Profile
              </Sidebar.Item>
            </Link>
            {/* <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark"> */}
            <Link to={'/profile-post-view'} >
              <Sidebar.Item icon={HiViewBoards} label="5">
                Posts
              </Sidebar.Item>
            </Link>
            <Link to={"/profile-saved-view"}>
              <Sidebar.Item href="#" icon={HiInbox} >
                Saved
              </Sidebar.Item>
            </Link>
            <Link to={'/changepassword'} >
              <Sidebar.Item href="#" icon={HiLockClosed}>
                Change Password
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default ProfileSideBar
