import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element;
};


const theme = createTheme({
    components: {
        MuiCard: {
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "0.5em",
                },
            },
        },
    },
});

export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};