import AdminNavbar from "./AdminNavbar";

function Home2({ setIsLoggedIn }) {
    return ( 
        <div>
            <AdminNavbar setIsLoggedIn={setIsLoggedIn} />  
            <h1 className="text-white text-3xl p-6">Welcome to the Admin Dashboard</h1>
        </div>
    );
}

export default Home2;
