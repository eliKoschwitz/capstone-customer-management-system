import Logout from "../components/Logout";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Customer from "../types/customer";
import CustomerCard from "./CustomerCard";
import {AppBar, Container, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import Button from "@mui/material/Button";
import "../styles/customer-page.css";
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import AddIcon from '@mui/icons-material/Add';
import {ThemeConfig} from "../config/Theme";

export default function CustomersPage() {

    const [customerList, setCustomerList] = useState<Customer[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/customer");
                setCustomerList(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                console.log("setAxiosWasPerformed(true);");
            }
        })();
    }, []);

    const navigate = useNavigate();

    return (
        <div className={"all-customer-page"}>
            <div>
                <AppBar position="relative" >
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
            <div>
                <p></p>
            </div>
            <div className="customers">
                <Container maxWidth={"md"}>
                    <Typography>
                        <div className={"header"}>
                            <div className={"first-last-name"}>
                                <GroupIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>Customer Name</p>
                            </div>
                            <div className={"telefon-nr"}>
                                <CallIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>TelefonNr</p>
                            </div>
                            <div className={"email"}>
                                <EmailIcon sx={{
                                    marginRight: 1,
                                    fontSize: "medium"
                                }}/>
                                <p className={"customer-card-details"}>E-Mail</p>
                            </div>
                        </div>
                    </Typography>
                </Container>
                {
                    customerList.map(customer => <CustomerCard customer={customer}/>)
                }
                <div className={"add-customer"}>
                    <IconButton size={"large"} color={"inherit"} aria-label={"logo"} onClick={() => navigate("/add-customer")}>
                        <AddIcon/>
                    </IconButton>
                </div>



                <ThemeConfig>
                    <button></button>
                </ThemeConfig>
            </div>
        </div>

    )
}