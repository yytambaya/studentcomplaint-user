import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { postData } from "../../services/request";
import { Notification } from '../components/Notification';
import { validateDescription, validateName, validateTitle } from '../../services/validators';

const NewComplaint = ({setPage, setLastPage, lastPage}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [urgency, setUrgency] = useState("")
    const [status, setStatus] = useState(false)
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [action, setAction] = useState("Submit complaint")
    const complaintCategories = ["Utility", "Student Conflict", "Health", "Academics", "Leadership"]
    const urgencies = ["low", "medium", "high"]
    const [error, setError] = useState([{field: "title", msg:""}, {field: "description", msg:""}, {field: "category", msg: ""},{field: "urgency", msg:""}, {field: "status", msg:""} ]);
    const [genError, setGenError] = useState("")

    
    const createComplaint = async () => {
        //alert("Title: " + title)
        var accessToken = localStorage.getItem('jwt_token');
        var studentId = localStorage.getItem('_id');
        var hostelId = localStorage.getItem('hostelId');
        var title_val = validateTitle(title).error == "" ? true: false;
        var  description_val = validateDescription(description).error == "" ? true: false;
        var category_val = validateName(category).error == "" ? true: false;
        var urgency_val = validateName(urgency).error == "" ? true: false;
        //var status_val = status == true || status == false ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = studentId == "" || studentId == undefined? false : true; 
        var hi_val = hostelId == "" || hostelId == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized complaint. Login again!"); 
        if(studentId == "") setGenError("Unauthorized complaint, no id. Login again!"); 
        if(hostelId == "")  setGenError("Unauthorized complaint, no title. Login again!"); 
        setError([...error, error.find(item => item.field == "title").msg = validateTitle(title).result])
        setError([...error, error.find(item => item.field == "description").msg = validateDescription(description).result])
        setError([...error, error.find(item => item.field == "category").msg = validateName(category).result])
        setError([...error, error.find(item => item.field == "urgency").msg = validateName(urgency).result])
        //setError([...error, error.find(item => item.field == "status").msg = validateName(status).result])
         
        if(title_val && description_val && category_val && urgency_val && at_val && ui_val && hi_val){
            //alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/complaint/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = status == true ? 1 : 0;
            const data = {title, description, category, urgency, hostelId, studentId};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    setPage('Complaints')

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
            setAction("Submit complaint")
        }  
    }

    return(
        <div>
        {/*<Notification message={"A new complaint is successfully created!"}/>*/}
        <div class="mx-5 md:mx-20 mt-10">
            
            <div class="flex space-x-4 mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl mb-2 text-black">Create complaint</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            <div class="mb-6">
                <label for="title" class="block mb-2 text-xl text-black">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="title" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="The Water System Inside Our Hostel is Faulty" required=""/>
                {error.find(item => item.field == "title").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "title").msg }</p>: null}
            </div>
            <div class="mb-6">
                <label for="description" class="block mb-2 text-xl text-black">Description</label>
                <textarea onChange={(e) => setDescription(e.target.value)} id="title" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="It was yesterday that ..." required=""/>
                {error.find(item => item.field == "description").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "description").msg }</p>: null}
            </div>
            <div class="mb-8">
                <label for="category" class="block mb-2 text-xl text-black">Category</label>
                <select onChange={(e) => setCategory(e.target.value)} type="number" id="title" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" required="">
                    <option>{"Select category"}</option>
                    {complaintCategories.map((cat, i) => 
                        <option key={i} value={cat}>{cat}</option>
                    )}
                </select>
                {error.find(item => item.field == "category").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "category").msg }</p>: null}
            </div>
            <div class="mb-8">
                <label for="urgency" class="block mb-2 text-xl text-black">Urgency</label>
                <select onChange={(e) => setUrgency(e.target.value)} type="number" id="title" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" required="">
                    <option>{"Select urgency"}</option>
                    {urgencies.map((urg, i) => 
                        <option key={i} value={urg}>{urg}</option>
                    )}
                </select>
                {error.find(item => item.field == "urgency").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "urgency").msg }</p>: null}
            </div>
            <button onClick={() => createComplaint()} type="submit" class="flex text-white bg-green-700 px-6 py-2 mb-8">{action}</button>
        </div>
        </div>

    )
}

export default NewComplaint