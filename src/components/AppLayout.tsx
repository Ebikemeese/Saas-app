import Layout from "@/pages/root/Layout";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AppLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <html lang="en"/>
            </Helmet>

            <Layout>
                <Outlet />
            </Layout>

            <Footer />
        </div>
    )
}

export default AppLayout