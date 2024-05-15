"use client";
import { Provider } from "react-redux";
import { store } from "../RTK/store";
const ProviderRtk = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderRtk;

// import React from 'react'

// const rtkProvider = () => {
//   return (
//     <div>rtkProvider</div>
//   )
// }

// export default rtkProvider
