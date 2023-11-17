import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.config";
import { getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import logoIMG from '../img/nonita.png';
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
        <div className="form">
            <div className="buttonCerrar">
                <Button variant="contained" component={Link} to="/home">
                    Volver
                </Button>
            </div>
            <div className="logoNonita">
                <div className="logo">
                    <h1>
                        <img
                            src={logoIMG}
                            alt="nonita"
                            style={{ maxWidth: "300px" }}
                        />
                    </h1>
                </div>
            </div>
            <h2>Reservas del Día</h2>
            {confirmation && (
                <div className="confirmacion">
                    <p>¿Estás seguro de eliminar esta reserva?</p>
                    <div className="button">
                        <button className="edit" onClick={confirmBorrarReserva}>Sí</button>
                        <button className="borrar" onClick={() => setConfirmation(null)}>No</button>
                    </div>
                </div>
            )}
            {loading ? (
                <p className="parrafo">Cargando reservas...</p>
            ) : reservas.length === 0 ? (
                <p className="parrafo">No hay reservas para hoy.</p>
            ) : (
                <ul>
                    {reservas.map((reserva, index) => (
                        <li key={index}>
                            Nombre: {reserva.nombre}<br />
                            Fecha: {reserva.fecha}<br />
                            Turno: {reserva.turno}<br />

                            <button onClick={() => handleBorrarReserva(reserva.id)} className="borrar">Borrar</button>

                        </li>
                    ))}
                </ul>
            )}


        </div>
    );
}

export { ReservasDelDia };


