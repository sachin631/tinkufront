
import Link from "next/link";
import React from "react";

const DashBoard = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-center text-4xl mt-6">DashBoard</h1>
        <div className="flex md:flex-row flex-col gap-8 mt-12 justify-center items-center">
          <Link href="/admin/productAdmin">
            <div className="bg-[brown] text-3xl text-white w-[200px] h-[200px] text-center flex cursor-pointer hover:scale-105   justify-center items-center rounded-full">
              Products
            </div>
          </Link>
          <Link href="admin/orderAdmin">
            <div className="bg-orange-500 text-3xl text-white w-[200px] h-[200px] text-center flex cursor-pointer hover:scale-105 justify-center items-center rounded-full">
              Orders
            </div>
          </Link>
          <Link href="admin/userAdmin">
            <div className="bg-blue-500 text-3xl text-white w-[200px] h-[200px] text-center flex cursor-pointer hover:scale-105 justify-center items-center rounded-full">
              Users
            </div>
          </Link>
          <Link href="admin/reviewAdmin">
            <div className="bg-red-500 text-3xl text-white w-[200px] h-[200px] text-center flex cursor-pointer hover:scale-105 justify-center items-center rounded-full">
              Reviews
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
