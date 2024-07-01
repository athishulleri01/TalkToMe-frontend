// CloudinarySample.jsx

import React, { useState, useEffect } from 'react';
import cloudinary from '../../cloudinaryConfig'; // Import your Cloudinary configuration

// f
// function CloudinarySample() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [profilePicUrl, setProfilePicUrl] = useState(null); // State to store the uploaded profile picture URL

//     useEffect(() => {
//         // Cloudinary configuration is now initialized
//     }, []);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             console.log("No file selected.");
//             return;
//         }

//         try {
//             // Upload the selected file to Cloudinary
//             const uploadResult = await cloudinary.uploader.upload(selectedFile, {
//                 folder: "profile_pictures", // Specify the folder where profile pictures will be stored
//                 use_filename: true, // Use the original file name for the uploaded image
//                 unique_filename: false, // Do not add unique suffix to file name
//             });

//             // Update the profile picture URL in the state
//             setProfilePicUrl(uploadResult.secure_url);
//             console.log("Upload result:", uploadResult);
//         } catch (error) {
//             console.error("Error uploading image to Cloudinary:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Cloudinary Sample</h1>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <button onClick={handleUpload}>Upload Profile Picture</button>
            
//             {/* Render the uploaded profile picture */}
//             {profilePicUrl && (
//                 <div>
//                     <h2>Uploaded Profile Picture</h2>
//                     <img src={profilePicUrl} alt="Profile Picture" style={{ maxWidth: "100px", maxHeight: "100px" }} />
//                 </div>
//             )}
//         </div>
//     );
// }

export default CloudinarySample;