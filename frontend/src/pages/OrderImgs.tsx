import {AppBar, Grid, IconButton, Stack, Toolbar} from "@mui/material";
import {PhotoCamera as PhotoCameraIcon} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import Typography from "@mui/material/Typography";
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Order from "../types/order";
import axios from "axios";
import CustomFile from "../types/file";
import OrderImgCard from "./OrderImgCard";

export default function OrderImgs() {

    const {id} = useParams<{ id: string }>();

    const [showNewCard, setShowNewCard] = useState<boolean>(false);

    const [order, setOrder] = useState<Order>({
        id: "",
        customerId: "",
        website: "",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        fileIds: [""],
        createdBy: ""
    });

    const plus = () => {
        setShowNewCard(true);
    }
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/order/" + id);
                setOrder(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [id]);

    const onUpload = (file: CustomFile) => {
        console.log("in der if um die fileId anzuhängen");
        order.fileIds = order.fileIds || [];
        const orderWithNewFileId = {...order, fileIds: order.fileIds.push(file.id)};
        console.log(orderWithNewFileId);
        (async () => {
            const response = await axios.post("/api/order/", order);
            setOrder(response.data);
        })()
    };

    const onUpload2 = () => {
        setShowNewCard(false);
        console.log("hallo");
    }

    return (
        <>
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

            <div className={"add-customer"}>
                <IconButton size={"large"} color={"inherit"} onClick={plus}>
                    <PhotoCameraIcon color={"inherit"}/>
                </IconButton>
            </div>

            <Grid container paddingTop={2} paddingLeft={1} paddingRight={1} display={"flex"}
                  justifyContent={"center"} alignItems={"center"}>

                {order.fileIds.map(fileId => (
                    <Grid item marginRight={1} xs={10} sm={4} lg={3} xl={2} key={fileId} display={"flex"}
                          justifyContent={"center"}>

                        <Box key={fileId} width={250} height={400} marginBottom={5}>
                            <OrderImgCard key={fileId} onUpload={onUpload} fileId={fileId} onUpload2={onUpload2}/>
                        </Box>

                    </Grid>
                ))}

                <Grid item marginRight={1} xs={10} sm={4} lg={3} xl={2} marginTop={-5}>
                    <Box>
                        {(showNewCard) && <OrderImgCard onUpload={onUpload} onUpload2={onUpload2}/>}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}