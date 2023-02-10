import React from "react";
import Customer from "../types/customer";
import {Card, CardContent, Container} from "@mui/material";
import "../styles/customer-page.css";
import {Link} from "react-router-dom";

export default function CustomerCard({customer}: { customer: Customer }) {

    return (
        <div>
            <Container maxWidth={"md"}>
                <Link to={"/detailed-customer/"+customer.id} style={{textDecoration: 'none'}}>
                    <Card sx={{
                        ":hover": {
                            boxShadow:"rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                        },
                        "&.MuiCard-root":{ height: 50, maxWidth:750},
                        "&.MuiPaper-root":{ marginBottom:0.75},
                    }}
                    >
                        <CardContent>
                            <div className={"card"}>
                                <div className={"card-first-last-name"}>
                                    {customer.firstName + " "}
                                    {customer.lastName}
                                </div>
                                <div className={"card-telefon-nr"}>
                                    {customer.telefonNr}
                                </div>
                                <div className={"card-email"}>
                                    {customer.email}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </Container>
        </div>
    );
}