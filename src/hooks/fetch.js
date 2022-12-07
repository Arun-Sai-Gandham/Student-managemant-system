import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data,SetData] = useState([]); 
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
          const data = await (await fetch(url)).json();
          SetData(data);
        };
        
        dataFetch();
      }, []);
    
    return data;
}
 
export default useFetch;