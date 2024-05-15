


import axios from "axios";

export const commonRequest = async (method, url, body, header) => {
  try {
    const config = {
      method,
      url,
      data: body,
      headers: header ? { ...header } : { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };

    const response = await axios(config);
    return {status:200, success: true, data: response.data };
  } catch (error) {
    return {status:400, success: false, error: error.response ? error.response.data : error };
  }
};

