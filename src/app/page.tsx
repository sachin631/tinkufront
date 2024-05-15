"use client";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import BasicAccordion from "@/component/filter";
import Example from "@/component/filter";
import Navbar from "@/component/navbar";
import { getAllProduct } from "@/services/apis";
import { Pagination } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import cogoToast from "cogo-toast";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { RotatingLines } from "react-loader-spinner";

//accrodion import start
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: any) {
  return `${value}°C`;
}

//accrodion import end

export default function Home() {
  //below is for accordion work
  const [value, setValue] = React.useState([0, 100000]);
  console.log("value", value[0], value[1]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  //above is for accordion work
  const [selectedValue, setSelectedValue] = useState("");
  const queryClient = useQueryClient();
  const [page1, setPage] = useState(1);
  const category = selectedValue;
  const { isFetching, isError, data } = useQuery({
    queryKey: ["getAllProduct", page1, category, value],
    queryFn: async () => {
      const page2 = `?sellingPrice[gte]=${value[0]}&sellingPrice[lte]=${
        value[1]
      } &page=${page1}&category=${category ? category : ""}`;
      const response = await getAllProduct(page2);
      return response.data;
    },
  });
  console.log("getAllProducts", data?.productCount);
  const countNumberOfPage = Math.ceil(data?.productCount / 5); //means total product/number of product per page
  console.log("countNumberOfPage", Math.ceil(countNumberOfPage));
  console.log("page1", page1);

  const handleListChange = (event: any) => {
    setSelectedValue(event.target.textContent);
  };
  console.log("selectedValue", selectedValue);
  const allProductfunction = () => {
    setSelectedValue("");
  };
  return (
    <main className="mt-5 w-full ">
      <div className=" mt-2 container mx-auto text-3xl scale-100">
        E-commerce
      </div>
      <div className=" mt-4   w-full bg-slate-300 flex justify-center items-center min-h-[79vh] ">
        <div className="bg-white mt-4 px-4 my-4 rounded container mx-auto">
          <div className="flex justify-between mt-5 gap-4 ">
            <div className="text-black text-2xl">All Product</div>
            {/* <div className="flex justify-center items-center gap-4">
              <div>Sort</div>
              <div>
                <BsFillGridFill />
              </div>
            </div> */}
          </div>
          <hr />
          <div className="flex justify-start items-start mt-4 gap-4 ">
            <div className="w-[50%] md:w-[20%]">
              {/* <BasicAccordion /> */}
              <main>
                <h1 className="font-bold ">Price</h1>
                <Box>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    step={1000}
                    max={100000}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
                <div>
                  <h1 className="text-cente font-bold">Categories</h1>
                  <div>
                    <ul
                      className="flex flex-col gap-3 justify-center items-center mt-3 "
                      id="#myList"
                    >
                      <li
                        className="cursor-pointer active:text-blue-500"
                        onClick={allProductfunction}
                      >
                        All Products
                      </li>
                      <li className="cursor-pointer" onClick={handleListChange}>
                        laptop
                      </li>

                      <li
                        className="cursor-pointer "
                        onClick={handleListChange}
                      >
                        camera
                      </li>
                      <li className="cursor-pointer" onClick={handleListChange}>
                        smartPhone
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex flex-col ">
                  <h1 className="font-bold">Rating Above</h1>
                  <input type="range" max={5} defaultValue={5} />
                </div>
              </main>
            </div>
            {/* picture - picture  -picture- picture-    picture   -  picture  -   picture  -    picture  -    picture*/}

            {!data ? (
              <RotatingLines
                strokeColor="brown"
                strokeWidth="2"
                animationDuration="0.75"
                width="196"
                visible={true}
              />
            ) : (
              ""
            )}

            <div className="grid md:grid-cols-3 grid-cols-1  justify-items-center w-[100%] gap-4">
              {/* first product Start */}
              {data?.message.map((curelem: any, key: any, index: any) => {
                return (
                  <div
                    className="flex flex-col gap-4 mt-4 border-2 border-orange-500 rounded p-1"
                    key={curelem._id}
                  >
                    <div>
                      <Link href={`/product/${curelem._id}`}>
                        <img
                          // src="/tshirt.jpg"
                          src={curelem.images[0].url}
                          width={200}
                          height={200}
                          alt="best t-shirt"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-between">
                      <div>{curelem.name}</div>
                      <div>${curelem.sellingPrice}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-x-1 justify-start items-center">
                        <div className="h-[100%] text-center">
                          <AiFillStar />
                        </div>
                        <div className="text-start ">4.4</div>
                      </div>
                      <div className="line-through">
                        ${curelem.orignialPrice}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
          <div className="flex justify-between w-[100%] mt-16 py-4">
            <p className="md:text-base text-xs">showing 1 of 10 of 97 result</p>
            <div className="">
              <Pagination
                count={countNumberOfPage}
                color="primary"
                page={page1}
                onChange={(e, p: any) => {
                  console.log("p", p);
                  setPage(p);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
