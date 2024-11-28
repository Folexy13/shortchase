import React from 'react'


const handleModal = ()=>{
  console.log(localStorage.getItem("isModal"))
    
    if(localStorage.getItem("isModal")=="true"){
        localStorage.removeItem("isModal")
    }else{
        localStorage.setItem("isModal","true")

    }
}
const Navbar:React.FC = () => {
  return (
    <div className='navbar'>
        <div style={{cursor:"pointer"}}>Shortchase</div>
        <div style={{cursor:"pointer"}} onClick={handleModal}>Login/Signup</div>
    </div>
  )
}

export default Navbar