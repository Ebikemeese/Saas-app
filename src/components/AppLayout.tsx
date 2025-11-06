import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Helmet>
                <html lang="en"/>
            </Helmet>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout