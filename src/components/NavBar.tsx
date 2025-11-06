import { Link } from "react-router-dom"
import NavItems from "./NavItems"

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <img 
                        src="/images/logo.svg" 
                        alt="logo" 
                        width={46}
                        height={44}
                    />
                </div>
            </Link>

            <div className="flex items-center gap-8">
                <NavItems />
                <p className="text-gray-700">Sign In</p>
            </div>
        </nav>
    )
}

export default NavBar