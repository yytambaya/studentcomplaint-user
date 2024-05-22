import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { getData, postData } from "../../services/request";
import { validateTitle, validateText, validateEmail, validatePassword, validateNumber, validateName, validatePhoneNumber } from "../../services/validators";
import { Notification } from '../components/Notification';

const NewSlot = ({setPage, setLastPage, lastPage}) => {
    const [name, setName] = useState("")
    const [park, setPark] = useState("")
    const [status, setStatus] = useState(false)
    const [action, setAction] = useState("Add slot")
    const [error, setError] = useState([{field: "name", msg:""}, {field: "park", msg:""},  {field: "status", msg:""} ]);
    const [genError, setGenError] = useState("")
    const [slots, setSlots] = useState([])

    useEffect(() => {
        getSlots()
    }, [])
    
    const createSlot = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var slot_id = localStorage.getItem('_id');
        var slot_name = localStorage.getItem('name');
        var name_val = validateName(name).error == "" ? true: false;
        var park_val = validateName(name).error == "" ? true: false;
        var status_val = status == true || status == false ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = slot_id == "" || slot_id == undefined? false : true; 
        var un_val = slot_name == "" || slot_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized slot. Login again!"); 
        if(slot_id == "") setGenError("Unauthorized slot, no id. Login again!"); 
        if(slot_name == "")  setGenError("Unauthorized slot, no name. Login again!"); 
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
         
        if(name_val && park_val && status_val && at_val && ui_val && un_val){
            //alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/slot/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = status == true ? 1 : 0;
            const data = {name, parkId: park};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    setPage('Slots')

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                
                 //alert(JSON.stringify(request.result.data))
                 if(request.result.data?.status == 409){
                    setGenError(request.result.data?.result)
                }else{
                    setGenError("check your form for errors")
                }
            }
                
            else{
                setGenError("something went wrong")
            }
            setAction("save")
        }  
    }


    const getSlots = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        //alert(park)
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized slot. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/park/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            //const params = {limit:limit , skip:skip};

            const request = await getData(url, headers)
            alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    setSlots([...slots, ...request.result.data.result])
                    //window.location.href = `${getAPIBaseURL()}/app`

                }else{
                    //alert("Eror")
                    setGenError(request.result.data.result)
                }

            }else{
                setGenError("Something went wrong")
            }
            
        }  
    }



    return(
        <div>
        {/*<Notification message={"A new slot is successfully created!"}/>*/}
        <div class="mx-5 md:mx-20 mt-10">
            
            <div class="flex space-x-4 mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl mb-2 text-black">Create slot</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Name</label>
                <input onChange={(e) => setName(e.target.value)} type="text" id="name" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="Slot A" required=""/>
                {error.find(item => item.field == "name").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "name").msg }</p>: null}
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Select park</label>
                <select onChange={(e) => setPark(e.target.value)} type="text" id="name" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="Slot A" required="">
                    <option>Select park</option>
                    {slots.map((slot, i) =>
                        <option value={slot._id}>{slot.name}</option>
                    )}
                </select>    
                {error.find(item => item.field == "name").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "name").msg }</p>: null}
            </div>
            {/*<div class="flex items-center space-x-4">
                <label for="status" class="block mb-2 text-xl text-black">Status</label>
                <input onChange={(e) => setStatus(!status)} type="checkbox" id="name" class="text-lg outline-none focus:border-gray-400 border-2 w-4 h-4" placeholder="09011111111" required=""/>
            </div>
            <div className='flex flex-col space-y-4 mb-6'>
                <p className=''>{status ? "active" : "inactive"}</p>
            </div>*/}
            
            <button onClick={() => createSlot()} type="submit" class="flex text-white bg-blue-700 px-6 py-2 mb-8">{action}</button>
        </div>
        </div>

    )
}

export default NewSlot