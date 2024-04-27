import Quill from "quill";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Delta } from "quill/core";
import { useEffect, useRef } from "react";

export const BlogPage = ({ blog }: { blog: Blog | undefined }) => {
  if (!blog)
    return (
      <div className="max-h-svh">
        <Appbar></Appbar>
        <div className="font-bold text-6xl p-20 flex justify-center items-center">
          404 | Not Found
        </div>
      </div>
    );
  return (
    <div>
      <Appbar></Appbar>
      <div className="w-full flex justify-center items-center">
        <div className="grid md:grid-cols-12 grid-cols-8 px-10 w-full py-4 max-w-sm md:max-w-6xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="pt-5 text-gray-700 dark:text-gray-200">
              <DeltaRenderer delta={blog.content}/>
            </div>
          </div>
          <div className="col-span-4 pt-10 md:pt-0">
            <div className="font-semibold">Author</div>
            <div className="font-bold text-xl flex items-center">
              <span className="rounded-full w-4 h-4 bg-gray-300 mr-2"></span>
              {blog.author.name || "Anonymous"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface Props{
  delta: Delta;
}

function DeltaRenderer({ delta }: Props) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        readOnly: true
      });
      quill.setContents(delta);
    }
  }, [delta]);

  return <div ref={editorRef} />;
}