import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-lg mb-2 dark:shadow-gray-200 flex justify-between md:px-10 px-2 py-4 w-full">
      <div className="md:text-3xl text-lg font-bold font-serif flex items-center">
        <Link to={"/blogs"}>Motion</Link>
      </div>
      <div className="flex items-center justify-evenly max-w-60 w-full">
        <Link to={"/publish"} className="">
          <div className="w-20 h-8 text-sm font-bold rounded-full flex justify-center items-center bg-green-400 hover:bg-green-600 hover:text-white">
            Publish
          </div>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className=" bg-black text-white w-20 h-8 text-sm font-semibold rounded-full hover:text-red-300"
        >
          Sign out
        </button>
        <Avatar name="aishik" size="big"></Avatar>
      </div>
    </div>
  );
};
