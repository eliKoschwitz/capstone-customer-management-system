import React, {FormEvent, useCallback, useMemo, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import axios from "axios";

export default function LoginPage () {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = event.target;
            setCredentials({...credentials, [name]: value});
        },
        [credentials, setCredentials]
    );

    const [searchParams] = useSearchParams();
    const redirect = useMemo(
        () => searchParams.get("redirect") || "/",
        [searchParams]
    );
    const navigate = useNavigate();

    const location = useLocation();

    const login = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/app-users/login", null, {
                    headers: {
                        "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
                    }
                });

                navigate(redirect);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid username or password"
                ]);
            }
        },
        [credentials, navigate, redirect]
    );

    return (
        <div className="LoginPage">
            <h1>Login</h1>

            {errors.length > 0 && (
                <div>
                    {errors.map((error) => <p key={error}>{error}</p>)}
                </div>
            )}

            <form onSubmit={login}>
                <div>
                    <input
                        placeholder={"username"}
                        value={credentials.username}
                        name={"username"}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder={"password"}
                        type={"password"}
                        name={"password"}
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <button>Login</button> or <Link to={"/signup" + location.search}>sign up here</Link>
                </div>
            </form>
        </div>
    );
}