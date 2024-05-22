import {useState, useEffect} from 'react'
import { getAPIBaseURL } from "../../services/helpers";
import { getData, postData } from "../../services/request";
import { validateTitle, validateText } from "../../services/validators";

const Reservations = ({setPage, setLastPage, setReservation}) => {
    const [lits, setLits] = useState([]);
    const [reservations, setReservations] = useState([])
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState("")
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [publish, setPublish] = useState("0")
    const [author, setAuthor] = useState("")
    const [limit, setLimit] = useState("10")
    const [skip, setSkip] = useState("0")
    const [isReserved, setIsReserved] = useState(false)
    const [showReservePopup, setShowReservePopup] = useState(false)
    const [revokingPopup, setRevokingPopup] = useState(false)
    const [spot, setSpot] = useState(null)
    const [actionButton, setActionButton] = useState("Reserve")
    const [bottomLoading, setBottomLoading] = useState(false);
    const [pageEnd, setPageEnd] = useState(false);
    const [genError, setGenError] = useState("")

    useEffect( () => {
        getReservations()
    }, [skip])

    useEffect(() => {
        if(showReservePopup){
            if(users.length == 0){
                getUsers()
            }
        }
    }, [showReservePopup])

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
    
  


    const getReservations = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized reservation. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/slot/getall`;
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
                        setReservations([...lits, ...request.result.data.result])
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

    const getUsers = async () => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        //alert(park)
        var accessToken = localStorage.getItem('jwt_token');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized reservation. Login again!"); 
        
        if(at_val){
            //alert("going")
            const url = `${getAPIBaseURL()}/v1/admin/user/getall`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            //const params = {limit:limit , skip:skip};

            const request = await getData(url, headers)
            //alert(JSON.stringify(request))
            if(request.error == ""){
                if(request.result.data.error == ""){
                    //alert(JSON.stringify(request.result.data.result))
                    setUsers([...users, ...request.result.data.result])
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

    const reserveSpot = async (spot) => {
        //alert("Title: " + title + " Text: " + text + " Checked: " + publish);
        var accessToken = localStorage.getItem('jwt_token');
        var reservation_id = localStorage.getItem('_id');
        var reservation_name = localStorage.getItem('name');
        var at_val = accessToken == "" || accessToken == undefined? false : true; 
        var ui_val = reservation_id == "" || reservation_id == undefined? false : true; 
        var un_val = reservation_name == "" || reservation_name == undefined? false : true; 
        if(accessToken == "") setGenError("Unauthorized reservation. Login again!"); 
        if(reservation_id == "") setGenError("Unauthorized reservation, no id. Login again!"); 
        if(reservation_name == "")  setGenError("Unauthorized reservation, no name. Login again!"); 
        
        if(at_val && ui_val && un_val && userId){
            //alert("going")
            setActionButton("Loading...")
            const url = `${getAPIBaseURL()}/v1/reservation/new`;
            const api_key = '@!8(T#7<R:I#:F1#r!>BW/!';
            const headers = {'x-access-key': api_key, 'x-access-token': accessToken}
            const statusCode = 1
            //alert(JSON.stringify(spot))
            //alert(userId)
            const data = {slotId: spot._id, parkId: spot.parkId, userId: userId, status: 1};

            const request = await postData(url, headers, data)
            setActionButton("Reserve")
            //alert(JSON.stringify(request))
            
            if(request.error == "" && request.result.data?.error != "error"){
                if(request.result.data?.error == ""){
                    
                    //setPage('Reservations')
                    window.location.href = "/reservations"
                    setShowReservePopup(false)

                }else{
                    setGenError(request.result.data?.result)
                }

            }else if(request.result.data?.error == "error"){
                if(request.result.data?.status == 404){
                    setGenError("spot not found")
                }else if(request.result.data?.status == 500){
                    setGenError("server error")
                }else{
                    setGenError("check your form for errors")
                }
            }
                
            else{
                setGenError("something went wrong")
            }
            //setActionButton("reserve")
        }else{
            setGenError("some values are empty")
        }  
    }

    const onReserve = (spot) => {
        setSpot(spot)
        setShowReservePopup(true)
    }

    const changePage = (reservation) => {
        setReservation(reservation)
        setPage("Reservation")
        setLastPage("Reservations")
    }


    return(
        <section class="md:mx-12 text-gray-600 body-font">
            {showReservePopup && <div class=" backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className=" shadow-2xl flex flex-col fixed top-40 bg-white space-y-4 px-16 py-8 text-xl">
                    <h1 className="text-2xl font-mono">Reserve {spot?.name}</h1>
                    <p className=''>Let this user park at this space</p>
                    {genError && <p className='mt-2 text-red-500'>{genError}</p>}
                    <div className=' pt-4'>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-xl text-black">Select park</label>
                            <select onChange={(e) => setUserId(e.target.value)} type="text" id="name" class="text-lg outline-none focus:border-gray-400 border-2  w-full px-4 py-2" placeholder="Reservation A" required="">
                                <option>Select user</option>
                                {users.map((user, i) =>
                                    <option key={i} value={user._id}>{user.email}</option>
                                )}
                            </select>    
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => reserveSpot(spot)} type="submit" class="flex text-white bg-green-700 px-6 py-2 mb-8">{actionButton}</button>
                        <button onClick={() => setShowReservePopup(false)} type="" class="flex text-white bg-gray-400 px-6 py-2 mb-8">{"Cancel"}</button>
                    </div>
                </div>
            </div>}

            {revokingPopup && <div class=" backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
                <div className=" shadow-2xl flex flex-col fixed top-40 bg-white space-y-4 px-16 py-8 text-xl">
                    <h1 className="text-2xl font-mono">Revoke {spot?.name}</h1>
                    <p className=''>Are you sure you want to revoke this spot?</p>
                    {genError && <p className='mt-2 text-red-500'>{genError}</p>}
                    
                    <div className="flex justify-between">
                        <button onClick={() => null} type="submit" class="flex text-white bg-red-700 px-6 py-2 mb-8">{'revoke'}</button>
                        <button onClick={() => setRevokingPopup(false)} type="" class="flex text-white bg-gray-400 px-6 py-2 mb-8">{"Cancel"}</button>
                    </div>
                </div>
            </div>}
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap w-full mb-10 justify-between text-center">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Reservations</h1>
            {/*<button onClick={() => setPage("NewReservation")} type="button" class="text-white bg-blue-500 hover:bg-blue-500/90 focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center inline-flex items-center mr-2 mb-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New reservation
            </button>*/}
          </div>
          <div class="grid grid-cols-6 gap-8">
                {reservations.map((reservation, i) => 
                    <div onClick={() => onReserve(reservation)} key={i} className={`flex flex-col items-center cursor-pointer w-36 h-28 p-4 ${reservation.status ? 'bg-gray-300 pointer-events-none' : 'bg-green-800'}`}>
                        <p className='text-4xl text-white font-medium'>{reservation.name}</p>
                        {reservation?.status &&
                            <div className='flex space-x-4 mt-8'>
                                <button className='pointer-events-auto underline cursor-pointer text-blue-800' onClick={() => changePage(reservation)}>View details</button>
                                {/*<a onClick={() => null} >revoke</a>*/}
                            </div>
                        }
                    </div>
                )}
            
          </div>
        </div>
        {bottomLoading && <div className='mx-auto py-6'><p>Loading...</p></div>}
      </section>
    )
}

export default Reservations;