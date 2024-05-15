
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const Profile = () => {
  const [data, setData] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 1000);
  }, []);

  const getUserData = async () => {
    const userDetailQueryData = await queryClient.getQueryData([
      "getLoginUserDetails",
    ]);
    console.log(userDetailQueryData ? userDetailQueryData : "");
    setData(userDetailQueryData);
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center mt-[200px] ">
        <RotatingLines
          strokeColor="blue"
          strokeWidth="5"
          animationDuration="0.75"
          width="196"
          visible={true}
        />
      </div>
    );
  }
  console.log(data?.data?.user);

  return (
    <>
      <h1 className="text-center text-black font-bold mt-5">User Details</h1>
      <div className="flex flex-col justify-center items-center gap-9 mb-24">
        <figure className="text-center">
          <img
            src={
              data?.data?.user
                ? `http://localhost:27017/uploads/${data?.data?.user.avatar}`
                : ""
            }
            alt="avatarImage"
            className="w-[100px] h-[100px] rounded-full"
          />
        </figure>
        <h1 className="text-[20px] font-bold">
          Your_ID :{" "}
          <span className="font-bold text-[15px] ">{data?.data?.user._id}</span>
        </h1>
        <h1 className="text-[20px] font-bold">
          Your_Name :{" "}
          <span className="font-bold text-[15px] ">{data?.data?.user.name}</span>
        </h1>
        <h1 className="text-[20px] font-bold">
          Your_Email :{" "}
          <span className="font-bold text-[15px] ">{data?.data?.user.email}</span>
        </h1>
        <h1 className="text-[20px] font-bold">
          Your_PhoneNumber :{" "}
          <span className="font-bold text-[15px] ">
            {data?.data?.user.phoneNumber}
          </span>
        </h1>
        <h1 className="text-[20px] font-bold">
          Your_Role :{" "}
          <span className="font-bold text-[15px] ">{data?.data?.user.role}</span>
        </h1>

        {/* Display other user details similarly */}

      <Link href="/updateProfile" >  <button className="bg-blue-500 text-white px-3 py-3 rounded">
          Update 
        </button></Link>
      </div>
    </>
  );
};

export default Profile;
