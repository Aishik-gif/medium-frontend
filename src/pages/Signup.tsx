import { useEffect } from "react";
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/blogs');
  }, [navigate])
  return(
    <div className="grid lg:grid-cols-2">
      <div className="flex justify-center items-center">
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}