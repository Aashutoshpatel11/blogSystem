import axios from "axios"
import { useEffect, useState } from "react";
function App() {
  const [blogs, setBlogs] = useState([])

  console.log(blogs);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/blog/get?search=&page=1&limit=10`, {withCredentials:true})
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
      <div className="w-screen min-h-screen p-10 flex flex-col gap-10 items-center">
        <h1 className="text-3xl font-bold underline">
          Blog System
        </h1>

        <div className="flex gap-5 flex-wrap justify-center">
          {blogs?.map((blog) => (
            <div
              key={blog.id || blog._id || blog.title}
              className="bg-black rounded-2xl p-5 w-[300px]"
            >
              <h2 className="text-white text-xl font-semibold">
                {blog.title}
              </h2>
              <p className="text-gray-300 mt-2">
                {blog.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default App
