import { Appbar } from "./Appbar";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { Delta, EmitterSource } from "quill/core";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [post, setPost] = useState({});
  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center">
        <div className="flex items-center lg:max-w-screen-lg max-w-screen-sm border-b w-full">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0,0,256,256"
              className="w-14 pr-3 border-r-2"
            >
              <g
                fill="#7f7f7f"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.12,5.12)">
                  <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24,13v11h-11v2h11v11h2v-11h11v-2h-11v-11z"></path>
                </g>
              </g>
            </svg>
          </div>
          <input
            className="block w-full p-2.5 m-3 text-4xl font-serif focus:outline-none text-gray-900 rounded-lg dark:placeholder-gray-400 dark:text-white"
            placeholder="Title"
            required
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mt-5 w-full px-2">
          <TextEditor post={post} setPost={setPost} />
        </div>
      </div>
    </div>
  );
};

interface Post {
  title?: string | "";
  content?: Delta | undefined;
}

interface Props {
  post: Post;
  setPost: React.Dispatch<Post>;
}

const TextEditor = ({ post, setPost }: Props) => {
  const navigate = useNavigate();
  const [quill, setQuill] = useState<Quill>();

  useEffect(() => {
    const handler = (
      _delta: Delta,
      _oldDelta: Delta,
      source: EmitterSource
    ) => {
      if (source !== "user") return;
      setPost({ ...post, content: quill?.getContents() });
    };
    quill?.on("text-change", handler);

    return () => {
      quill?.off("text-change", handler);
    };
  }, [quill, post, setPost]);

  const publish = async () => {
    try{const response = await axios.post(`${BACKEND_URL}/blog`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    navigate(`/blog/${response.data.id}`);}catch(e){
      alert('Something went wrong!😵')
    }
  };

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const toolbarOptions = [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      [
        "bold",
        "italic",
        "underline",
        "strike",
        { color: [] },
        { background: [] },
      ],
      ["link", { align: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],

      ["clean"],
    ];

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
      placeholder: "Tell your story...",
    });
    setQuill(q);
  }, []);

  return (
    <div className="relative">
      <div ref={wrapperRef}></div>
      <button
        onClick={publish}
        className="absolute right-2 bottom-2 bg-green-400 px-3 py-1 rounded-full font-bold text-xs z-10"
      >
        Publish
      </button>
    </div>
  );
};
