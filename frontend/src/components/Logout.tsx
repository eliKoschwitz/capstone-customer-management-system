import React, {useCallback} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {IconButton} from "@mui/material";

export default function LogoutButton() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = useCallback(async () => {
        await axios.get("/api/app-users/logout");
        navigate("/login?redirect=" + encodeURIComponent(location.pathname + location.search));
        window.document.cookie = "";
        window.localStorage.clear();
    }, [location, navigate]);

    return (
        <>
            <IconButton size={"large"} color={"inherit"} aria-label={"logo"} onClick={(logout)}>
                <LogoutIcon/>
            </IconButton>
        </>
    )
}