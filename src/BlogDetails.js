import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, serverTimestamp, orderBy, deleteDoc } from "firebase/firestore";
import { db } from './firebase';
import { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { comment } from "postcss";

const BlogDetails = () => {
    let { id } = useParams();
    let [data, setData] = useState(null);
    let [text, setText] = useState('');
    let [comments, setComments] = useState(null);

    async function getComments(){
        const querySnapshot = await getDocs(collection(db, "blogs", id, "comments"), orderBy("timestamp"));
        let data = querySnapshot.docs.map(doc => ({data: doc.data(), id: doc.id}));
        setComments(data);
    }
    useEffect(() => {
        async function getDetails() {
            const docRef = doc(db, "blogs", id);
            const docSnap = await getDoc(docRef);
            setData(docSnap.data());
        }
        getDetails();
        getComments();

    }, [])
    let user = useSelector(state => state);
    let commentText = { photo: user.photoURL, comment: text, timestamp: serverTimestamp() }
    async function commentit(e) {
        e.preventDefault();
        if (text.length > 2 && text.length < 40) {
            await addDoc(collection(db, "blogs", id, "comments"), commentText);
            setText('');
        }
        getComments();
    }
    async function deleteComment(e, id, docId){
        e.preventDefault();
        await deleteDoc(doc(db, "blogs", docId, "comments", id));
        let newData = comments.filter((comment) => {
            return comment.id !== id;
        });
        setComments(newData);
    }
    return (
        <div className="grid grid-cols-3 grid-rows-4 font-body bg-gray-100">
            <div className="col-start-1 col-span-3 row-start-1 m-4 p-4 font-body">
                <h1 className="p-4 lg:text-3xl text-xl text-center xl:w-full">{data && data.title}</h1>
                <p className="p-4 lg:text-xl text-base text-center text-gray-800">{data && data.body}</p>
                <h2 className="col-start-1 row-start-3 p-4 italic text-right">Author: {data && data.author}</h2>
            </div>
            <div className="col-start-1 col-span-3 row-start-2 mt-10">
                <label className="text-xl ml-4 mr-2 text-gray-600">Write Something:</label>
                <input className="w-1/2 mr-2 p-2 rounded-xl text-xl outline-none" value={text} onChange={e => setText(e.target.value)} />
                {'photoURL' in user ? <button className="m-2 text-xl bg-gray-800 hover:bg-gray-900 text-white rounded-2xl p-2" onClick={(e) => commentit(e)}>Comment</button> : <h2 className="text-white text-center pb-2 w-64 pt-2 h-10 bg-green-400 rounded-xl pl-2 pr-2 m-4">Log In to write a comment</h2>}
                {comments && comments.map(comment => (
                    <div className="m-4 ml-4 text-2xl grid grid-cols-2 grid-rows-1" key={comment.id}>
                        <img className="w-10 h-10 rounded-full inline row-start-1 col-start-1" src={comment.data.photo} />
                        <h2 className="ml-20 row-start-1 col-start-1">{comment.data.comment}</h2>
                        {user.photoURL === comment.data.photo ? <button className="m-2 text-xl bg-gray-800 hover:bg-gray-900 text-white rounded-2xl p-2 col-start-2 w-20 row-start-1 h-12 justify-self-end" onClick={(e) => deleteComment(e, comment.id, id)}>Delete</button> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogDetails;