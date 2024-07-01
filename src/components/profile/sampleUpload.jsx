// CloudinarySample.jsx

import React, {useState, useEffect } from 'react';
import { v2 as cloudinary } from 'cloudinary';

function CloudinarySample() {
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        (async function () {
            // Configuration
            cloudinary.config({
                cloud_name: "dr8y568ht",
                api_key: "661472319711786",
                api_secret: "8lUzqrHykYC5ePzKwLuDH91TM6Q"
            });

        })();
    }, []);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log("No file selected.");
            return;
        }

        try {
            // Upload the selected file to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(selectedFile, {
                public_id: `user_uploaded_image_${Date.now()}`,
            });
            console.log("Upload result:", uploadResult);
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };
    return (
        <div>
            <h1>Cloudinary Sample</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {/* You can render additional components or UI here */}
        </div>
    );
}

export default CloudinarySample;
