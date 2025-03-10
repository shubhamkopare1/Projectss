
import Navbar from "./Navbar";

function Home({ setIsLoggedIn }) {
    return ( 
        <div className="flex flex-col">
            <Navbar setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default Home;