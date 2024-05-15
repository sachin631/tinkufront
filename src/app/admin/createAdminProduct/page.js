"use client";
import { createProduct } from "@/RTK/productSlice";
import DashBoard from "@/app/dashboard/page";
// import cogoToast from "cogo-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    orignialPrice: "",
    sellingPrice: "",
    category: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const dispatch = useDispatch();

  const onChange = (event) => {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  //submit handler
  const createProductSubmitHandler = async (e) => {
    e.preventDefault();
    const { name, description, category, stock, orignialPrice, sellingPrice } =
      formData;
    const myForm = new FormData();

    myForm.set("name", name);
    // myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("orignialPrice", orignialPrice);
    myForm.set("sellingPrice", sellingPrice);

    images.forEach((image, index) => {
      // myForm.append("images", image);
      myForm.append(`images[${index}]`, image);
    });
    const data = await dispatch(createProduct(myForm));
    console.log(data.payload, "asdasd datat");
    if (data.payload.status !== 200) {
      // cogoToast.error("somthing wrong try agin")
      toast.error("somthing wrong try again");
    }
    if (data.payload.status == 200) {
      // cogoToast.success("store succesfully");
      toast.success("store succesfully");
    }
  };

  // image  change
  const imageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const { loading, error, product } = useSelector(
    (state) => state.createProduct
  );
  console.log(loading, "loading");
  console.log(error, "error");
  console.log(product, "product");

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen ">
  //       <ColorRing
  //         visible={true}
  //         height="80"
  //         width="80"
  //         ariaLabel="blocks-loading"
  //         wrapperStyle={{}}
  //         wrapperClass="blocks-wrapper"
  //         colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
  //       />
  //     </div>
  //   );
  // }
  //  if(product[0]?.success==false){
  //   cogoToast.error("something went wrong ");
  // toast.error("something went wrong ");

  // }
  // if(product[0]?.success==true){
  //   cogoToast.success("Product Store Successfully");
  // }

  // const data=useSelector((state)=>{
  //   console.log(state.createProduct.product[0].success);
  // })

  // state.createProduct.product[0].success

  return (
    <>
      <div>
       
        <DashBoard />
        <h1 className="text-center mt-10 font-semibold text-4xl leading-10">
          Create Product
        </h1>
        <form
          className="flex justify-center items-center flex-col mt-5 gap-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <label for="name">Enter Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="product Name"
              className="border-[1px] border-black outline-none px-4 rounded"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="orignialPrice">Enter Product orignialPrice Price</label>
            <input
              id="orignialPrice"
              name="orignialPrice"
              type="text"
              placeholder="product orignialPrice Price"
              className="border-[1px] border-black outline-none px-4 rounded"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="sellingPrice">Enter Product sellingPrice Price</label>
            <input
              id="sellingPrice"
              name="sellingPrice"
              type="text"
              placeholder="product sellingPrice Price"
              className="border-[1px] border-black outline-none px-4 rounded"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="description">Enter Product description</label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="product description"
              className="border-[1px] border-black outline-none px-4 rounded"
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="category">Choose category</label>
            <select
              onChange={onChange}
              name="category"
              id="category"
              label="choose category "
              className="w-[200px] border-[1px] border-black outline-none px-4 rounded"
            >
              {/* <option >Chose Category</option> */}
              <option value="laptop">laptop</option>
              <option value="camera">camera</option>
              <option value="smartPhone">smartPhone</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label for="stock">Enter Product stock</label>
            <input
              onChange={onChange}
              name="stock"
              id="stock"
              type="text"
              placeholder="product stock"
              className="border-[1px] border-black outline-none px-4 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="file">choose file</label>
            <input
              accept="image/*"
              onChange={imageChange}
              name="images"
              id="file"
              type="file"
              placeholder="product images max 5"
              multiple
              className="border-[1px] border-black outline-none px-4 rounded"
            />
          </div>
          <div
            id="createProductFormImage"
            className="flex md:flex-row flex-col  gap-2 "
          >
            {imagePreview.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Product Preview"
                className="w-[70px] h-[70px]"
              />
            ))}
          </div>
          <button
            onClick={createProductSubmitHandler}
            type="submit"
            className="bg-black px-2 py-2 text-white rounded"
          >
            Create
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateProduct;
