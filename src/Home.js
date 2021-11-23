import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { db } from "./firebase";
import { useSelector } from 'react-redux'

const Home = () => {
    let [blogs, setBlogs] = useState(null);
    let user = useSelector(state => state);
    useEffect(() => { 
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "blogs"), orderBy("timestamp"));
            let data = querySnapshot.docs.map(blog => {
                return { data: blog.data(), id: blog.id }
            })
            setBlogs(data);


        }
        getData();
    }, [])
    async function deleteBlog(e, id) {
        e.preventDefault();
        await deleteDoc(doc(db, "blogs", id));
        let newData = blogs.filter((blog) => {
            return blog.id !== id;
        });
        setBlogs(newData);
    }
    return (
        <div className="home font-body grid grid-cols-1 justify-center 2xl:grid-cols-3 xl:grid-cols-2 xl:grid-rows-6 grid-rows-6 bg-gray-100">
            {blogs && blogs.map(blog => (
                <div key={blog.id} className="bg-white hover:shadow-xl grid grid-cols-6 grid-rows-4 m-20 p-10 h-60 rounded-3xl">
                    <h1 className="col-start-1 col-span-4 row-start-1 text-2xl break-words">{blog.data.title}</h1>
                    <h2 className="col-start-4 xl:col-start-1 md:col-start-1 col-span-3 row-start-1 xl:row-start-4 text-xl md:row-start-4 sm:block hidden">By {blog.data.author}</h2>
                    <Link to={`blog-detail/${blog.id}`} className="md:col-start-5 col-span-6 md:row-start-1 row-start-3 col-start-1 row-span-1 mb-12 bg-gray-900 text-white pt-1 rounded-xl md:rounded-full focus:ring focus:ring-2 focus:ring-gray-900 h-8 text-center focus:ring-offset-2 focus:ring-offset-white ">Read More</Link>
                    {'displayName' in user ? <button className="md:col-start-5 col-span-6 md:row-start-4 row-start-4 col-start-1 row-span-1 mb-12 bg-gray-900 text-white pt-1 rounded-xl md:rounded-full focus:ring focus:ring-2 focus:ring-gray-900 h-8 text-center focus:ring-offset-2 focus:ring-offset-white" onClick={(e) => deleteBlog(e, blog.id)}>Delete</button> : null}
                </div>
            ))}
        </div>
    );
}

export default Home;