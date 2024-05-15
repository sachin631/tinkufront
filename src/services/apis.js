import { commonRequest } from "./apiCall";
import { BASE_URL } from "./helper";

//regsiter User Api
export const registerUser=async(data,config)=>{
    return await commonRequest("POST",`${BASE_URL}/registerUser`,data,config)
}

//user login APi
export const userLogin=async(data)=>{
    return await commonRequest("POST",`${BASE_URL}/userLogin`,data)
}

//get Login UserDetails
export const getLoginUserDetails=async()=>{
    return await commonRequest("GET",`${BASE_URL}/getLoginUserDetails`,"");
}

//userLogout
export const userLogout=async()=>{
    return await commonRequest("GET",`${BASE_URL}/userLogout`,"");
}

//updateProfileAfterLogin
export const updateProfileAfterLogin=async(data,config)=>{
    return await commonRequest("PUT",`${BASE_URL}/updateProfileAfterLogin`,data,config)

}

//get all products details
export const getAllProduct=async(page)=>{
    return await commonRequest("GET",`${BASE_URL}/getAllProduct/${page}`,"");
}

//getSingleProduct
export const getSingleProduct=async(productId)=>{
    return await commonRequest("GET",`${BASE_URL}/getSingleProduct/${productId}`,"");
}

//addToCart
export const addToCart=async(_id,data)=>{
    console.log(data,"data data dtadtad ad tadatd ",_id)
    return await commonRequest("POST",`${BASE_URL}/addToCart/${_id}`,data);
    
}

//deleteToCart
export const deleteToCart=async(_id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/deleteToCart/${_id}`); //do not add empty string like ""
}

//Admin panel Product Section
export const postProduct=async(data)=>{
    return await commonRequest("POST",`${BASE_URL}/postProduct`,data);
}
