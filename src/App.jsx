// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './pages/home/Home'
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Otp from './pages/auth/Otp';
import ForgotPassword from './pages/auth/ForgotPassword'
import Demo from './pages/home/Demo';
import Post from './pages/post/Post';
import Notifications from './pages/notification/Notifications';
import Subscription from './pages/subscriptioin/Subscription';
import Profile from './pages/profile/Profile';
import ProfilePostsView from './components/profile/ProfilePostsView';
import ProfileSavedView from './components/profile/ProfileSavedView';
import ProfileChangePasswordView from './components/profile/ProfileChangePasswordView';
import Community from './pages/community/Community';
// import UserDetails from './components/profile/UserDetails';
import Admin from './pages/admin/Admin';
import UserDetailsAdmin from './components/admin/UserDetails';
import Banner from './components/admin/BannerDetails';
import PrivateRoute from "./utils/ProtectedRoute";
import SubscriptionForm from "./pages/payment/Subscription";
import Subscriptions from "./pages/payment/Subscription"
// import CloudinarySample from './components/profile/CloudinarySample';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        {/* <Route path='/sample'  element={<CloudinarySample/>}/> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/otp/:id" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/posts" element={<Post/>} /> */}
        <Route path="/subscription" element={<Subscription/>} />
        <Route path="/payment" element={<SubscriptionForm/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile-post-view" element={<ProfilePostsView/>} />
        <Route path="/profile-saved-view" element={<ProfileSavedView/>} />
        {/* <Route path="/changepassword" element={<ProfileChangePasswordView/>} /> */}
        <Route path="/payment" element={< Subscriptions/>}/>
        <Route
          path="/changepassword"
          element={
            <PrivateRoute>
              <ProfileChangePasswordView />
            </PrivateRoute>
          }
        />
       <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />

        <Route path="/demo" element={<Demo/>} />

        {/* admin */}
        <Route path="/admin" element={<Admin/>} />
        {/* <ProtectedRoute path="/admin" element={<Admin />} /> */}
        <Route path="/view-user-admin" element={<UserDetailsAdmin/>} />
        <Route path="/view-banner" element={<Banner/>} />

      </Routes>
    </>
  )
}

export default App
