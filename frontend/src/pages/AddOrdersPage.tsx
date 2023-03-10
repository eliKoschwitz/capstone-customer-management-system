import React, {FormEvent, useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Order from "../types/order";
import customer from "../types/customer";
import DropDownMenu from "../components/DropDownMenu";
import {ThemeConfig} from "../config/Theme";
import NavBarForAddOrder from "../components/NavBarForAddOrder";
import {ToastContainer} from "react-toastify";
import ToastError from "../components/ToastError";

export default function AddOrdersPage() {

    const [order, setOrder] = useState<Order>({
        customerId: "",
        website: "",
        startTime: new Date(),
        endTime: new Date(),
        description: "",
        fileIds: [],
        createdBy: ""
    });

    const [customerList, setCustomerList] = useState<customer[]>([]);

    // GET ALL CUSTOMERS
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

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setOrder({...order, [name]: value});
        },
        [order, setOrder]
    );

    const saveOrder = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                await axios.post("/api/order", order);
                navigate("/order");
            } catch (e: any | AxiosError) {
                console.log(AxiosError);
                ToastError(e);
            }
        }, [order, navigate]
    );

    return (
        <div className="add-customers">
            <NavBarForAddOrder/>
            <Box display="flex" flexDirection="column">
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"} alignItems={"center"}>
                    <Box display={"flex"} flexDirection={"column"} component="form" alignItems={"center"}
                         justifyContent={"center"} onSubmit={saveOrder} width={400} margin={"auto"} paddingTop={5}>

                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <AddIcon/>
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Add Order
                        </Typography>
                        <ThemeConfig>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Website"
                                name="website"
                                onChange={handleChange}
                            />
                        </ThemeConfig>
                        <ThemeConfig>
                            <TextField
                                InputLabelProps={{shrink: false}}
                                fullWidth
                                margin="normal"
                                name="endTime"
                                type="date"
                                onChange={handleChange}
                            />
                        </ThemeConfig>
                        <DropDownMenu customerList={customerList}
                                      callbackValue={(value) => {
                                          setOrder({...order, customerId: value})
                                      }}/>
                        <Box marginTop={10}>

                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >Add Order</Button>
                    </Box>

                    <Box margin={"auto"} paddingTop={9} width={400}>
                        <ThemeConfig>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                name="description"
                                onChange={handleChange}
                                multiline={true}
                                rows={12}
                            />
                        </ThemeConfig>
                    </Box>
                </Box>
            </Box>
            <ToastContainer closeButton={true} position={"bottom-left"} autoClose={2000}/>
        </div>
    );
}