import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './CustomInput.css'

const CustomInput = ({ icon, type, placeholder, value, onChange, name }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input_wrapp ">
            <div className="input_container flex items-center">
                {icon && (
                    <div className="input_icon mr-2">
                        {icon}
                    </div>
                )}

                <input
                    type={showPassword ? 'text' : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="input_field flex-1 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                />

                {type === 'password' && (
                    <div className="input_icon ml-2" onClick={handleTogglePassword}>
                        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomInput;
