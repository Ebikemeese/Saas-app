import { Link } from "react-router-dom"
import NavItems from "./NavItems"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <img 
                        src="/Saas-app/images/logo.svg" 
                        alt="logo" 
                        width={46}
                        height={44}
                    />
                </div>
            </Link>

            <div className="flex items-center gap-8">
                <NavItems />
                
                <SignedOut>
                    <SignInButton>
                        <button  className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton afterSignOutUrl="/sign-in"/>
                </SignedIn>
            </div>
        </nav>
    )
}

export default NavBar