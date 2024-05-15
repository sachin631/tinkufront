"use client";
import { deleteToCart } from "@/services/apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import cogoToast from "cogo-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState();
  const queryClient = useQueryClient();

  //deletToCart
  const { isLoading, mutate } = useMutation(
    async (_id) => {
      const responseOfDelete = await deleteToCart(_id);
      console.log("responseOfDelete", responseOfDelete);
      if (responseOfDelete.status !== 200) {
        throw new Error();
      }
      return responseOfDelete;
    },
    {
      onSuccess: async () => {
        // cogoToast.success("product deleted successFuly");
        toast.success("product deleted successFuly");
        queryClient.invalidateQueries({ queryKey: ["getLoginUserDetails"] });
        await queryClient.refetchQueries("getLoginUserDetails");
        await getUserData();
      },
      onError: () => {
        // cogoToast.error("product not deleted try again");
        toast.error("product not deleted try again");
      },
    }
  );

  const getUserData = async () => {
    const userDetailQueryData = await queryClient.getQueryData(["getLoginUserDetails"]);
    console.log(userDetailQueryData ? userDetailQueryData : "");
    setData(userDetailQueryData);
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 1000);

    //  getUserData();
  }, [data]);

  useEffect(() => {
    if (data?.data?.user?.cart) {
      // Calculate total price
      const totalPrice = data.data.user.cart.reduce((acc, curelem) => {
        return acc + curelem.product.sellingPrice * curelem.quantity;
      }, 0);
      setTotal(totalPrice);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex justify-center items-center mt-[200px] ">
        <RotatingLines
          strokeColor="brown"
          strokeWidth="3"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    );
  }
  console.warn(data?.data?.user);

  //deleteButton
  const deleteButton = (_id) => {
    if (!isLoading) {
      mutate(_id);
    }
  };

  return (
    <>
      <div className="bg-slate-200 min-h-[100vh] py-10">
        <div className="container bg-white mx-auto">
          <div className="px-4 py-4 flex flex-col justify-start items-start gap-3">
            <div className="text-2xl">Cart</div>
            <hr className="h-[1] w-[100%]" />
            {data?.data?.user?.cart.map((curelem, index) => {
              console.warn("asdasd", curelem.product?.images[0].url);
              return (
                <>
                  <div
                    className="flex sm:justify-between justify-center items-center w-[100%] sm:flex-row flex-col gap-2"
                    key={index}
                  >
                    <div className="flex sm:flex-row flex-col  gap-4 ">
                      {/* {
                        curelem.product.images.map((curelem2) => {
                          return ( */}
                      <div className="">
                        <img
                          src={curelem.product.images[0].url}
                          width={100}
                          height={100}
                        />
                      </div>
                      {/* );
                        })
                      } */}

                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          {" "}
                          <span className="font-bold text-orange-500">
                            Name:{" "}
                          </span>{" "}
                          {curelem.product.name}
                        </div>
                        <div className="flex gap-2">
                          {" "}
                          <span className="font-bold text-orange-500">
                            Category:{" "}
                          </span>{" "}
                          {curelem.product.category}
                        </div>
                        <div>
                          <span className="font-bold text-orange-500">
                            Quantity :
                          </span>{" "}
                          {curelem.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                      <div>
                        <span className="font-bold text-orange-500">
                          {" "}
                          Price : ₹{" "}
                        </span>
                        {curelem.product.sellingPrice}
                      </div>
                      <div>
                        <span className="font-bold text-orange-500">
                          TotalPrice :
                        </span>{" "}
                        {curelem.product.sellingPrice}*{curelem.quantity} = ₹
                        {curelem.product.sellingPrice * curelem.quantity}
                      </div>
                      <button
                        className="text-blue-500  flex justify-end active:text-red-500"
                        onClick={() => deleteButton(curelem.product._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  <hr className="w-[100%]" />
                </>
              );
            })}

            <div className="flex justify-between w-[100%]">
              <div className="flex flex-col gap-3">
                <div>SubTotal</div>
                <p className="text-sm">shopping and taxes added at checkout</p>
              </div>
              <div>{total}</div>
            </div>
            <div className="w-[100%]">
              <Link href="/checkout">
                <button className="bg-blue-500 text-white hover:text-black w-[100%] text-center rounded py-3">
                  Checkout
                </button>
              </Link>
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <Link href="/">
                <button className="text-center">Continue Shopping -- </button>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;
