import {useEffect, useLayoutEffect, useState} from 'react' 
// import Profile from './Profile'
//import NewLit from './NewLit'
import Lits from './Slots'
import EditLit from './EditSlot'
import { getSiteBaseURL } from '../../services/helpers'
import logo1 from '../../asset/images/logo1.svg' 
import slotPic from '../../asset/images/user.svg';
import EditSlot from './EditSlot'
import Slots from './Slots'
import NewSlot from './NewSlot'
import Slot from './Slot'
import { Navbar } from '../components/Navbar'

const SlotMain = () => {
    const [page, setPage] = useState("Slots")
    const [lastPage, setLastPage] = useState("Slots")
    const [slot, setSlot] = useState({})
    
    
    useLayoutEffect( () => {
        if(localStorage.getItem('jwt_token') == "" || localStorage.getItem('jwt_token') == null || localStorage.getItem('jwt_token') == undefined){
            window.location.href = `${getSiteBaseURL()}/login`
        }
    }, [])
    
    
    
    return(
      <div>
        <Navbar/>
        {page == "NewSlot"? <NewSlot setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} /> : page == "Slots" ? <Slots setPage={setPage} setLastPage={setLastPage} lastPage={lastPage} setSlot={setSlot} /> : page == "Slot" ? <Slot slot={slot} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : page == "EditSlot" ? <EditSlot slot={slot} setPage={setPage} setLastPage={setLastPage} lastPage={lastPage}/> : null}
      </div>    

    )
}

export default SlotMain