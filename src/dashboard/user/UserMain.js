import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import Lits from './Users'
import EditLit from './EditUser'
import { getSiteBaseURL } from '../../services/helpers'
import logo1 from '../../asset/images/logo1.svg' 
import userPic from '../../asset/images/user.svg';
import EditUser from './EditUser'
import Users from './Users'
import NewUser from './NewUser'
import User from './User'
import { Navbar } from '../components/Navbar'

const UserMain = () => {
    const [page, setPage] = useState("Users")
    const [lastPage, setLastPage] = useState("Users")
    const [user, setUser] = useState({})
    
    
    useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])
    
    
    
    return(
      <div>
        <Navbar/>  
        {page == "NewUser"? <NewUser setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : page == "Users" ? <Users setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} setUser={setUser} /> : page == "User" ? <User user={user} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : page == "EditUser" ? <EditUser user={user} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : null}
        </div>    
      )
}

export default UserMain