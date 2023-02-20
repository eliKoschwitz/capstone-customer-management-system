import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import Order from "../types/order";
import customer from "../types/customer";
import NavBarForDetailOrder from "../components/NavBarForDetailOrder";
import DropDownMenu from "../components/DropDownMenu";
import {ThemeConfig} from "../config/Theme";
import {ToastContainer} from "react-toastify";
import ToastError from "../components/ToastError";

export default function DetailedCustomer() {

    const [order, setOrder] = useState<Order>({
        id: "",
        customerId: "",
        website: "",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        fileIds: [],
        createdBy: ""
    });

    const [customerList, setCustomerList] = useState<customer[]>([]);

    const navigate = useNavigate();

    const objId = useParams<{ id: string }>();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setOrder({...order, [name]: value});
        },
        [order, setOrder]
    );

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/order/" + objId.id);
                setOrder(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [objId.id]);

    // UPDATE A SINGLE CUSTOMER
    const editOrder = useCallback( async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/order/", order);
            navigate("/order");
        } catch (e: any | AxiosError) {
            console.log(AxiosError);
            ToastError(e);
        }
        },[navigate, order]
    )

    const deleteOrder = (async () => {
        try {
            await axios.delete("/api/order/" + objId.id);
            navigate("/order");
        } catch (error) {
            console.error(error);
        }
    })

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

    return (
        <div>
            <NavBarForDetailOrder deleteCustomerOrOrder={deleteOrder}/>

            <Box display="flex" flexDirection="column">
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Box display={"flex"} flexDirection={"column"} component="form" margin={"auto"} marginTop={5}
                         alignItems={"center"} justifyContent={"center"} width={400} onSubmit={editOrder}>
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <EditIcon/>
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Edit Order
                        </Typography>
                        <ThemeConfig>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Website"
                                name="website"
                                onChange={handleChange}
                                value={order.website}
                            />
                        </ThemeConfig>

                        <ThemeConfig>
                            <TextField
                                fullWidth
                                InputLabelProps={{shrink: false}}
                                margin="normal"
                                type="date"
                                name="endTime"
                                onChange={handleChange}
                                value={order.endTime}
                            />
                        </ThemeConfig>

                        <DropDownMenu customerList={customerList}
                                      callbackValue={(value) => {
                                          setOrder({...order, customerId: value})
                                      }}/>
                        <Box marginTop={10}>

                        </Box>

                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                            Edit Order</Button>
                    </Box>
                    <Box margin={"auto"} paddingTop={16}>
                        <ThemeConfig>
                            <TextField
                                fullWidth
                                multiline={true}
                                rows={11}
                                margin="normal"
                                label="Description"
                                name="description"
                                onChange={handleChange}
                                value={order.description}
                            />
                        </ThemeConfig>
                        <Link to={"/order-imgs/" + order.id} style={{textDecoration: 'none'}}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >Show IMGs</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <ToastContainer closeButton={true} position={"bottom-left"} autoClose={2000}/>
        </div>
    );
}