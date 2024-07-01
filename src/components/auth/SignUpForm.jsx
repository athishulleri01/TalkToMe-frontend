import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ValidationComponent from '../../utils/Validations'

import axios from "axios";
import { AUTH_URL } from "../../axiosConfig";
import axiosInstance from "../../axiosInstance";

function SignUpForm() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const loading = useSelector((state) => state.user.loading);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });



  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateField = (value, minLength, regex, errorMessage) => {
    return ValidationComponent({ value, minLength, regex, errorMessage });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // validaation
    if (!validateField(formData.firstName, 3, null, 'First name')) return;
    if (!validateField(formData.lastName, 3, null, 'Last name')) return;
    if (!validateField(formData.username, 3, null, 'Username')) return;
    if (!validateField(formData.email, null, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email')) return;
    if (!validateField(formData.phoneNumber, null, /^[0-9]{10}$/, '10-digit phone number')) return;
    if (!validateField(formData.password, 8, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'password')) return;
    // Matching password and confirm password
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password must match.");
      return;
    }



    try {
      const response = await axiosInstance.post(`${AUTH_URL}/api/register/`, {
        // const response = await axios.post(`http://localhost:8005/user-service/api/v1/auth/register/`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone_number: "+91" + formData.phoneNumber,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });
      console.log("..........1")
      const responseData = response.data;
      console.log(response.status)
      console.log("..........2")

      if (response.status) {
        console.log(response.data.user_id)
        navigate(`/otp/${response.data.user_id}`);
      }
      setPasswordError("");
      console.log("Sign Up successful:", response.data);
    } catch (error) {
      setMessage(error.response.data.message);
      console.error("Sign Up error:", error);
    }
  };

  const handleLoginNavigate = () => {
    navigate("/login/");
  };

  useEffect(() => {
    if (userData?.role === "admin") {
      navigate("/admin");
    } else if (userData?.role === "user") {
      navigate("/");
    }
  }, [userData]);


  return (
    <div>
      <section className="bg-gray-50 dark:bg-indigo-950">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleRegister}>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="first name"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="last name"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="usernanme"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    maxLength={10}
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="phone number"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>

                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="confirm password"
                    className="bg-gray-100 border border-gray-800  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-black  dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link className="" to={"/login"}>
                    {" "}
                    Login here
                  </Link>
                </p>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpForm;
