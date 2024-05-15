"use client";
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addToCart, getSingleProduct } from "@/services/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import cogoToast from "cogo-toast";


import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { MdDelete } from "react-icons/md";

const CardDetails = ({ params }) => {
  const [quantityValue,setQuantityValue]=useState(1);
  const queryClient=useQueryClient();
  console.log(params.id);
  
  const productId = params.id;
  const { isFetching, isError, data } = useQuery({
    queryKey: ["getSingleProduct",productId],
    queryFn: async () => {
      const res = await getSingleProduct(productId);

      return res.data;
    },
  });
  console.log("getSingleProduct", data?.message);
  console.log(data?.message?._id)

  if (isFetching) {
    // cogoToast.loading("loading---");
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
  }
  if (isError) {
    // cogoToast.error("something went wrong try again later or Refresh The Page");
    toast.error("something went wrong try again later or Refresh The Page");
  }


  //call api for add To Cart
  const {mutate,addToCartLoading:isLoading}=useMutation(async(_id)=>{
      const responseOfAddToCart=await addToCart(_id,{quantity:quantityValue});
      console.log(responseOfAddToCart);
      if (responseOfAddToCart.status !== 200) {
        throw new Error;
      }
      // return responseOfAddToCart;
      
      
     
  },{
    onSuccess:async()=>{
      // cogoToast.success("Congratulations Product Add To Cart Successfuly");
      toast.success("Congratulations Product Add To Cart Successfuly");
    await  queryClient.invalidateQueries("getLoginUserDetails")
      
    },
    onError:()=>{
      // cogoToast.error("Something Went Wrong Try again, product not added to cart")
      toast.error("Something Went Wrong Try again, product not added to cart");
    }
  })
  // if(addToCartLoading){
  //   cogoToast.loading("kjhkjhkjhkjhjkh");
  // }
  console.log(quantityValue)
  return (
    <>
      <section className="h-[100%] font-[poppins] ">
        <h1 className="text-center font-bold text-lg mt-4">
          Items Details Page
        </h1>
        <div className="flex justify-start items-start">
          <div className="bg-blue-500 rounded flex md:flex-row justify-start items-center gap-[5%] p-2 pt-4 pb-4 mt-24 flex-col space-y-5 shadow-2xl shadow-black w-[80%] ml-[10%] mr-[10%]">
            <div className="w-[50%]">
            
              <Carousel className="w-[100%]">
                {data?.message.images.map((curelem) => {
                  return (
                    <div className="">
                      <img src={curelem.url} className="w-[100px" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="flex flex-col space-y-5">
              <div>
                <strong>Name:</strong>
                <span className="text-white">{data?.message?.name}</span>
              </div>
              <div>
                <strong>Price:</strong>
                <span className="text-white">{data?.message?.sellingPrice}</span>
              </div>
              <div>
                <strong>Stock:</strong>
                <span className="text-white">{data?.message?.stock}</span>
              </div>
              <div>
                <strong>category:</strong>{" "}
                <span className="text-white">{data?.message?.category}</span>
              </div>
              <div>
                <strong> Total:₹</strong>
                <span className="text-white">price</span>
              </div>
              <div>
                <button className="flex justify-between items-center bg-slate-800 space-x-4 px-2   text-white">
                  <span className="text-[2rem]"onClick={()=>{
                    if(quantityValue>1){
                      setQuantityValue(quantityValue-1);
                    }else{
                      // cogoToast.error("Not less then 1")
                      toast.error("Not less then 1")
                    }
                  }}>-</span>
                  <span className="text-white">{quantityValue}</span>
                  <span className="text-[2rem]" onClick={()=>{
                    if(quantityValue<data?.message?.stock){
                      setQuantityValue(quantityValue+1);
                    }else{
                      // cogoToast.error("can not select more then stock value")
                      toast.error("can not select more then stock value")
                    }
                  }}>+</span>
                </button>
              </div>
              <div className="flex flex-col justify-start items-start space-y-5 ">
             
             <div className="relative">
               <strong>description:</strong>
               <span className="text-white">{data?.message?.description}</span>
             </div>
             {/* <div>
               <strong>Remove:</strong>
               <span>
                 <button className="text-center flex justify-center items-center">
                   <MdDelete />
                 </button>
               </span>
             </div> */}
             <div>
              
             
                 <button onClick={()=>{
                  // if(!addToCartLoading){
                    const _id=data?.message?._id;
                    console.log(_id,"-id")
                    const requestData = { quantity: 1 }; // Prepare request body quantityValue

                    mutate(_id, requestData);
                  // }
                 }} className="text-center flex justify-center items-center bg-orange-400 px-3 py-3 rounded text-white active:text-blue-500">
                   Add To Cart
                 </button>
              
             </div>
           </div>
            </div>
            
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default CardDetails;
