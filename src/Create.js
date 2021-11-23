import { useState } from "react";
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Create = () => {
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [error, setError] = useState(false);

    let user = useSelector(state => state);
    let data = { title: title, body: content, author: user.displayName, timestamp: serverTimestamp() };
    async function create(e) {
        e.preventDefault();
        if(title.length > 2 && title.length < 40){
            await addDoc(collection(db, "blogs"), data);
            setError(false);
            setTitle('');
            setContent('');
        }
        else{
            setError(true);
        }
    }
    
    return (
        <div className="grid xl:grid-cols-3 xl:grid-rows-3 justify-center font-body bg-gray-100 items-center">
            <form className="col-start-2 row-start-1 m-4 xl:mt-40 items-center bg-white p-4 rounded-3xl">
                {error && <h2 className="bg-red-400 text-white rounded-2xl pl-2 mb-4 pr-2 pt-2 pb-2 text-center h-10">Title should  be in the range of 2 to 40!</h2>}
                <label className="block text-2xl font-bold">Title</label>
                <input className="block mt-4 mb-4 p-2 outline-none rounded w-full bg-gray-100 text-gray-900 text-2xl" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label className="block text-2xl font-bold">Content</label>
                <textarea className="block mt-4 p-2 outline-none mb-4 rounded w-full bg-gray-100 text-2xl" value={content} onChange={(e) => setContent(e.target.value)} />
                {'displayName' in user ? <button className="block text-white bg-gray-900 rounded-full text-xl p-1 pl-2 pr-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-offset-white" onClick={create} type="submit">Create</button> : <button className="block text-white bg-gray-900 rounded-full text-xl p-1 pl-2 pr-2 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-offset-white" disabled type="submit">Create</button>}
            </form>
        </div>
    );
}

export default Create;