import React, {useState, useContext,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logedIn, setLogedIn] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Error loading user from local storage:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (user) => {
        setUser(user);
        setLogedIn(true);
    };

    const logout = () => {
        setUser(null);
        setLogedIn(false);
    };

    return (
        <LoginContext.Provider value={{ user, login, logout, loading, logedIn }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContext;