import axios from "axios";
import { useState } from "react";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState([]);

  const doRequest = async (props = {}) => {
    try {
      setErrors([]);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      // Check if error.response exists before accessing its properties
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        // Handle the case when the error does not have a response (network error, etc.)
        setErrors([{ message: "An unexpected error occurred." }]);
      }
    }
  };

  return { doRequest, errors };
}
