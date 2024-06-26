import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { Delta } from "quill/core";

export interface Blog {
  id: string;
  title: string;
  author: {name: string};
  content: Delta;
  date: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Array<Blog>>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/blog/bulk`, {
      headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setBlogs(response.data.posts);
        setLoading(false);
      })
  }, [])
  return {
    loading,
    blogs
  }
}

export const useBlog = ({ id } : {id : string}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/blog/${id}`, {
      headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setBlog(response.data.post);
        setLoading(false);
      })
  }, [id])
  return {
    loading,
    blog
  } 
}