import NavBar from "@/components/NavBar"


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <NavBar />
            { children }
        </div>
    )
}

export default Layout