import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import login from './actions/login';
import logout from './actions/logout';

const Navbar = () => {
    const provider = new GoogleAuthProvider();
    let user = useSelector(state => state);
    let [photo, setPhoto] = useState("");
    let [error, setError] = useState(false);
    let dispatch = useDispatch();
    onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            dispatch(login(currentUser));
            setPhoto(currentUser.photoURL);
        }
    })

    function signin(){
        signInWithPopup(auth, provider)
        .then(() => setError(false))
        .catch(() => setError(true))
    }

    function signout(){
        auth.signOut();
        dispatch(logout());
    }

    return (
        <nav className="bg-gray-900 p-4 font-body grid xl:grid-cols-12 grid-cols-3 grid-rows-5 xl:grid-rows-1">
            <Link to="/" className="text-2xl hover:text-gray-400 text-gray-100 xl:col-span-2 xl:col-start-1 xl:mt-2">Techcise</Link>
            {'displayName' in user ? <Link to="/" className="text-2xl text-gray-100 xl:col-span-1 xl:text-right xl:col-start-7 xl:mt-2 hover:text-gray-400 xl:row-start-1 col-start-1 row-start-2" href="#">Home</Link> : <Link to="/" className="text-2xl text-gray-100 xl:col-span-1 xl:text-right xl:col-start-9 xl:mt-2 hover:text-gray-400 xl:row-start-1 col-start-1 row-start-2" href="#">Home</Link>}
            {'displayName' in user ? <Link to="/about" className="text-2xl text-gray-100 xl:col-span-1 xl:text-right xl:col-start-8 xl:mt-2 hover:text-gray-400 xl:row-start-1 col-start-1 row-start-3" href="#">About</Link> : <Link to="/about" className="text-2xl text-gray-100 xl:col-span-1 xl:text-right xl:col-start-10 xl:mt-2 hover:text-gray-400 xl:row-start-1 col-start-1 row-start-3" href="#">About</Link>}
            {'displayName' in user ? <button onClick={signout} className="bg-white focus:ring-2 focus:ring-gray-200 hover:bg-gray-200 rounded-2xl h-14 xl:mb-2 p-2 focus:ring-offset-2 text-2xl text-gray-900 xl:col-span-2 xl:col-start-11 col-start-2 col-span-2 row-start-1 focus:ring-offset-gray-900 ml-4 xl:ml-0">Log Out</button> : <button onClick={signin} className="bg-white focus:ring-2 focus:ring-gray-200 hover:bg-gray-200 rounded-2xl h-14 xl:mb-2 p-2 focus:ring-offset-2 text-2xl text-gray-900 xl:col-span-1 xl:col-start-12 col-start-3 row-start-1 focus:ring-offset-gray-900">Log In</button>}
            {'displayName' in user && photo !== "" ? <img className="w-10 rounded-full xl:ml-10 xl:mt-1 h-10 xl:col-start-9 col-start-1 xl:row-start-1 row-start-4" src={photo} /> : null}
            {'displayName' in user ? <Link to="/create" className="bg-white focus:ring-2 focus:ring-gray-200 hover:bg-gray-200 rounded-2xl h-14 xl:mb-2 p-2 focus:ring-offset-2 text-2xl text-gray-900 xl:col-span-1 xl:col-start-10 col-start-3 row-start-3 xl:row-start-1 focus:ring-offset-gray-900 xl:mr-6 text-center">Write</Link> : null}
            {error && <h2 className="text-white text-center pb-2 w-64 pt-2 h-10 bg-red-400 xl:col-start-3 col-start-1 col-span-4 xl:row-start-1 rounded-xl pl-2 pr-2 row-start-5">Error occured while loging in!</h2>}
        </nav>
    );


}

export default Navbar;