import axios from "axios";

export const getData = async (url, headers, params) => {
    try{
            
        const res = await axios.get(url, {params:params, headers: headers});
        return await {error: "", result: res};
            
      }catch(error){
        //alert("Error here: " + error)
        return {error: "error", result: error}
      }
}

export const postData = async (url, headers, data) => {
    try{
          const res = await axios.post(url, data, {headers: headers});
          return {error: "", result: res};
            
      }catch(error){
        return {error: "error", result: error}
      }
}