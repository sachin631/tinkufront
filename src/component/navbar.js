"use client";


import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

import React from "react";
import { pink } from "@mui/material/colors";

// import HomeIcon from '@mui/material/HomeIcon';
import { AiFillHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLoginUserDetails, userLogout } from "@/services/apis";
// import cogoToast from "cogo-toast";
import { RotatingLines } from "react-loader-spinner";
// import { queryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", current: true },
//   { name: "Login", href: "/login", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  //start logic getLoginUserDetails

  //getLogin user Details Api
  const { isLoading, error, data } = useQuery({
    queryKey: ["getLoginUserDetails"],
    queryFn: async () => {
      const res = await getLoginUserDetails();

      return res;
    },
  });
  console.log(data);

  const cartLength = data?.data ? data.data.user.cart.length : null;

  const queryClient = useQueryClient();
  const logOutMutation = useMutation(
    async () => {
      const response = await userLogout();
      return response;
    },
    {
      onSuccess:async () => {
        // cogoToast.success("logOut SuccessFully");
        toast.success("logOut SuccessFully");
      await  queryClient.clear();
      await  queryClient.invalidateQueries({queryKey:["getLoginUserDetails"]}); // Trigger revalidation
      },
      onError: () => {
        // cogoToast.error("somthing went wrong try again ....");
        toast.error("somthing went wrong try again ....");
      },
    }
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      // src={data ? data.data.user.avatar:""}
                      alt="Your Company"
                    /> */}
                    <AiFillHome className="text-blue-500 w-[20px]" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  {/* <div className="flex space-x-4">
                    {navigation.map((curelem, index, array) => (
                      <Link
                        href={curelem.href}
                        key={curelem.name}
                        className={classNames(
                          curelem.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {curelem.name}
                      </Link>
                    ))}
                  </div> */}

                  <div className="flex space-x-4 ">
                    <div
                      className="text-gray-300 cursor-pointer  hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        if (data?.data?.user.role == "user") {
                          // cogoToast.error("only admin can access");
                          toast.error("only admin can access");
                        }
                      }}
                    >
                      {" "}
                      <Link
                        href={
                          data?.data?.user.role == "user" ? "" : "/dashboard"
                        }
                      >
                        DashBoard
                      </Link>
                    </div>
                    <div className="text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white">
                      <Link href={"/login"}>Login</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (!data?.data?.user) {
                        // cogoToast.error("login to access Your Cart Data");
                        toast.error("login to access Your Cart Data");
                      }
                    }}
                  >
                    <Link href={data?.data?.user ? "/cart" : ""}>
                      <div className="relative">
                        <IconButton aria-label="cart">
                          <StyledBadge
                            badgeContent={cartLength ? cartLength : "0"}
                            color="secondary"
                          >
                            <ShoppingCartIcon className="text-orange-500" />
                          </StyledBadge>
                        </IconButton>
                      </div>
                    </Link>
                  </div>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        src={
                          data
                            ? `http://localhost:27017/uploads/${data?.data?.user.avatar}`
                            : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={() => {
                              if (!data?.data?.user) {
                                // cogoToast.error("Please Login To access");
                                toast.error("Please Login To access");
                              }
                            }}
                            href={data?.data?.user ? "/profile" : ""}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100 w-[100%]" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={logOutMutation.mutate}
                          >
                            {" "}
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
             <ToastContainer />
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))} */}

              <div
                className="text-gray-300 cursor-pointer  hover:bg-gray-700 hover:text-white"
                onClick={() => {
                  if (data?.data?.user.role == "user") {
                    // cogoToast.error("only admin can access");
                    toast.error("only admin can access");
                  }
                }}
              >
                {" "}
                <Link
                  href={data?.data?.user.role == "user" ? "" : "/dashboard"}
                >
                  DashBoard
                </Link>
              </div>

              {/* <div className="text-white">Dashboard</div> */}
              <Link href={"/login"}>
              <div className="text-white" >Login</div>
              </Link>
            
            </div>
          </Disclosure.Panel>
        </>
      )}
      
    </Disclosure>
  );
}
