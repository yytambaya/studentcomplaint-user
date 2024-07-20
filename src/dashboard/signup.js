import React, {useState, useEffect} from "react"
import { getAPIBaseURL, getSiteBaseURL } from "../services/helpers";
import { getData, postData } from "../services/request";
import { validateEmail, validateID_get, validateName, validatePassword, validatePhoneNumber } from "../services/validators";

const Signup = () => {
    const [name, setName] = useState("");
    const [regNumber, setRegNumber] = useState("")
    const [roomNumber, setRoomNumber] = useState("")
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [hostelId, setHostelId] = useState("");
    const [password, setPassword] = useState("");
    const [hostels, setHostels] = useState([])
    const [btnState, setBtnState] = useState("Sign up");
    const [error, setError] = useState([{field: "name", msg:""}, {field: "regNumber", msg: ""}, {field: "roomNumber", msg: ""}, {field: "email", msg:""}, {field: "phoneNumber", msg:""}, {field: "hostelId", msg: ""}, {field: "password", msg:""}]);
    const [genError, setGenError] = useState("")

    useEffect(() => {
        getHostels()
    }, [])
    
    const signup = async () => {
        //alert("Email: " + email + " Password: " + password);
        var n_val = validateName(name).error == "" ? true : false;
        var r_val = validateName(regNumber).error == "" ? true: false;
        var e_val = validateEmail(email).error == "" ? true: false;
        var ph_val = validatePhoneNumber(phoneNumber).error == "" ? true: false;
        var h_val = validateID_get(hostelId).error == "" ? true: false;
        var p_val = validatePassword(password).error == "" ? true: false;
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        setError([...error, error.find(item => item.field == "regNumber").msg = validateName(regNumber).result])
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "phoneNumber").msg = validatePhoneNumber(phoneNumber).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        setError([...error, error.find(item => item.field == "hostelId").msg = validateID_get(hostelId).result])
        if(n_val && r_val && e_val && ph_val && h_val && p_val){
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/student/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {name: name, regNumber, roomNumber, email: email, phoneNumber, hostelId, password: password, status: 1};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    window.location.href = `${getSiteBaseURL()}/login`

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

            setBtnState("Sign in")
        } 
    }

    const getHostels = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        //alert(park)
        //var accessToken = localStorage.getItem('jwt_token');
        //var at_val = accessToken == "" || accessToken == undefined? false : true; 
        //if(accessToken == "") setGenError("Unauthorized slot. Login again!"); 
        
        // if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/hostel/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            //const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const headers = {}
            //const params = {limit:limit , skip:skip};

            const request = await getData(url, headers)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    setHostels([...request.result.data.result])
                    //window.location.href = `${getAPIBaseURL()}/app`

                }else{
                    //alert("Eror")
                    //setGenError(request.result.data.result)
                }

            }else{
                //setGenError("Something went wrong")
            }
            
        //}  
    }

    return(
        <section class="bg-white">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-8 lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                AFIT Hostel Management System    
            </a>
            <div class="w-full bg-teal-500 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Register as a student
                    </h1>
                    <div class="space-y-4 md:space-y-6">
                        {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
                        <div>
                            <label for="email" class="block mb-2 text-lg font-medium text-gray-900 ">Your name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="Muhammad Sani" required=""/>
                            {error.find(item => item.field == "name").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "name").msg }</p>: null}
                        </div>
                        <div>
                            <label for="regNumber" class="block mb-2 text-lg font-medium text-gray-900 ">Your Reg number</label>
                            <input value={regNumber} onChange={(e) => setRegNumber(e.target.value)} type="text" name="regNumber" id="email" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="u19cs1004" required=""/>
                            {error.find(item => item.field == "regNumber").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "regNumber").msg }</p>: null}
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-lg font-medium text-gray-900 ">Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="name@company.com" required=""/>
                            {error.find(item => item.field == "email").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "email").msg }</p>: null}
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-lg font-medium text-gray-900 ">Phone number</label>
                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" name="email" id="email" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="08011111111" required=""/>
                            {error.find(item => item.field == "phoneNumber").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "phoneNumber").msg }</p>: null}
                        </div>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-lg text-black">Select Hostel</label>
                            <select onChange={(e) => setHostelId(e.target.value)} type="text" id="name" class="text-lg w-full px-4 py-2" placeholder="Ribadu" required="">
                                <option>Select hostel</option>
                                {hostels?.map((hos, i) =>
                                    <option key={i} value={hos._id}>{hos.name}</option>
                                )}
                            </select>    
                            {error.find(item => item.field == "hostelId").msg ? <p class="text-red-500 text-sm font-semibold mt-1">{error.find(item => item.field == "hostelId").msg }</p>: null}
                        </div>
                        <div>
                            <label for="roomNumber" class="block mb-2 text-lg font-medium text-gray-900 ">Room Number</label>
                            <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} type="text" name="regNumber" id="email" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="A24" required=""/>
                            {error.find(item => item.field == "roomNumber").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "roomNumber").msg }</p>: null}
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-lg font-medium text-gray-900 ">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 text-gray-900 sm:text-sm block w-full p-2.5" required=""/>
                            {error.find(item => item.field == "password").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "password").msg }</p>: null}
                        </div>
                        {/*<div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>*/}
                        <button onClick={() => signup()} type="submit" class="w-full text-black bg-green-200 hover:bg-green-300 focus:ring-4 font-medium text-lg px-5 py-2.5 text-center ">{btnState}</button>
                        <a className=" underline text-blue-800 tex-lg mt-12" href="/login">Login</a>
                        
                        {/*<p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>*/}
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Signup