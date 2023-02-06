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
import OrderImgCardTestZwei from "../tests/OrderImgCardTestZwei";
import CustomFile from "../types/file";

export default function OrderImgs() {

    const {id} = useParams<{ id: string }>();

    const [showNewCard, setShowNewCard] = useState<boolean>(false);

    const [order, setOrder] = useState<Order>({
        id: "",
        customerId: "",
        website: "",
        startTime: "",
        endTime: "",
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

        (async () => {
            const response = await axios.post("/api/order/", order);
            setOrder(response.data);
        })()
    };

    const onUpload2 = () => {
        setShowNewCard(false);
        console.log("hallo");
    }

    const boxSx = {
        "&:hover": {
            border: "1px solid black",
            color: "gray",
            backgroundColor: "gray",
            width: "200%",
            borderRadius: "50"
        }
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

            <Grid padding={12} container spacing={8}>
                {order.fileIds.map(fileId => (
                    <Grid xs={3} paddingBottom={5}>
                        <Box marginRight={4} sx={boxSx}>
                            <OrderImgCardTestZwei onUpload={onUpload} fileId={fileId} onUpload2={onUpload2}/>
                        </Box>
                    </Grid>
                ))}
                <Grid xs={3} paddingBottom={5}>
                    <Box marginRight={4}>
                        {(showNewCard) && <OrderImgCardTestZwei onUpload={onUpload} onUpload2={onUpload2}/>}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}