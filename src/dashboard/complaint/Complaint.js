import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { getData, postData } from "../../services/request";
import { validateTitle, validateText, validateEmail, validatePassword, validateNumber, validateName, validatePhoneNumber } from "../../services/validators";
import { Notification } from '../components/Notification';

const Complaint = ({setPage, setLastPage, lastPage, complaint}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(false)
    const [hostelName, setHostelName] = useState("")
    const [roomNumber, setRoomNumber] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [action, setAction] = useState("Edit")
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [error, setError] = useState([{field: "name", msg:""}, {field: "email", msg:""}, {field: "phoneNumber", msg: ""},{field: "password", msg:""}, {field: "status", msg:""} ]);
    const [genError, setGenError] = useState("")
    
    useEffect(() => {
        getHostelName(complaint.hostelId)
        setRoomNumber(localStorage?.getItem("roomNumber"))
    }, [])
    
    const createComplaint = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var complaint_id = localStorage.getItem('_id');
        var complaint_name = localStorage.getItem('name');
        var name_val = validateName(name).error == "" ? true: false;
        var  email_val = validateEmail(email).error == "" ? true: false;
        var phoneNumber_val = validatePhoneNumber(phoneNumber).error == "" ? true: false;
        var password_val = validatePassword(password).error == "" ? true: false;
        var status_val = status == true || status == false ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = complaint_id == "" || complaint_id == undefined? false : true; 
        var un_val = complaint_name == "" || complaint_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized complaint. Login again!"); 
        if(complaint_id == "") setGenError("Unauthorized complaint, no id. Login again!"); 
        if(complaint_name == "")  setGenError("Unauthorized complaint, no name. Login again!"); 
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "phoneNumber").msg = validatePhoneNumber(phoneNumber).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        setError([...error, error.find(item => item.field == "status").msg = validateTitle(status).result])
         
        if(name_val && email_val && phoneNumber_val && password_val  && status_val && at_val && ui_val && un_val){
            //alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/complaint/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = status == true ? 1 : 0;
            const data = {name, email, phoneNumber, password, status: statusCode};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    //setPage('Complaints')

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

    const deleteComplaint = async (complaint_id) => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == ""? false : true; 
        if(accessToken == "") setGenError("Unauthorized complaint. Login again!"); 
        
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/complaint/remove`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const data = {id: complaint_id};

            const request = await postData(url, headers, data)
            if(request.error == ""){
                if(request.result.data.error == ""){
                        //alert(JSON.stringify(request.result.data.result))
                    //window.location.href = `${getAPIBaseURL()}/app`
                    setPage("Complaints")

                }else{
                    setGenError(JSON.stringify(request.result.data.result))
                }

            }else{
                setGenError("Something went wrong")
            }
            setAction("save")
        }  
    }

    const getHostelName = async (id) => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        //alert(park)
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized slot. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/hostel/get`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const params = {id};

            const request = await getData(url, headers, params)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    //setHostels([...hostels, ...request.result.data.result])
                    //window.location.href = `${getAPIBaseURL()}/app`
                    //alert(request.result.data.result.name)
                    setHostelName(request.result.data.result.name)

                }else{
                    //alert("Eror")
                    //setGenError(request.result.data.result)
                }

            }else{
                //setGenError("Something went wrong")
            }
            
        }  
    }

    const goToEditPage = () => {
        setPage('EditComplaint')
    }

    return(
        <div>
        {/*<Notification message={"A new complaint is successfully created!"}/>*/}
            {showDeleteButton && <div class=" backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className=" shadow-2xl flex flex-col fixed top-40 bg-white space-y-4 px-4 py-2 text-xl">
                    <h1 className="text-2xl font-mono">Delete complaint</h1>
                    <p className=' '>Are you sure you want to delete this complaint?</p>
                    <div className="flex justify-between">
                        <button onClick={() => deleteComplaint(complaint._id)} type="submit" class="flex text-white bg-red-700 px-6 py-2 mb-8">{"Delete"}</button>
                        <button onClick={() => setShowDeleteButton(false)} type="" class="flex text-white bg-gray-300 px-6 py-2 mb-8">{"Cancel"}</button>
                    </div>
                </div>
            </div>}

        <div class="mx-5 md:mx-20 mt-10">
            
            <div class="flex space-x-4 mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl mb-2 text-black">Complaint Details</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            
            <div className='w-full flex flex-col justify-between align-middle py-2 px-3'>
                <div>
                    <p className=' text-xl'>{roomNumber + ", " + hostelName}</p>
                </div>
            <div>
                <div className='flex justify-between space-y-4 flex-wrap mb-12'>
                    <div className='flex flex-wrap items-center space-x-8'>
                        <div className=''>
                            <p className='text-3xl'>{complaint.title}</p>
                        </div>
                        <div className='mt-2 py-2 px-4 bg-teal-500 h-8 text-white text-center flex items-center'>{complaint.category}</div>
                    </div>
                    <div className='flex flex-wrap space-x-2'>
                        <div className='text-xl font-medium'>Urgency: </div>
                        <div className='py-2 px-4 bg-green-700 h-8 text-white flex items-center'>{complaint.urgency}</div>
                    </div>
                </div>
                <div>
                 {complaint.description}
                </div> 
                {complaint?.reply && <div className='mt-4 ml-16'>
                    <p className='text-lg font-semibold'>Reply</p>
                    {complaint?.reply}
                </div>}
            <div className='flex space-x-4 mt-8'>
                <p className=' font-medium'>Complain status: </p>
                <p className=' font-bold'>{complaint.trackingStatus}</p>
            </div>
            {/*<div className='flex flex-row space-x-8 mt-16'>
                <button onClick={() => goToEditPage()} type="submit" class="flex text-white bg-blue-700 px-6 py-2 mb-8">{action}</button>
                <button onClick={() => setShowDeleteButton(true)} class="flex text-white bg-red-700 px-6 py-2 mb-8">{"Delete"}</button>
            </div>*/}

            </div>
          </div>
            



            
        </div>
        </div>

    )
}

export default Complaint