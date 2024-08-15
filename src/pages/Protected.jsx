import { Outlet, useNavigate,Navigate } from "react-router-dom"
import { auth } from './../firebase/config';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";


const Protected = () => {
 const [isAuth , setIsAuth] = useState()
 const navigate = useNavigate()

 useEffect(() => {
onAuthStateChanged(auth,(user)=>{
    setIsAuth(user ? true : false)
})},[])

 if(isAuth === false){
    return  <Navigate to={"/"}/>
 }

  return <Outlet/>
}

export default Protected
