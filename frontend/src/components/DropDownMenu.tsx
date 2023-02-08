import {MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import React, {useState} from "react";
import Customer from "../types/customer";

export default function DropDownMenu({customerList, callbackValue}: {
    customerList: Customer [],
    callbackValue: (value: string) => void
}) {

    const [value, setValue] = useState<string>("");

    const MenuProps = {
        PaperProps: {
            style: {
                width: 250,
            },
        },
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setValue(event.target.value);
        callbackValue(event.target.value);
    };

    return (
        <Select
            fullWidth
            value={value}
            label="CustomerName"
            onChange={handleChangeSelect}
            input={<OutlinedInput label="CustomerName" color={"info"}/>}
            MenuProps={MenuProps}
        >
            {customerList.map(customer => (
                <MenuItem key={customer.id}
                    value={customer.firstName + " " + customer.lastName}>
                    {customer.firstName + " " + customer.lastName}
                </MenuItem>
            ))}
        </Select>
    )
}