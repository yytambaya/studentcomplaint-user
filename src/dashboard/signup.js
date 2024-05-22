import React, {useState, useEffect} from "react"
import { getAPIBaseURL, getSiteBaseURL } from "../services/helpers";
import { postData } from "../services/request";
import { validateEmail, validateName, validatePassword } from "../services/validators";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [btnState, setBtnState] = useState("Sign up");
    const [error, setError] = useState([{field: "name", msg:""}, {field: "email", msg:""}, {field: "password", msg:""}]);
    const [genError, setGenError] = useState("")
    
    const signup = async () => {
        //alert("Email: " + email + " Password: " + password);
        var n_val = validateName(name).error == "" ? true : false;
        var e_val = validateEmail(email).error == "" ? true: false;
        var p_val = validatePassword(password).error == "" ? true: false;
        setError([...error, error.find(item => item.field == "name").msg = validateName(name).result])
        setError([...error, error.find(item => item.field == "email").msg = validateEmail(email).result])
        setError([...error, error.find(item => item.field == "password").msg = validatePassword(password).result])
        
        if(n_val && e_val && p_val){
            setBtnState("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/signup`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!'
            const headers = {'x-access-key': api_key}
            const data = {name: name, email: email, password: password};

            const request = await postData(url, headers, data)
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert("Success")
                    //alert(JSON.stringify(request.result.data.result.result))
                    //localStorage.setItem('_id', request.result.data.result.result._id);
                    //localStorage.setItem('jwt_token', request.result.data.result.token);
                    //localStorage.setItem('email', request.result.data.result.result.email);
                    //localStorage.setItem('name', request.result.data.result.result.name);
                    
                    window.location.href = `${getSiteBaseURL()}/login`

                }else{
                    setGenError(request.result.data.result)
                    //alert("Error")
                }

            }else{
                setGenError("Something went wrong")
            }
            setBtnState("Sign in")
        }  
    }

    return(
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Carpark    
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Admin signup
                    </h1>
                    <div class="space-y-4 md:space-y-6">
                        {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Muhammad Sani" required=""/>
                            {error.find(item => item.field == "name").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "name").msg }</p>: null}
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            {error.find(item => item.field == "email").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "email").msg }</p>: null}
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
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
                        <button onClick={() => signup()} type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{btnState}</button>
                        <a className=" underline text-blue-800" href="/login">Login</a>
                        
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