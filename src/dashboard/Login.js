import React, {useState, useEffect} from "react"
import { getAPIBaseURL, getSiteBaseURL } from "../services/helpers";
import { postData } from "../services/request";
import { validatePassword, validateName } from "../services/validators";

const Login = () => {
    const [regNumber, setRegNumber] = useState("");
    const [password, setPassword] = useState("");
    const [btnState, setBtnState] = useState("Sign in");
    const [error, setError] = useState([{field: "regNumber", msg:""}, {field: "password", msg:""}]);
    const [genError, setGenError] = useState("")
    
    const login = async () => {
        //alert("regNumber: " + regNumber + " Password: " + password);
        var r_val = validateName(regNumber).error == "" ? true: false;
        var p_val = validatePassword(password).error == "" ? true: false;
        setError([...error, error.find(item => item.field == "regNumber").msg = validateName(regNumber).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        
        if(r_val && p_val){
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/student/login`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {regNumber: regNumber, password: password};

            const request = await postData(url, headers, data)
            //alert(JSON.stringify(request))
            
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    //alert("No error")
                    localStorage.setItem('_id', request.result.data.result.result._id);
                    localStorage.setItem('jwt_token', request.result.data.result.token);
                    localStorage.setItem('email', request.result.data.result.result.email);
                    localStorage.setItem('phoneNumber', request.result.data.result.result.phoneNumber);
                    localStorage.setItem('regNumber', request.result.data.result.result.regNumber);
                    localStorage.setItem('name', request.result.data.result.result.name);
                    localStorage.setItem('hostelId', request.result.data.result.result.hostelId);
                    localStorage.setItem('roomNumber', request.result.data.result.result.roomNumber);

                    window.location.href = `${getSiteBaseURL()}/complaints`
                    


                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                 //alert(JSON.stringify(request.result.data))
                 if(request.result.data?.status == 409){
                    setGenError(request.result.data?.result)
                }else if(request.result.data?.status == 404){
                    setGenError(request.result.data?.result)
                } else{
                    setGenError("check your form for errors 2")
                }
                
            }
                
            else{
                setGenError("something went wrong")
            }

            /*if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert("Success")
                    //alert(JSON.stringify(request.result.data.result.result))
                    localStorage.setItem('_id', request.result.data.result.result._id);
                    localStorage.setItem('jwt_token', request.result.data.result.token);
                    localStorage.setItem('regNumber', request.result.data.result.result.regNumber);
                    localStorage.setItem('name', request.result.data.result.result.name);
                    window.location.href = `${getSiteBaseURL()}/users`

                }else{
                    setGenError(request.result.data.result)
                    //alert("Error")
                }

            }else{
                setGenError("Something went wrong")
            }*/
            
        }
        setBtnState("Sign in")
    }

    return(
        <section class="bg-white">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                AFIT Hostel Complaint Management System 
            </a>
            <div class="w-full bg-teal-500 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Login
                    </h1>
                    <div class="space-y-4 md:space-y-6">
                        {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
                        <div>
                            <label for="regNumber" class="block mb-2 text-lg font-medium text-gray-900 ">Reg number</label>
                            <input value={regNumber} onChange={(e) => setRegNumber(e.target.value)} type="regNumber" name="regNumber" id="regNumber" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm block w-full p-2.5" placeholder="u17cs1005" required=""/>
                            {error.find(item => item.field == "regNumber").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "regNumber").msg }</p>: null}
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-lg font-medium text-gray-900">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm block w-full p-2.5 " required=""/>
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
                        
                        <button onClick={() => login()} type="submit" class="w-full text-black bg-green-200 hover:bg-green-300 font-medium text-lg px-5 py-2.5 text-center">{btnState}</button>
                        <a className=" underline text-blue-800 text-lg mt-12" href="/signup">Signup</a>
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

export default Login