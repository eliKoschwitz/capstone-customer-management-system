import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Auth (
    {
        children,
        shouldRedirect = true,
    }: {
        children: React.ReactNode
        shouldRedirect?: boolean,
    }
) {
    const location = useLocation();

    const {user, axiosWasPerformed} = useAuth();

    const navigate = (
        <Navigate
            to={axiosWasPerformed && !user
                ? `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`
                : "/"}
        />
    );
    if (!axiosWasPerformed) {
        return null
    }
    if (user){
        return <> {children} </>
    }

    return (
        <>
            {shouldRedirect ? navigate : null}
        </>
    )
}