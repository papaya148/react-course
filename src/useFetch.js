import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(endpoint, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data.");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
            return;
          }
          setError(err.message);
          setIsLoading(false);
        });

      return () => {
        console.log("clean");
      };
    }, 1000);

    return () => abortCont.abort("timeout");
  }, [endpoint]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
