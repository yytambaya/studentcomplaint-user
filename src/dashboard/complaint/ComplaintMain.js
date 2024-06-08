import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import Lits from './Complaints'
import EditLit from './EditComplaint'
import { getSiteBaseURL } from '../../services/helpers'
import logo1 from '../../asset/images/logo1.svg' 
import complaintPic from '../../asset/images/user.svg';
import EditComplaint from './EditComplaint'
import Complaints from './Complaints'
import NewComplaint from './NewComplaint'
import Complaint from './Complaint'
import { Navbar } from '../components/Navbar'

const ComplaintMain = () => {
    const [page, setPage] = useState("Complaints")
    const [lastPage, setLastPage] = useState("Complaints")
    const [complaint, setComplaint] = useState({})
    
    
    useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])
    
    
    
    return(
      <div>
        <Navbar/>  
        {page == "NewComplaint"? <NewComplaint setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : page == "Complaints" ? <Complaints setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} setComplaint={setComplaint} /> : page == "Complaint" ? <Complaint complaint={complaint} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : page == "EditComplaint" ? <EditComplaint complaint={complaint} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : null}
        </div>    
      )
}

export default ComplaintMain