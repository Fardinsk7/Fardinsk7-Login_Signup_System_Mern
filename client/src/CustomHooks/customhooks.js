import axios from "axios";
import { useEffect, useState } from "react";
import { getuserinfo } from "../helper/helper";

axios.defaults.baseURL = "http://localhost:5000"

//this function will take query to use in url
export default function useFetch(query){
    const [getData,setData] = useState({isLoading:false,apiData:undefined,status:null,serverError:null})

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                setData(prev=>({...prev,isLoading:true}))
                const {username} = !query? await getuserinfo(): ""
                const{data,status} = !query ?await axios.get(`/api/user/${username}`):await axios.get(`/api/${query}`)
                if(status === 201){
                    setData(prev=>({...prev,isLoading:false,apiData:data,status:status}))
                }
                setData(prev=>({...prev,isLoading:false}))
                
            } catch (error) {
                setData(prev =>({...prev,isLoading:false,serverError:error}))
            }
        }
        fetchData();

    },[query])

    
    return [getData,setData]
}