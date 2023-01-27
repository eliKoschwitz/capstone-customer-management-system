import React, {FormEvent, useCallback, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export default function SignUpPage () {
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

    const navigate = useNavigate();

    const location = useLocation();

    const signUp = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            setErrors([]);

            try {
                await axios.post("/api/app-users", credentials);
                navigate("/login" + location.search);
            } catch (e) {
                setErrors((errors) => [
                    ...errors,
                    "Invalid user data"
                ]);
            }
        },
        [credentials, navigate, location]
    );

    return (
        <div className="SignUpPage">
            <h1>Sign Up</h1>

            {errors.length > 0 && (
                <div>
                    {errors.map((error) => <p key={error}>{error}</p>)}
                </div>
            )}

            <form onSubmit={signUp}>
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
                    <button>Sign Up</button>
                </div>
            </form>
        </div>
    );
}