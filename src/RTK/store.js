import {configureStore} from "@reduxjs/toolkit";
import productSlice from "../RTK/productSlice";

export  const store=configureStore({
    reducer:{
        createProduct:productSlice
    }
});

// export default store;