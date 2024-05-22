import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import Lits from './Parks'
import EditLit from './EditPark'
import { getSiteBaseURL } from '../../services/helpers'
import logo1 from '../../asset/images/logo1.svg' 
import parkPic from '../../asset/images/user.svg';
import EditPark from './EditPark'
import Parks from './Parks'
import NewPark from './NewPark'
import Park from './Park'
import { Navbar } from '../components/Navbar'

const ParkMain = () => {
    const [page, setPage] = useState("Parks")
    const [lastPage, setLastPage] = useState("Parks")
    const [park, setPark] = useState({})
    
    
    useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])
    
    
    
    return(
        <div>
          <Navbar/>
          {page == "NewPark"? <NewPark setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : page == "Parks" ? <Parks setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} setPark={setPark} /> : page == "Park" ? <Park park={park} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : page == "EditPark" ? <EditPark park={park} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : null}
        </div>    

    )
}

export default ParkMain