import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { postData } from "../../services/request";
import { validateTitle, validateText, validateEmail, validatePassword, validateNumber, validateName, validatePhoneNumber } from "../../services/validators";
import { Notification } from '../components/Notification';

const EditPark = ({setPage, setLastPage, lastPage, park}) => {
    const [name, setName] = useState(park.name)
    const [status, setStatus] = useState(park.status)
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [action, setAction] = useState("save")
    const [error, setError] = useState([{field: "name", msg:""}, {field: "email", msg:""}, {field: "phoneNumber", msg: ""}, {field: "status", msg:""} ]);
    const [genError, setGenError] = useState("")

    
    const editPark = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var park_id = localStorage.getItem('_id');
        var park_name = localStorage.getItem('name');
        var name_val = validateName(name).error == "" ? true: false;
        //var password_val = validatePassword(password).error == "" ? true: false;
        var status_val = status == true || status == false ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = park_id == "" || park_id == undefined? false : true; 
        var un_val = park_name == "" || park_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized park. Login again!"); 
        if(park_id == "") setGenError("Unauthorized park, no id. Login again!"); 
        if(park_name == "")  setGenError("Unauthorized park, no name. Login again!"); 
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        //setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
         
        if(name_val && status_val && at_val && ui_val && un_val){
            //alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/park/edit`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = status == true ? 1 : 0;
            const data = {name, status: statusCode, id: park._id};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    setPage('Park')

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

    return(
        <div>
        {/*<Notification message={"A new park is successfully created!"}/>*/}
        <div class="mx-5 md:mx-20 mt-10">
            
            <div class="flex space-x-4 mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl mb-2 text-black">Edit park</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="John Doe" required=""/>
                {error.find(item => item.field == "name").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "name").msg }</p>: null}
            </div>
            <div class="flex items-center space-x-4">
                <label for="status" class="block mb-2 text-xl text-black">Status</label>
                <input onChange={(e) => setStatus(!status)} value={status} checked={status} type="checkbox" id="name" class="text-lg outline-none focus:border-gray-400 border-2 w-4 h-4" placeholder="09011111111" required=""/>
            </div>
            <div className='flex flex-col space-y-4 mb-6'>
                <p className=''>{status ? "active" : "inactive"}</p>
            </div>
            
            <button onClick={() => editPark()} type="submit" class="flex text-white bg-blue-700 px-6 py-2 mb-8">{action}</button>
        </div>
        </div>

    )
}

export default EditPark