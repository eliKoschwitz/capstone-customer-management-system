import {Link} from "react-router-dom";

export default function ErrorPage() {

    return (
        <>
            <h1>Error</h1>
            <h2>Website not found</h2>
            <Link to={"/"}> Homepage </Link>
        </>
    )
}