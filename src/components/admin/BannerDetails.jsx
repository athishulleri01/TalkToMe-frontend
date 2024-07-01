import React, { useEffect } from 'react'
import AdminNav from '../common/AdminNav'
import AdminSideBar from '../common/AdminSideBar'
import { setUserAdminInfo, updateUserAdminInfo } from "../../features/admin/userdata/UserAdminInfo"
import axiosInstance from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from '../common/TableHeader'


function BannerDetails() {


    const dispatch = useDispatch();
    const userAdminInfo = useSelector(
        (state) => state.userAdminInfo.data
    );

    const fetchUserDetails = async () => {


        try {
            const response = await axiosInstance.get("/api/admin/user/all/");
            console.log(response.data);

            if (response.status) {
                dispatch(setUserAdminInfo(response.data));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleBlock = async (userId) => {
        try {
            const response = await axiosInstance.patch(`/admin/user/block/${userId}/`);
            console.log(response.data);

            if (response.status) {
                dispatch(updateUserAdminInfo(response.data));
                fetchUserDetails();
            }
        } catch (error) {
            console.error("Error blocking/unblocking user:", error);
        }
    };


    return (
        <>
            <AdminNav />
            <div className='flex'>

                <AdminSideBar />


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:mt-0 ml-10 ">
                    <h1 className='m-4 dark:text-white'><b>Banner Details</b></h1>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <TableHeader label={''} />
                                <TableHeader label={'Name'} />

                                <TableHeader label={'Image'} />                           
                                <TableHeader label={'Create at'} />                           
                            </tr>
                        </thead>
                        <tbody>
                            {userAdminInfo?.map((user, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" key={user.id} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    
                                    <td className="px-6 py-4">
                                        {user.first_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.join_date}
                                    </td>

                                    <td className="px-6 py-4 ">
                                    {
                                        user.is_superuser? (
                                        <>
                                        </>
                                        ):(
                                            <>
                                            <button
                                            onClick={() => handleBlock(user.id)}
                                            className={user.is_blocked ? "bg-green-700 h-7 w-20 text-white" : "bg-red-700 h-7 w-20 text-white"}
                                            variant={!user.is_blocked ? "destructive" : "default"}
                                        >
                                            {!user.is_blocked ? "Block" : "Unblock"}
                                        </button>
                                            </>
                                        )
                                    }
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </ >
    )
}

export default BannerDetails;
