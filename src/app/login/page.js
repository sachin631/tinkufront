"use client";
import { ColorRing } from 'react-loader-spinner'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { userLogin } from "@/services/apis";
// import cogoToast from "cogo-toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Example() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // data.email=data.email.toLowerCase();
    if (!isLoading) {
      mutate(data);
    }
  };
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    async (data) => {
      const res = await userLogin(data);
      console.log("res", res);
      if (res.status !== 200) {
        throw new Error();
      }
    },
    {
      onSuccess: async () => {
        // cogoToast.success("login successFuly");
        toast.success("login successFuly");
        reset();
        await queryClient.invalidateQueries({queryKey:["getLoginUserDetails"]} );
        await queryClient.getQueryData(["getLoginUserDetails"]);

        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
      onError: () => {
        // cogoToast.error("Invalid Details");
        toast.error("Invalid Details");
        // setIsLoading(false);
      },
    }
  );
  return (
    <>
      {isLoading ? (
        
          <div className="flex justify-center items-center min-h-screen ">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
       
      ) : (
        ""
      )}
      {/* // cogoToast.loading("loading...") */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email ? <p>email error</p> : ""}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  {...register("passWord")}
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.passWord && <p>Password error</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link href="signup" className="text-blue-500 font-bold">
              SignUp
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
