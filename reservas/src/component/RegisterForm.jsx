/*import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";

function RegisterForm() {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        //auth.register(emailRegister, passwordRegister);

        try {
            auth.register(emailRegister, passwordRegister);
            // Si el registro es exitoso, actualiza el estado del mensaje
            setRegistrationMessage("¡Registro exitoso!");
            // Limpia los campos después de un registro exitoso
            setEmailRegister("");
            setPasswordRegister("");
        } catch (error) {
            // Maneja los errores de registro aquí si es necesario
            console.error("Error en el registro:", error.message);

            setRegistrationMessage(`Error: ${error.message}`);
        }

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
                {auth.registrationSuccess && <p>Registro exitoso. ¡Bienvenido!</p>}
            </div>
        </form>
    );
}

export { RegisterForm };
*/
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";

function RegisterForm() {
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [registrationMessage, setRegistrationMessage] = useState("");
    const auth = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Intentar iniciar sesión con el correo electrónico proporcionado
            await auth.login(emailRegister, passwordRegister);

            // Si la función anterior no lanza un error, entonces el usuario ya está registrado
            setRegistrationMessage("¡Este usuario ya está registrado!");
        } catch (error) {
            // Si el error es "auth/user-not-found", entonces el usuario no está registrado y se puede proceder con el registro
            if (error.code === "auth/user-not-found") {
                try {
                    // Intentar registrar un nuevo usuario
                    await auth.register(emailRegister, passwordRegister);

                    // Si el registro es exitoso, actualizar el estado del mensaje
                    setRegistrationMessage("¡Registro exitoso!");
                    // Limpiar los campos después de un registro exitoso
                    setEmailRegister("");
                    setPasswordRegister("");
                } catch (error) {
                    // Manejar cualquier otro error durante el registro
                    console.error("Error en el registro:", error.message);
                    setRegistrationMessage(`Error: ${error.message}`);
                }
            } else {
                // Otro tipo de error, mostrar el mensaje de error
                console.error("Error al verificar el usuario:", error.message);
                setRegistrationMessage(`Error: ${error.message}`);
            }
        }
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
                <div className="mensaje">
                    {registrationMessage && <p>  {registrationMessage}</p>}
                </div>
            </div>
        </form>
    );
}

export { RegisterForm };

