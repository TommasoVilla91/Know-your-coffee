import AppHeader from "../components/AppHeader"
import { Outlet } from "react-router-dom"

function AppLayout() {

    return (
        <>
            <AppHeader />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;