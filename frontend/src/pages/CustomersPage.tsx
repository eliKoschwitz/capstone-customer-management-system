import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Customer from "../types/customer";
import CustomerCard from "./CustomerCard";
import {IconButton, Stack, Typography} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import "../styles/customer-page.css";
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import {ThemeConfig} from "../config/Theme";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import NavBarOrdersAndCustomersPage from "../components/NavBarOrdersAndCustomersPage";

export default function CustomersPage() {

    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [inputForFilter, setInputForFilter] = useState<string>("");

    let orderListFiltered: Customer[];

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

    const getInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputForFilter(value);
    }

    if (inputForFilter !== "") {
        const query = inputForFilter;
        const re = RegExp(`.*${query.toLowerCase().split("").join(".*")}.*`);
        orderListFiltered = customerList.filter(customer => customer.firstName.toLowerCase().match(re));
    } else {
        orderListFiltered = customerList.map(customer => customer);
    }

    return (
        <Box className={"customer-page"}>
            <NavBarOrdersAndCustomersPage/>
            <SearchBar getInput={getInput}/>

            <Stack className="customers" display={"flex"} flexDirection={"column"} justifyContent={"center"}
                   alignItems={"center"}>
                <Stack maxWidth={"md"} display={"flex"} justifyContent={"center"}>
                    <Typography>
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} color={"gray"}
                             fontSize={1} marginLeft={0.5}>

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

                        </Box>
                    </Typography>
                </Stack>

                {
                    orderListFiltered.map(customer => <CustomerCard key={customer.id} customer={customer}/>)
                }
                <div className={"add-customer"}>
                    <IconButton size={"large"} aria-label={"logo"}
                                onClick={() => navigate("/add-customer")}
                                sx={{boxShadow: 3}}
                    >
                        <AddIcon sx={{color:"white"}}/>
                    </IconButton>
                </div>
            </Stack>
            <ThemeConfig>
                <></>
            </ThemeConfig>

        </Box>
    )
}