import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { db } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";

import { Link } from "react-router-dom";


function AgregarReserva({ isEditing, reservaParaEditar, onAgregarReserva, onEditarReserva }) {
    const [reserva, setReserva] = useState({
        nombre: "",
        fecha: "",
        turno: "",

        cantidad: "",
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAgregarReserva = async () => {
        // Valida que los campos requeridos no estén vacíos
        if (!reserva.nombre || !reserva.fecha || !reserva.turno || !reserva.cantidad) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Crea un objeto con los datos de la reserva
        const nuevaReserva = {
            nombre: reserva.nombre,
            fecha: reserva.fecha,
            turno: reserva.turno,

            cantidad: reserva.cantidad,
        };

        // Agrega la reserva a Firestore
        const reservaRef = collection(db, "reservas");

        try {
            const docRef = await addDoc(reservaRef, nuevaReserva);
            console.log("Reserva agregada con ID: ", docRef.id);

            // Limpia el formulario
            setReserva({
                nombre: "",
                fecha: "",
                turno: "",

                cantidad: "",
            });
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al agregar reserva: ", error);
        }
    };

    useEffect(() => {
        if (isEditing && reservaParaEditar) {
            setReserva(reservaParaEditar); // Cargar los datos de la reserva para editar
        }
    }, [isEditing, reservaParaEditar]);


    const handleGuardarReserva = async () => {
        // Valida que los campos requeridos no estén vacíos
        if (!reserva.nombre || !reserva.fecha || !reserva.turno || !reserva.cantidad) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (isEditing) {
            // Si estamos editando, llama a la función de editar
            onEditarReserva(reserva);
        } else {
            // Si no estamos editando, llama a la función de agregar
            onAgregarReserva(reserva);
        }

        // Limpia el formulario
        setReserva({
            nombre: "",
            fecha: "",
            turno: "",

            cantidad: "",
        });
    };
    return (
        <div>
            <h2>Formulario de Reserva</h2>
            <input
                type="text"
                placeholder="Nombre del Cliente"
                value={reserva.nombre}
                onChange={(e) => setReserva({ ...reserva, nombre: e.target.value })}
            />
            <input
                type="date"
                placeholder="Fecha de Reserva"
                value={reserva.fecha}
                onChange={(e) => setReserva({ ...reserva, fecha: e.target.value })}
            />
            <input
                type="text"
                placeholder="Turno"
                value={reserva.turno}
                onChange={(e) => setReserva({ ...reserva, turno: e.target.value })}
            />

            <input
                type="number"
                placeholder="Cantidad de Personas"
                value={reserva.cantidad}
                onChange={(e) => setReserva({ ...reserva, cantidad: e.target.value })}
            />
            <Button variant="contained" onClick={handleAgregarReserva}>
                Guardar Reserva
            </Button>
            <Button variant="contained" component={Link} to="/home">
                Volver
            </Button>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
                message="Reserva guardada exitosamente."
            />

        </div>
    );
}

export { AgregarReserva };
