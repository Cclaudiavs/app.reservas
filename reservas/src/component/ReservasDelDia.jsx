/*import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { getDocs, collection, query, where } from "firebase/firestore";

function ReservasDelDia() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerReservasDelDia = async () => {
            try {
                // Define la variable fechaActual antes de usarla en la consulta
                const fechaActual = new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
                const q = query(collection(db, "reservas"), where("fecha", "==", fechaActual));
                const querySnapshot = await getDocs(q);

                const reservasDelDia = [];
                querySnapshot.forEach((doc) => {
                    const reserva = doc.data();
                    reservasDelDia.push(reserva);
                });

                setReservas(reservasDelDia);
            } catch (error) {
                console.error("Error al obtener las reservas del día:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerReservasDelDia();
    }, []);

    return (
        <div>
            <h2>Reservas del Día</h2>
            {loading ? (
                <p>Cargando reservas...</p>
            ) : reservas.length === 0 ? (
                <p>No hay reservas para hoy.</p>
            ) : (
                <ul>
                    {reservas.map((reserva, index) => (
                        <li key={index}>
                            Nombre: {reserva.nombre}<br />
                            Fecha: {reserva.fecha}<br />
                            Turno: {reserva.turno}<br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export { ReservasDelDia };*/
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function ReservasDelDia() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [confirmation, setConfirmation] = useState(null);

    useEffect(() => {
        const obtenerReservasDelDia = async () => {
            try {
                const fechaActual = new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
                const q = query(collection(db, "reservas"), where("fecha", "==", fechaActual));
                const querySnapshot = await getDocs(q);

                const reservasDelDia = [];
                querySnapshot.forEach((doc) => {
                    const reserva = { id: doc.id, ...doc.data() };
                    reservasDelDia.push(reserva);
                });

                setReservas(reservasDelDia);
            } catch (error) {
                console.error("Error al obtener las reservas del día:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerReservasDelDia();
    }, []);

    const handleBorrarReserva = (reservaId) => {
        // Mostrar una confirmación antes de borrar
        setConfirmation(reservaId);
    };

    const confirmBorrarReserva = async () => {
        try {
            // Borra la reserva de Firestore usando su ID
            await deleteDoc(doc(db, "reservas", confirmation));

            // Actualiza la lista de reservas después de borrar
            const nuevasReservas = reservas.filter((reserva) => reserva.id !== confirmation);
            setReservas(nuevasReservas);
        } catch (error) {
            console.error("Error al borrar la reserva:", error);
        } finally {
            setConfirmation(null); // Cerrar la confirmación
        }
    };

    return (
        <div>
            <h2>Reservas del Día</h2>
            {loading ? (
                <p>Cargando reservas...</p>
            ) : reservas.length === 0 ? (
                <p>No hay reservas para hoy.</p>
            ) : (
                <ul>
                    {reservas.map((reserva, index) => (
                        <li key={index}>
                            Nombre: {reserva.nombre}<br />
                            Fecha: {reserva.fecha}<br />
                            Turno: {reserva.turno}<br />
                            <button onClick={() => handleBorrarReserva(reserva.id)}>Borrar</button>
                        </li>
                    ))}
                </ul>
            )}
            <Button variant="contained" component={Link} to="/home">
                Volver
            </Button>
            {confirmation && (
                <div>
                    <p>¿Estás seguro de eliminar esta reserva?</p>
                    <button onClick={confirmBorrarReserva}>Sí</button>
                    <button onClick={() => setConfirmation(null)}>No</button>
                </div>
            )}
        </div>
    );
}

export { ReservasDelDia };


