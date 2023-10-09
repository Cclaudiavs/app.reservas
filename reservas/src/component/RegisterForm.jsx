import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";

function RegisterForm() {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(emailRegister, passwordRegister);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p>¿No tienes cuenta?</p>
            <div className="form-container">
                <h3 className="titulo">Regístrate aquí</h3>
                <div className="input-group">
                    <input
                        className="input"
                        type="email"
                        placeholder="Correo electrónico"
                        value={emailRegister}
                        onChange={(e) => setEmailRegister(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        value={passwordRegister}
                        onChange={(e) => setPasswordRegister(e.target.value)}
                    />
                </div>
                <Button variant="contained" type="submit">
                    Registrarse
                </Button>
            </div>
        </form>
    );
}

export { RegisterForm };
