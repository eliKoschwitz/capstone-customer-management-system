import React from "react";
import Customer from "../types/customer";
import {Card, CardContent, Container, Typography} from "@mui/material";
import "../styles/customer-card.css";
import {Link} from "react-router-dom";

export default function CustomerCard ({customer}:{customer:Customer}) {


    return (
        <div className="customer-card">
            <Container maxWidth={"md"}>
                <Link to={"/test"} style={{ textDecoration: 'none' }}>
                <Card >
                    <CardContent >
                        <Typography gutterBottom variant={"h6"}>
                            <div>
                                {customer.firstName+" "}
                                {customer.lastName}
                            </div>
                            <div>
                                {customer.telefonNr}
                            </div>
                            <div>
                                {customer.email}
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
                </Link>
            </Container>
        </div>
    );
}