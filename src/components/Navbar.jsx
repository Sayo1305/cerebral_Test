import React, { useEffect, useState } from "react";
import Icon from "../assets/icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
      const navigate = useNavigate();
  const [OpenNavbar, setOpenNavbar] = useState(false);
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  useEffect(() => {
      setPathname(location.pathname);
  }, [location]);
  return (
      <>
    <div className={`${(pathname.includes('/app/Login') || (pathname.includes('/app/SignUp'))) ?  "hidden" : `w-full flex ${OpenNavbar === true ? "fixed" : "sticky"} z-20  justify-between md:gap-5 shadow-lg  items-center py-5 px-5 md:px-10`} `}>
      <div className="w-1/3 md:w-[190px]">
        <img src={Icon} onClick={()=>{navigate('/'); setOpenNavbar(false)}} alt="icon" className="md:w-[190px] w-full" />
      </div>
      <div className="lg:flex hidden justify-center gap-10 text-[#250044] font-bold">
        <div className="cursor-pointer hover:text-[#90A6FF]" onClick={()=>{navigate('/Plans')}}  >Explore Plans</div>
        <div className="cursor-pointer hover:text-[#90A6FF]" onClick={()=>{navigate('/therapy')}}>therapy</div>
        <div className="cursor-pointer hover:text-[#90A6FF]" onClick={()=>{navigate('/Medication')}}>Medication</div>
        <div className="cursor-pointer hover:text-[#90A6FF]" onClick={()=>{navigate('/Insurance')}}>Insurance</div>
        <div className="cursor-pointer hover:text-[#90A6FF]" onClick={()=>{navigate('/About')}}>About</div>
      </div>
      <div className="flex justify-center gap-5 items-center">
        <div className="lg:block hidden cursor-pointer">Login</div>
        {OpenNavbar === false && (
          <div onClick={()=>{navigate('/app/Login')}} className="py-3 px-8 cursor-pointer shadow-md font-bold bg-[#51459E] text-white rounded-3xl">
            Get Started
          </div>
        )}
        {OpenNavbar === true ? (
          <div
            className="lg:hidden block cursor-pointer"
            onClick={() => {
              setOpenNavbar(!OpenNavbar);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
        ) : (
          <div
            className="lg:hidden block cursor-pointer"
            onClick={() => {
              setOpenNavbar(!OpenNavbar);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
    {
      OpenNavbar === true && <div className="w-full fixed py-16 p-5 gap-2 h-screen bg-white flex flex-col">
            <div className="p-5 font-semibold border-b-[1px] border-slate-200" onClick={()=>{navigate('/Plans'); setOpenNavbar(false)}}>Explore Plans</div>
            <div className="p-5 font-semibold border-b-[1px] border-slate-200" onClick={()=>{navigate('/therapy'); setOpenNavbar(false)}}>Therapy</div>
            <div className="p-5 font-semibold border-b-[1px] border-slate-200" onClick={()=>{navigate('/Medication'); setOpenNavbar(false)}}>Medication</div>
            <div className="p-5 font-semibold border-b-[1px] border-slate-200" onClick={()=>{navigate('/Insurance'); setOpenNavbar(false)}}>Insurance</div>
            <div className="p-5 font-semibold border-b-[1px] border-slate-200"onClick={()=>{navigate('/About'); setOpenNavbar(false)}}>About</div>
            <div className="w-full flex justify-center">
            <div onClick={()=>{navigate('/app/Login'); OpenNavbar(false)}} className="py-3 px-8 cursor-pointer shadow-md font-bold bg-[#51459E] text-white rounded-3xl">
            Get Started
          </div>
            </div>
            <div className="w-full text-center font-semibold">Login</div>
      </div>
    }
    </>
  );
};

export default Navbar;
