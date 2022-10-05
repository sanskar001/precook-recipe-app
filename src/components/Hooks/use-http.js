import { useCallback, useState } from "react";

/**
 * Custom hook for sending https request for given url and perform action against data.
 * @return isLoading state, sendRequest function.
 */

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Function for sending http-request as per url and do action on data
   * @param {string} url - url to send request.
   * @param {function} applyData - function to perform action on response data
   */

  const sendRequest = useCallback(async (url, applyData) => {
    // Start loading
    setIsLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      // Call applyData() function
      applyData(data);
    } catch (err) {
      console.error(err.message || "Something went wrong!");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
