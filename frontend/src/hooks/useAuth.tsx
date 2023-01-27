import {useEffect, useState} from "react";
import axios from "axios";

export default function useAuth () {
    const [user, setUser] = useState<{username: string, role: string}|null>(null);
    const [axiosWasPerformed, setAxiosWasPerformed] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const user = await axios.get("/api/app-users/me");
                setUser(user.data);
            } catch (e) {
                console.error("You are not logged in!", e);
            } finally {
                setAxiosWasPerformed(true);
            }
        })();
    }, []);

    return {
        user,
        axiosWasPerformed
    };
}