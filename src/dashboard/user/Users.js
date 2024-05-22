import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { getData } from "../../services/request";
import { validateTitle, validateText } from "../../services/validators";

const Users = ({setPage, setLastPage, setUser}) => {
    const [lits, setLits] = useState([]);
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [limit, setLimit] = useState("10")
    const [skip, setSkip] = useState("0")
    const [bottomLoading, setBottomLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);
    const [error, setError] = useState([{field: "title", msg:""}, {field: "text", msg:""}]);
    const [genError, setGenError] = useState("")

    useEffect( () => {
        getUsers()
    }, [skip])

    window.onscroll = (e) => handleScroll(e);

    const handleScroll = (e) => {
      
      if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
        //alert("Reached end")
        
        setSkip(lits?.length)
        //console.log("At the bottom")
        //fetchMoreData(); 
        //alert("Fetch next 10")
      }
    }
    
  


    const getUsers = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized user. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/user/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const params = {limit:limit , skip:skip};

            const request = await getData(url, headers, params)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    if(request.result.data.result.length == 0){
                        setPageEnd(true)
                        setBottomLoading(false)
                    }else{
                        setUsers([...lits, ...request.result.data.result])
                    }
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

    const changePage = (user) => {
        setUser(user)
        setPage("User")
        setLastPage("Users")
    }


    return(
        <section class="md:mx-12 text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap w-full mb-10 justify-between text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Users</h1>
            <button onClick={() => setPage("NewUser")} type="button" class="text-white bg-blue-500 hover:bg-blue-500/90 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center inline-flex items-center mr-2 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New user
            </button>
          </div>
          <div class="flex flex-wrap -m-4">
                <div className=' w-full'>
                    {/*<table className='w-full'>
                        <thead className=' text-xl'>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Status</td>
                        </thead>
                        <tbody className=' text-lg'>
                            {users.map((user, i) => 
                            <tr key={i} onClick={() => changePage(user)} className='cursor-pointer'>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.status == 1 ? "active" : "inactive"}</td>
                            </tr>
                            )}
                        </tbody>
                        </table>*/}
                        

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, i) =>             
            <tr key={i} onClick={() => changePage(user)} class="bg-white border-b cursor-pointer">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {user.name}
                </th>
                <td class="px-6 py-4">
                       {user.email} 
                </td>
                <td class="px-6 py-4">
                    {user.phoneNumber}
                </td>
                <td class="px-6 py-4">
                    {user.status ? "active" : "inactive"}
                </td>
            </tr>
                )}
        </tbody>
    </table>
</div>

                </div>
            
          </div>
        </div>
        {bottomLoading && <div className='mx-auto py-6'><p>Loading...</p></div>}
      </section>
    )
}

export default Users;