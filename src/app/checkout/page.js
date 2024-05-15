"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import Cart from "../cart/page";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteToCart, getLoginUserDetails } from "@/services/apis";
// import cogoToast from "cogo-toast";
import { RotatingLines } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Checkout = () => {
  const [total,setTotal]=useState(0)
  const [data, setData] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {

    setTimeout(()=>{
      getUserData();
    },1000)
   
   

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



   //deletToCart
   const {isLoading,mutate}=useMutation(async(_id)=>{
    const responseOfDelete=await deleteToCart(_id);
    console.log("responseOfDelete",responseOfDelete);
    if(responseOfDelete.status!==200){
     
      throw new Error;
      
    }
    return responseOfDelete;
    
  },{
    onSuccess:async()=>{
      // cogoToast.success("product deleted successFuly");
      toast.success("product deleted successFuly");
      queryClient.invalidateQueries({queryKey:["getLoginUserDetails"]});
    await  queryClient.refetchQueries("getLoginUserDetails");
    await  getUserData();
    },
    onError:()=>{
      // cogoToast.error("product not deleted try again");
      toast.error("product not deleted try again");
    }
  });

  const getUserData = async () => {
    const userDetailQueryData = await queryClient.getQueryData(["getLoginUserDetails"]);
  // const demo= await queryClient.invalidateQueries("getLoginUserDetails");
 
    console.log(userDetailQueryData ? userDetailQueryData : "");
    setData(userDetailQueryData);
  };

  const payNow=async()=>{
    const stripe = await loadStripe('pk_test_51NjDbvSDdruy8IaQVIy3lm8PffsPCBpJAcQ5zm2zctYJlrU5H5INip8rp6xmg4wSI6mBej7TtTW2PSggWv8aD7rC00JFyxotlA');

    const body={
      products1:data?.data?.user?.cart
    }
    const header={
      
        "Content-Type":"application/json"
      
    }
    const response=await fetch("http://localhost:27017/payNow",{
      method:"POST",
      headers:header,
      body:JSON.stringify(body)
    });

    const session=await response.json();

    const result=stripe.redirectToCheckout({
      sessionId:session.id
    });
    if(result.error){
      console.log(result.error);
    }
  }
 
 

  if (!data) {
    return (
      <div className="flex justify-center items-center mt-[200px] ">
        <RotatingLines
          strokeColor="brown"
          strokeWidth="2"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    );
  }
  console.warn(data?.data?.user ,"warningggggggggggggg");

  //deleteButton
  const deleteButton=(_id)=>{
    if(!isLoading){
      mutate(_id)

    }
   
  }

  return (
    <>
      <div className="w-full min-h-[100vh] bg-slate-300 pt-10">
        <div className="container mx-auto bg-white flex md:flex-row flex-col gap-2 justify-between px-3 py-3">
          <div className="flex flex-col gap-8 md:w-[60%]">
            <div>
              <div className="font-bold">Personal Information</div>
              <p>use a permanent address where you can receive mail</p>
            </div>
            <div className="flex flex-col gap-3">
              <label>Full Name</label>
              <input
                type="text"
                className="border-[1px] border-solid border-black rounded px-3"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Email Address</label>
              <input
                type="email"
                className="border-[1px] border-solid border-black rounded px-3"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Phone</label>
              <input
                type="text"
                className="border-[1px] border-solid border-black rounded px-3"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>street</label>
              <input
                type="text"
                className="border-[1px] border-solid border-black rounded px-3"
              />
            </div>
            <div className="flex md:flex-row flex-col justify-evenly gap-4">
              <div className="flex flex-col gap-3">
                <label>city</label>
                <input
                  type="text"
                  className="border-[1px] border-solid border-black rounded px-3"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>State</label>
                <input
                  type="text"
                  className="border-[1px] border-solid border-black rounded px-3"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label>Postal code</label>
                <input
                  type="text"
                  className="border-[1px] border-solid border-black rounded px-3"
                />
              </div>
            </div>
            <hr className="h-[2px] bg-black" />
            <div className="flex justify-end gap-4">
              <button>Reset</button>
              <button className="bg-blue-500 px-3 py-4 text-white rounded active:text-black">
                Add Address
              </button>
            </div>
          </div>

          {/* below cart section start */}
          <div className="bg-slate-200 min-h-[100vh] py-10">
        <div className="container bg-white mx-auto">
          <div className="px-4 py-4 flex flex-col justify-start items-start gap-3">
            <div className="text-2xl">Cart</div>
            <hr className="h-[1] w-[100%]" />
            {data?.data?.user?.cart.map((curelem,index) => {
              
              console.warn("asdasd",curelem.product?.images[0].url)
              return (
                <>
                  <div className="flex sm:justify-between justify-center items-center w-[100%] sm:flex-row flex-col gap-2" key={index}>
                    <div className="flex sm:flex-row flex-col  gap-4 ">
                      {/* {
                        curelem.product.images.map((curelem2) => {
                          return ( */}
                            <div className="">
                            <img src={curelem.product.images[0].url} width={100} height={100} />
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
                      <button className="text-blue-500  flex justify-end active:text-red-500" onClick={()=>deleteButton(curelem.product._id)}><MdDelete/></button>
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
              {/* <Link href="/payNow"> */}
                <button onClick={payNow} className="bg-blue-500 text-white hover:text-black w-[100%] text-center rounded py-3">
                  Pay Now
                </button>
              {/* </Link> */}
            </div>
            <div className="w-[100%] flex justify-center items-center">
              <Link href="/">
                <button className="text-center">Continue Shopping -- </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

          {/* above cart end*/}
        </div>
        <div className="container mx-auto px-3 py-3">
          <h1 className="font-bold">Addresses</h1>
          <div>
            <div>choose from existing address</div>
            <div className="flex justify-between md:w-[60%] border-[1px] border-black px-3">
              <div className="flex gap-5 py-4">
                <input type="checkbox" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold">sachin sangwan</div>
                  <div>11th main</div>
                  <div>127310</div>
                </div>
              </div>
              <div className="py-4">
                <div>Phone: 8053081201</div>
                <div className="text-end">kalali</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <h1 className="font-bold">payment method</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <input type="checkbox" />
              <div>cash on delivery</div>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" />
              <div>card</div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Checkout;

// 1:9
