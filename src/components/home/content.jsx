import React, { useEffect, useState } from 'react'
import { SlCallEnd } from "react-icons/sl";
import { TiGroup } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";


function content() {
   


return (
        <div className='flex flex-wrap gap-4'>

{[...Array(20)].map((_, index) => (
        <ContentItem key={index} />
      ))}
    
            
        </div>
    )
}

export default content


function ContentItem() {
    return (
        <div className="max-w-sm p-6 mt-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex '>

            <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                {/* <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" /> */}
                <TiGroup />
            </svg>
            <div className='ml-2 text-white'>

                <h4><b>English + Arabic</b></h4>
            </div>
            <div className='ml-4 text-white'>

                <h4><i>Any Level</i></h4>
            </div>
        </div>

        <div className="mb-3 font-normal text-gray-500 dark:text-gray-400 flex flex-wrap gap-4 ">
            <img className="dark:bg-white mx-3 w-10 h-10 rounded-full" src="https://picsum.photos/200" alt="Rounded avatar" />
            <img className="dark:bg-white mx-3 w-10 h-10 rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg" alt="Rounded avatar" />
            <img className="dark:bg-white mx-3 w-10 h-10 rounded-full" src="https://picsum.photos/200" alt="Rounded avatar" />
            <img className="dark:bg-white mx-3 w-10 h-10 rounded-full" src="https://picsum.photos/200" alt="Rounded avatar" />
            <img className="dark:bg-white mx-3 w-10 h-10 rounded-full" src="https://picsum.photos/200" alt="Rounded avatar" />

        </div>
        <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="flex relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <SlCallEnd className='ml-3' /> Join and talk now
                </span>
            </button>

        </a>
    </div>
    );
  }