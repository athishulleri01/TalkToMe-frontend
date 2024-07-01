import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AUTH_URL } from "../../axiosConfig";
import { loginSuccess, loginFailure } from "../../features/auth/userSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axiosInstance";

function OtpForm() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);
  const [timer, setTimer] = useState(300);
  const [otpValue, setOtpValue] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    0;
    const otpString = newOtp.join("");
    console.log(otpString);
    setOtpValue(otpString);

    // Move focus to the next input box
    if (value && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const { id } = useParams();
 

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    
    if (userData?.role === "admin") {
      navigate("/admin");
    } else if (userData?.role === "user" ) {
      navigate("/");
    }
    return () => clearInterval(intervalId);
  }, [timer, userData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${AUTH_URL}/api/verify-otp/`, {
            otp: parseInt(otpValue),
            user_id: id,
        });

        console.log("Response:", response['data']);
        console.log("Response:", response.data);

        if (response.status === 200) {
            console.log("otp login");
            navigate("/login");
        } else {
            console.error("Unexpected response status:", response.status);
            toast.error('Unexpected response status');
        }
        console.log("otp successful:", response.data);
    } catch (error) {
        if (error.response) {
            console.log("Error response data:", error.response.data);
            toast.error('Invalid OTP');
        } else {
            console.error("Network or server error:", error);
            toast.error('Network or server error');
        }
    }
};
  

  async function handleResend(e) {
    e.preventDefault();

    console.log("Resend OTP");
    setTimer(300);
    setIsResendDisabled(true);
    setOtp(["", "", "", "", "", ""])
    try {
      const response = await axios.post(`${AUTH_URL}/api/otp/resend/`, {
        user_id: id,
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden dark:bg-indigo-950 py-12">
        <div className="relative dark:bg-gray-800 dark:border-gray-700 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl dark:text-gray-300">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400 ">
                <p>We have sent a code to your email</p>
              </div>
            </div>

            <div>
              <form action="" method="post" onSubmit={onSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((digit, index) => (
                      <div key={index} className="w-16 h-16 m-2">
                        <input
                          ref={(el) => (otpInputs.current[index] = el)}
                          className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-900 text-lg bg-blue-100 focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>
                    <span className="text-red-500">
                      {timer > 0 ? `Resend OTP in ${Math.floor(timer / 60)}:${timer % 60}` : ""}
                    </span>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive the code?</p>{" "}
                    
                      <button onClick={(event) => handleResend(event)} className="flex flex-row items-center text-blue-600">Resend OTP</button>
                    </div>
                  </div>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
