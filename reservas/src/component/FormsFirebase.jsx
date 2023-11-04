import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useAuth } from "../context/AuthContext";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { useNavigate } from 'react-router-dom';




function FormsFirebase() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);
    // const [error, setError] = useState(null);


    const handleLogin = async (email, password) => {
        try {
            await auth.login(email, password);
            // Redirige a la página de inicio después de un inicio de sesión exitoso
            navigate("/home");
        } catch (error) {
            // Maneja el error y establece el mensaje de error para mostrar al usuario
            if (error.code === "auth/user-not-found") {
                setLoginError("Usuario no registrado. Regístrate o verifica tus credenciales.");
            } else if (error.code === "auth/invalid-email") {
                setLoginError("Correo electrónico inválido. Ingresa un correo válido.");
            } else {
                setLoginError("Error de inicio de sesión. Inténtalo nuevamente.");
            }
        }
    };

    const handleGoogleLoginSuccess = () => {
        // Redirige a la página de inicio después de un inicio de sesión exitoso con Google
        history.push("/home");
    };

    const handleGoogleLoginError = (error) => {
        // Maneja el error, si es necesario
        console.log(error);
    };


    return (
        <div className="app">

            <LoginForm handleLogin={handleLogin} loginError={loginError} />
            <RegisterForm />
            <GoogleLoginButton
                onGoogleLoginSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError} />

        </div>
    );
}

export default FormsFirebase;
