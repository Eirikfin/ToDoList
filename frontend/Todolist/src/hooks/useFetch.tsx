import { useEffect, useState } from "react";


export function useFetch(url: string) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(setData)
        .finally(() => setLoading(false));
    }, [url]);

    return {data, loading};
}