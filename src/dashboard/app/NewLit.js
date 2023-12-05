import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { postData } from "../../services/request";
import { validateTitle, validateText } from "../../services/validators";

const NewLit = ({setPage, setLastPage, lastPage}) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [action, setAction] = useState("save")
    const [error, setError] = useState([{field: "title", msg:""}, {field: "text", msg:""}]);
    const [genError, setGenError] = useState("")

    
    const setLit = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var user_id = localStorage.getItem('_id');
        var user_name = localStorage.getItem('name');
        var tit_val = validateTitle(title).error == "" ? true: false;
        var tex_val = validateText(text).error == "" ? true: false;
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = user_id == "" || user_id == undefined? false : true; 
        var un_val = user_name == "" || user_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized user. Login again!"); 
        if(user_id == "") setGenError("Unauthorized user, no id. Login again!"); 
        if(user_name == "")  setGenError("Unauthorized user, no name. Login again!"); 
        setError([...error, error.find(item => item.field == "title").msg = validateTitle(title).result])
        setError([...error, error.find(item => item.field == "text").msg = validateText(text).result])
         
        if(tit_val && tex_val && at_val && ui_val && un_val){
            //alert("going")
            setAction("Loading...")
            const url = `${getAPIBaseURL()}/v1/admin/lit/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const data = {author_id: user_id, author: user_name, category: "Crypto", title: title, text: text, status: publish};

            const request = await postData(url, headers, data)
            if(request.error == ""){
                if(request.result.data.error == ""){
                    
                    setPage('Lits')

                }else{
                    setGenError(request.result.data.result)
                }

            }else{
                setGenError("Something went wrong")
            }
            setAction("save")
        }  
    }

    return(
        
        <div class="mx-5 md:mx-20 mt-10">
            <div class="flex mb-10">
            <div>
            <button onClick={() => {setPage(lastPage); setLastPage("Lits")}} type="button" class="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
                <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">New Lit</h1>
            </div>
            <div class="my-5">
                {genError != "" ? <div class="text-red-500 text-sm font-semibold">{genError}</div> : ""}
            </div>
            <div class="mb-6">
                <label for="titile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} type="titile" id="titile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What is bitcoin?" required=""/>
                {error.find(item => item.field == "title").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "title").msg }</p>: null}
            </div>
            <div class="mb-6">
                <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Text</label>
                <textarea onChange={(e) => setText(e.target.value)} id="text" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment...">
                </textarea>
                {error.find(item => item.field == "text").msg ? <p class="text-red-500 text-sm font-semibold">{error.find(item => item.field == "text").msg }</p>: null}                   
            </div>
            <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                <input onChange={(e) => {e.target.checked? setPublish("1") : setPublish("0")}} id="remember" type="checkbox" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required=""/>
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</label>
            </div>
            <button onClick={() => setLit()} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{action}</button>
        </div>

    )
}

export default NewLit