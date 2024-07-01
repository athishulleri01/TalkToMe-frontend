import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxndXY-0SH-6IwwqziGbqYh-ueQSDs3KM",
  authDomain: "talktome-37ca8.firebaseapp.com",
  projectId: "talktome-37ca8",
  storageBucket: "talktome-37ca8.appspot.com",
  messagingSenderId: "616958269644",
  appId: "1:616958269644:web:5ca777f1752f382e3f0a69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
