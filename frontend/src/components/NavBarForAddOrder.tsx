import {AppBar, IconButton, Stack, Toolbar} from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function NavBarForAddOrder() {

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
                        <Button color={"inherit"} onClick={() => navigate("/order")}>Back</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )
}