import React from "react";
import {Card, CardContent, Container} from "@mui/material";
import "../styles/customer-page.css";
import {Link} from "react-router-dom";
import Order from "../types/order";

export default function CustomerCard({order}: { order: Order }) {


    return (
        <div>
            <Container maxWidth={"md"}>
                <Link to={"/detailed-order/"+order.id} style={{textDecoration: 'none'}}>
                    <Card sx={{
                        ":hover": {
                            boxShadow:"10px 5px 10px #ccc",
                        },
                        "&.MuiCard-root":{ height: 50, maxWidth:750},
                        "&.MuiPaper-root":{ marginBottom:0.75},
                    }}
                    >
                        <CardContent>
                            <div className={"card"}>
                                <div className={"card-first-last-name"}>
                                    {order.website}
                                </div>
                                <div className={"card-telefon-nr"}>
                                    {order.customerId}
                                </div>
                                <div className={"card-email"}>
                                    {order.startTime}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </Container>
        </div>
    );
}