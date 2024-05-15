"use client";
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import api from "@/services/api";
import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
// import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { registerUser, updateProfileAfterLogin } from "@/services/apis";
import { useRouter } from "next/navigation";

export default function Example() {
  const router=useRouter();

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [form, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    passWord: "",
    rePassword: "",
  });
  const queryClient=useQueryClient();
  // all data store onChnage function
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...form,
      [name]: value,
    });
  };
  console.log("form", form);
  // image onChange Function
  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  console.log("image", image);

  //useEfffect function for Preview of the image
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const onSubmit = (event) => {
    event.preventDefault();

    const { name, email, phoneNumber } = form;
    const data = new FormData();
    data.append("avatar", image);
    data.append("name", name);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber);
    

    if (
      name == "" ||
      email == "" ||
      phoneNumber == "" 
     
    ) {
      // cogoToast.error("please fill all fields properly");
      toast.error("please fill all fields properly");
    }

    

    if (!isLoading) {
      mutate(data);
    }
  };

  const { mutate, isLoading } = useMutation(
    async (data) => {
      let config = {
        "Content-Type": "multipart/form-data",
      };
      // const res = await api.post("registerUser", data);
      const res = await updateProfileAfterLogin(data, config);
      console.log(res);
      if (res.status !== 200) {
        throw error;
      }
    },

    {
      onSuccess:async () => {
        // cogoToast.success("Your data is Store SuccesFuly");
        toast.success("Your data is Store SuccesFuly");
        setFormData({
          ...form,
          name: "",
          email: "",
       
          phoneNumber: "",
        });

      await  queryClient.invalidateQueries("getLoginUserDetails");
      router.push("/")
        // queryClient.clear();

      },
      onError: () => {
        // cogoToast.error("someting went wrong try again later !");
        toast.error("someting went wrong try again later !");
      },
    }
  );

  return (
    <>
      {isLoading ? ( <div className="flex justify-center items-center min-h-screen ">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>) : ""}
      {/* cogoToast.loading("loading...") */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* shown profile picture/avatar area */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto  rounded-full w-[100px] h-[100px]"
            src={preview ? preview : ""}
            alt="Your profile pic"
            onChange={() => {}}
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* input profile picture */}
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                profile Picture
              </label>
              <div className="mt-2">
                <input
                  onChange={onImageChange}
                  
                  id="file"
                  name="avatar"
                  accept="image/*"
                  type="file"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* name field start */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  value={form.name}
                  name="name"
                  id="text"
                  type="text"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* phoneNumber field Start */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                phoneNumber
              </label>
              <div className="mt-2">
                <input
                  value={form.phoneNumber}
                  onChange={onChange}
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={form.email}
                  onChange={onChange}
                  name="email"
                  id="email"
                  type="email"
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <div>
              <button
                onClick={onSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                update Profile
              </button>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}
