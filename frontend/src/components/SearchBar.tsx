import React from "react";
import {Container, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

export default function SearchBar({getInput}: {
    getInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {

    return (
        <>
            <div className="spacing-top">
            </div>

            <Container maxWidth={"md"} >
                <Typography>
                    <Box className={"position-for-search"} marginLeft={8}>
                        <SearchIcon sx={{
                            marginRight: 0.5,
                            marginLeft: 0.5
                        }}/>
                        <div className="searchbar">
                            <input id="search" onChange={(event: React.ChangeEvent<HTMLInputElement>) => getInput(event)}/>
                        </div>
                    </Box>
                </Typography>
            </Container>

            <div className="spacing-under">
            </div>
        </>
    )

}