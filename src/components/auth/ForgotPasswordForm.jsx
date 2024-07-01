import React, { useState, useEffect } from "react";
import axios from "axios";
import userReducer from "../../store/store";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../features/auth/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_URL } from "../../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

function ForgotPasswordForm() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });


  useEffect(() => {
    // if (userData?.role === "admin") {
    //   console.log("admin===========");
    //   navigate("/admin");
    // } else if (userData?.role === "user") {
    //   navigate('/');
    // }
  });


  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // form handling
  const handleLogin = async (e) => {
    e.preventDefault();
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const data = {
      email: formData.email,
      password: formData.password,
    };


    try {
      const response = await axios.post(`${AUTH_URL}/auth/login/`, data);
      console.log(response)
      if (response.data && response.data.status) {
        const responseData = response.data;
        console.log(responseData);

        console.log(responseData.role === "admin", "admin=============");
        console.log(responseData.role === "user", "user=============");

        dispatch(loginSuccess(responseData));
        Swal.fire({
          title: 'success',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Cool'
        })

        if (responseData?.role === "user") {
          navigate("/");
        } else if (responseData?.role === "admin") {
          navigate("/admin");
        } else {
          console.log("login login")
          navigate("/login");
        }
      } else {
        console.log(response.data);
        dispatch(loginFailure(response.data));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signin failed",
        text: `${error.response.data.message}`,

      });
      console.log(error.response.status)
      setMessage(error.response.data.message);
      console.error("Error:", error.response.data.message);
      if (error.response.status === 400) {
        dispatch(loginFailure(error.response.data));

      } else if (error.response.status === 406) {

      }
    }
  };





  return (
    <div>
      <section className="bg-gray-50 dark:bg-indigo-950">
        <div className="flex flex-col items-center lg:mt-36 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleLogin}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your registered email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                    required=""
                    onChange={handleChange}
                  />
                </div>
               
                <div className="flex items-center justify-between">
                  <div className="flex items-start">

                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                      </label>
                    </div>
                  </div>
                  
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPasswordForm;
