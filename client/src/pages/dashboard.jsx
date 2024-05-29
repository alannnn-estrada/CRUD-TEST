import { Header } from "./header";
import { useAuth } from "../components/helpers/API/auth";
import { useEffect } from "react";
import { Sidebar } from "../components/sidebar/sidebar";
import { useLocation } from "react-router-dom";
import { Init } from "../components/dashboard_table/init";
import { TableComponent } from "../components/dashboard_table/component_table/table";
import { useDarkMode } from "../components/helpers/darkmode";
import { EditItemTable } from "../components/dashboard_table/edit/edit";

export function Dashboard() {
    const { userName, user, password } = useAuth();
    const location = useLocation();
    const { darkMode } = useDarkMode();

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const styles = {
        container: {
            display: "grid",
            gridTemplateColumns: "repeat(1, auto)",
            textAlign: "center",
            marginLeft: "5%",
            marginRight: "5%",
        },
    };
    if (darkMode) {
        document.body.style.backgroundColor = "#121212";
        document.body.style.color = "#fff";
    } else {
        document.body.style.backgroundColor = "#f0f2f5";
        document.body.style.color = "#000";
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div style={styles.container} className="container">
                {location.pathname === "/dashboard" && location.search === "" && (
                    <Init username={userName} user={user} pass={password} />
                )}
                {location.search === "?table=tabla1" && (
                    <TableComponent tableName="tabla1" />
                )}
                {location.search.includes("table=tabla1&edit") && (
                    <EditItemTable tableName="tabla1" />
                )}
            </div>
        </>
    )
}