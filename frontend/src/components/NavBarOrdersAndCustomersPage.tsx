import {AppBar, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Button from "@mui/material/Button";
import Logout from "./Logout";
import React from "react";
import {useNavigate} from "react-router-dom";


export default function NavBarOrdersAndCustomersPage() {
    const navigate = useNavigate();

    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}>
                        <DomainVerificationIcon/>
                    </IconButton>
                    <Typography variant={"h6"} sx={{flexGrow: 1}}>
                        ORGANIZE
                    </Typography>
                    <Stack direction={"row"} spacing={2}>
                        <Button color={"inherit"} onClick={() => navigate("/")}>Customer</Button>
                        <Button color={"inherit"} onClick={() => navigate("/order")}>Order</Button>
                        <Logout/>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )
}