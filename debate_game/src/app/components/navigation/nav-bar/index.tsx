const NavBar = () => {
    return(
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a href="/" className="btn btn-ghost text-xl">Not Broke</a>
        </div>

        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">...</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Profile</a></li>
                <li><a>Log Out</a></li>
            </ul>
        </div>

        </div>
    )
}

export default NavBar;