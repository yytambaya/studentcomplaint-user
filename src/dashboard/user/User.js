import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { postData } from "../../services/request";
import { validateTitle, validateText, validateEmail, validatePassword, validateNumber, validateName, validatePhoneNumber } from "../../services/validators";
import { Notification } from '../components/Notification';

const User = ({setPage, setLastPage, lastPage, user}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(false)
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [action, setAction] = useState("Edit")
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [error, setError] = useState([{field: "name", msg:""}, {field: "email", msg:""}, {field: "phoneNumber", msg: ""},{field: "password", msg:""}, {field: "status", msg:""} ]);
    const [genError, setGenError] = useState("")
    
    
    const createUser = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var user_id = localStorage.getItem('_id');
        var user_name = localStorage.getItem('name');
        var name_val = validateName(name).error == "" ? true: false;
        var  email_val = validateEmail(email).error == "" ? true: false;
        var phoneNumber_val = validatePhoneNumber(phoneNumber).error == "" ? true: false;
        var password_val = validatePassword(password).error == "" ? true: false;
        var status_val = status == true || status == false ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = user_id == "" || user_id == undefined? false : true; 
        var un_val = user_name == "" || user_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized user. Login again!"); 
        if(user_id == "") setGenError("Unauthorized user, no id. Login again!"); 
        if(user_name == "")  setGenError("Unauthorized user, no name. Login again!"); 
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "phoneNumber").msg = validatePhoneNumber(phoneNumber).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        setError([...error, error.find(item => item.field == "status").msg = validateTitle(status).result])
         
        if(name_val && email_val && phoneNumber_val && password_val  && status_val && at_val && ui_val && un_val){
            alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/user/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = status == true ? 1 : 0;
            const data = {name, email, phoneNumber, password, status: statusCode};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    //setPage('Users')

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                setGenError("check your form for errors")
                
            }
                
            else{
                setGenError("something went wrong")
            }
            setAction("save")
        }  
    }

    const deleteUser = async (user_id) => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == ""? false : true; 
        if(accessToken == "") setGenError("Unauthorized user. Login again!"); 
        
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/user/remove`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const data = {id: user_id};

            const request = await postData(url, headers, data)
            if(request.error == ""){
                if(request.result.data.error == ""){
                        //alert(JSON.stringify(request.result.data.result))
                    //window.location.href = `${getAPIBaseURL()}/app`
                    setPage("Users")

                }else{
                    setGenError(JSON.stringify(request.result.data.result))
                }

            }else{
                setGenError("Something went wrong")
            }
            setAction("save")
        }  
    }

    const goToEditPage = () => {
        setPage('EditUser')
    }

    return(
        <div>
        {/*<Notification message={"A new user is successfully created!"}/>*/}
            {showDeleteButton && <div class=" backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className=" shadow-2xl flex flex-col fixed top-40 bg-white space-y-4 px-4 py-2 text-xl">
                    <h1 className="text-2xl font-mono">Delete user</h1>
                    <p className=' '>Are you sure you want to delete this user?</p>
                    <div className="flex justify-between">
                        <button onClick={() => deleteUser(user._id)} type="submit" class="flex text-white bg-red-700 px-6 py-2 mb-8">{"Delete"}</button>
                        <button onClick={() => setShowDeleteButton(false)} type="" class="flex text-white bg-gray-300 px-6 py-2 mb-8">{"Cancel"}</button>
                    </div>
                </div>
            </div>}

        <div class="mx-5 md:mx-20 mt-10">
            
            <div class="flex space-x-4 mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl mb-2 text-black">User details</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Name</label>
                <p className=' text-slate-500'>{user.name}</p>
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Email Address</label>
                <p className=' text-slate-500'>{user.email}</p>
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Phone Number</label>
                <p className=' text-slate-500'>{user.phoneNumber}</p>
            </div>
            <div class="mb-6">
                <label for="name" class="block mb-2 text-xl text-black">Status</label>
                <p className=' text-slate-500'>{user.status ? "active" : "inactive"}</p>
            </div>
            <div className='flex flex-row space-x-8'>
                <button onClick={() => goToEditPage()} type="submit" class="flex text-white bg-blue-700 px-6 py-2 mb-8">{action}</button>
                <button onClick={() => setShowDeleteButton(true)} class="flex text-white bg-red-700 px-6 py-2 mb-8">{"Delete"}</button>
            </div>
        </div>
        </div>

    )
}

export default User