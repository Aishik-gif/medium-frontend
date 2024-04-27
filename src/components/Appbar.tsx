import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="shadow-lg mb-2 dark:shadow-gray-200 flex justify-between px-10 py-4 w-full">
      <div className="text-3xl font-bold font-serif flex items-center">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div className="flex items-center justify-between">
        <Link to={"/publish"} className="mr-3">
          <div className="w-20 h-8 text-sm font-bold rounded-full flex justify-center items-center bg-green-400 hover:bg-green-600 hover:text-white">
            Publish
          </div>
        </Link>
        <Avatar name="aishik" size="big"></Avatar>
      </div>
    </div>
  );
};
