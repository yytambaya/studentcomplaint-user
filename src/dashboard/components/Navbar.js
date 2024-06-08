import { getSiteBaseURL } from "../../services/helpers";
import logo1 from '../../asset/images/afit-logo.jpg' 
import parkPic from '../../asset/images/user.svg';
import { Link } from "react-router-dom";

export const Navbar = () => {
    return(

<nav class="bg-teal-500 border-gray-200 sm:px-4 py-2.5">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <a href={`${getSiteBaseURL()}/complaints`} class="flex items-center">
      <img src={logo1} class="mr-1 h-6 sm:h-9" alt="Flowbite Logo"/>
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">AFIT Complaint Management System</span>
  </a>
  <div class="flex items-center md:order-2">
      {/*<button onClick={() => window.location.href="/profile"} type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="park-menu-button" aria-expanded="false" data-dropdown-toggle="park-dropdown" data-dropdown-placement="bottom">*/}
        {/*<span class="sr-only">Open park menu</span>*/}
        {/*<img class="w-8 h-8 rounded-full" src={parkPic} alt="park photo"/>*/}
        <a href="/profile" className=" text-xl underline text-green-700">Profile</a>
      {/*</button>*/}
      {/*} Dropdown menu */}
      {/*<div class="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block" id="park-dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate3d(644.8px, 82.4px, 0px)'}}>
        <div class="py-3 px-4">
          <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul class="py-1" aria-labelledby="park-menu-button">
          <li>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Parks</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Analytics</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>*/}
      <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  {/*<div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
      <li>
        <a href="/parks" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Parks</a>
      </li>
      <li>
        <a href="/slots" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Slots</a>
      </li>
      <li>
        <a href="/reservations" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Reservations</a>
      </li>
      <li>
        <a href="/users" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Users</a>
      </li>
    </ul>
  </div>*/}
  </div>
</nav>
)}