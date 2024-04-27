import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) navigate('/blogs');
  }, [navigate])
  return (
    <div className="p-10 flex flex-col items-center h-svh justify-center font-serif">
      <div className="text-6xl font-bold">Welcome to Motion</div>
      <div className="text-2xl pt-5">
        Get Moving: Inspiring stories and ideas to keep you going.
      </div>
      <div className="flex max-w-screen-sm w-full justify-center gap-6 text-lg pt-9">
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="px-5 py-3 bg-green-600 text-black rounded w-40"
        >
          Sign up
        </button>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="px-5 py-3 bg-black text-white rounded w-40"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
