import { useEffect, useState } from "react";

const useFetch = (url: string) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if (!res.ok){
                throw new Error('The data could not be fetched!');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(err => {

        })
    }, [url]);

    return { data }
}

export default useFetch;