import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { getData } from "../../services/request";
import { validateTitle, validateText } from "../../services/validators";

const Complaints = ({setPage, setLastPage, setComplaint}) => {
    const [lits, setLits] = useState([]);
    const [complaints, setComplaints] = useState([])
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
        getComplaints()
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
    
  


    const getComplaints = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var userId = localStorage.getItem('_id');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var userId_val = userId == "" || userId == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized user. Login again!"); 
        if(userId == "") setGenError("Unauthorized user. Login again!"); 
        
        if(at_val && userId_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/complaint/getforuser`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const params = {limit:limit , skip:skip, id: userId};

            const request = await getData(url, headers, params)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    if(request.result.data.result.length == 0){
                        setPageEnd(true)
                        setBottomLoading(false)
                    }else{
                        setComplaints([...request.result.data.result])
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

    const changePage = (complaint) => {
        setComplaint(complaint)
        setPage("Complaint")
        setLastPage("Complaints")
    }


    return(
        <section class="md:mx-12 text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap w-full mb-10 justify-between text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">My complaints</h1>
            <button onClick={() => setPage("NewComplaint")} type="button" class="text-white bg-green-700 hover:bg-green-700/90 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center inline-flex items-center mr-2 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New complaint
            </button>
          </div>
          <div class="flex flex-wrap -m-4">
                <div className=' w-full'>                
<div class="relative overflow-x-auto">
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>                
            {complaints.map((comp, i) =>             
                <div key={i} onClick={() => changePage(comp)} class="p-4 cursor-pointer">
                <div class="border border-gray-200 p-6 rounded-lg">
                    {/*<div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>*/}
                    <h2 class="text-lg text-gray-900 font-medium title-font mb-2 truncate">{comp.title}</h2>
                    <p class="leading-relaxed text-base block line-clamp-2">{comp.description}</p>
                    <div class="flex justify-between mt-4">
                        <p class="">{comp.category}</p>
                        <p>{comp.urgency}</p>
                        <p className='py-1 px-2 bg-gray-500 rounded-2xl text-white'>{comp.trackingStatus}</p>
                    </div>
                </div>
                </div>
            )}
    </div>
</div>

                </div>
            
          </div>
        </div>
        {bottomLoading && <div className='mx-auto py-6'><p>Loading...</p></div>}
      </section>
    )
}

export default Complaints;