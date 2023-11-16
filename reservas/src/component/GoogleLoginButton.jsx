import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; // Importa el componente Typography
import logoIMG from '../img/google.png';

const GoogleLoginButton = ({ onError }) => {
    const auth = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleGoogleLogin = async (e) => {
        e.preventDefault()
        auth.loginWithGoogle();

        try {
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            onError("Error al iniciar sesión con Google. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div className="button">
            {isAuthenticated ? (
                <Link to={`/home`}>
                    <Button variant="contained">Ingresa</Button>
                </Link>
            ) : (
                <Button
                    variant="contained"
                    onClick={(e) => handleGoogleLogin(e)}
                    style={{
                        background: "white",
                        border: "1px solid #ccc",
                        padding: "6px 16px",
                        display: "flex",
                    }}>

                    <Typography style={{
                        color: "black",
                        marginRight: "10px"
                    }}>Ingresá con Google</Typography>
                    <img
                        className="logo"
                        src={logoIMG}
                        alt="Google Logo"
                    />
                </Button>
            )}
        </div>
    );
};

export { GoogleLoginButton };




