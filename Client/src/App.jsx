import axios from "axios"
import { useEffect, useState } from "react";
function App() {
  const [blogs, setBlogs] = useState([])

  console.log(blogs);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/blog/get?search=blog&page=1&limit=10`, {withCredentials:true})
      if( res.status == 200 ){
        setBlogs(res.data.data)
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect( () => {
    getBlogs()
  }, [] )

  return (
    <>
      <div className="w-screen min-h-screen p-10 flex flex-col gap-10 items-center" >
        <h1 className="text-3xl font-bold underline">
          Blog System
        </h1>
        <div className="flex gap-5 overflow-auto" >
          {blogs && blogs.map( (blog) => (
            <div className="bg-black rounded-2xl p-4" > 
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
            </div>
          ) )}
        </div>
      </div>
    </>
  )
}

export default App
