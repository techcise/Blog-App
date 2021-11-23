const About = () => {
    return ( 
        <div className="about font-body grid grid-cols-3 grid-rows-3 justify-center">
            <div className="col-start-1 col-span-3 row-start-1 grid grid-cols-1 grid-rows-2 m-4 p-4 xl:mt-20">
                <h1 className="text-3xl col-start-1 row-start-1 text-center">About Us!</h1>
                <p className="text-xl col-start-1 row-start-2 text-center">Just a simple blog website created using react, redux, firebase and tailwind css 😄😄❗</p>
            </div>
        </div>
    );
}
 
export default About;