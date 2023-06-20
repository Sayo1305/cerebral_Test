import React from 'react'
import BG from "../assets/sp-bg.webp";
const HomePage = () => {
  return (
    <div className='w-full min-h-[80vh] md:flex-row flex-col bg-cover items-center justify-center flex p-5 bg-gradient-to-r from-[#CCD2EC] to-[#fff]'>
      <div className='text-2xl text-center font-semibold md:hidden block p-5'>Total support, completely online.</div>
      <img className='md:w-1/2 w-full h-full' src={BG} alt="" />
      <div className='md:w-1/3 w-full flex flex-col gap-3 p-5'>
            <div className='text-2xl font-semibold md:block hidden'>Total support, completely online.</div>
            <div className='flex flex-col'>
                  <div className='font-semibold'>Personal, flexible care</div>
                  <div className='font-thin text-justify'>Get matched with a credentialed therapist or prescriber, based on what you need. Receive ongoing support from someone you trust.</div>
            </div>
            <div className='flex flex-col'>
                  <div className='font-semibold'>Easy scheduling</div>
                  <div className='font-thin text-justify'>Book and reschedule your sessions within the app and message us if you need help between appointments.</div>
            </div>
            <div className='flex flex-col'>
                  <div className='font-semibold'>Maintain what you've gained</div>
                  <div className='font-thin text-justify'>Never fly solo again. Regular check-ins, new strategies and tracking your progress are all included with your plan.</div>
            </div>
            <div className='bg-[#51459E] text-white text-center md:w-2/5 w-3/5 rounded-3xl py-3 px-6'>Get Started</div>
      </div>
    </div>
  )
}

export default HomePage