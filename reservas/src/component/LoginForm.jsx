import React, { useState } from "react";
import Button from "@mui/material/Button";

function LoginForm({ handleLogin, loginError }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleLogin(email, password);
        } catch (error) {
            // El manejo del error ahora se realiza en el componente padre FormsFirebase
        }

    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-container">
                <h3 className="titulo">Ingresa con tu cuenta</h3>
                <div className="input-group">
                    <input
                        className="input"
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <Button variant="contained" type="submit">Ingresar</Button>

            </div>
        </form>
    );
}

export { LoginForm };
