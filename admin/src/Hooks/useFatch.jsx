import { useEffect, useState } from "react"
import Axios from "../Axios/Axios";
const useFatch=(url)=>{
    const [data,setdata]=useState([])
    const [loading, setloading]= useState(false)
    const [error,seterror]=useState(false)
    useEffect(()=>{
        const fetchdata=async()=>{
            setloading(true)
            try {
                const res=await Axios.get(url);
           setdata(res.data);
            } catch (error) {
                seterror(error)
            }
            setloading(false)
        }
        fetchdata();
    }, [url]);
    const reFetch=async()=>{
        setloading(true)
        try {
            const res=await Axios.get(url);
       setdata(res.data);
        } catch (error) {
            seterror(error)
        }
        setloading(false)
    }
    return {data, loading, error, reFetch}
}
 export default useFatch