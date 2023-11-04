import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { EditReservaModal } from "./EditReservaModal";




function BuscarReserva({ openModal, selectReserva, history }) {
    const [filtro, setFiltro] = useState("nombre");
    const [resultados, setResultados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Asegúrate de que isModalOpen esté definido aquí
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [editedReserva, setEditedReserva] = useState({
        id: "", // Asegúrate de tener un valor inicial válido
        nombre: "",
        fecha: "",
        turno: "",
        mesa: "",
        cantidad: 0,
    });


    // Función para abrir el modal de edición
    const openEditModal = (reserva) => {
        if (reserva) {
            setSelectedReserva(reserva);
            setIsModalOpen(true);

        } else {
            console.error("Error: la reserva seleccionada es nula o indefinida");
        }
        setIsModalOpen(true);
        // Configura el estado de editedReserva con los valores de la reserva
        setEditedReserva({
            id: reserva.id,
            nombre: reserva.nombre,
            fecha: reserva.fecha,
            turno: reserva.turno,
            mesa: reserva.mesa,
            cantidad: reserva.cantidad,
        });
    };

    // Función para cerrar el modal
    const closeEditModal = () => {
        setSelectedReserva(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const buscarReservas = async () => {
            try {
                let reservasRef = collection(db, "reservas");
                let filtroConsulta;

                if (busqueda) {
                    if (filtro === "nombre") {
                        filtroConsulta = query(reservasRef, where("nombre", ">=", busqueda));
                    } else if (filtro === "dia") {
                        filtroConsulta = query(reservasRef, where("dia", ">=", busqueda));
                    } else if (filtro === "fecha") {
                        filtroConsulta = query(reservasRef, where("fecha", ">=", busqueda));
                    }

                    const consultaSnapshot = await getDocs(filtroConsulta);
                    const reservas = [];

                    consultaSnapshot.forEach((doc) => {
                        reservas.push({ id: doc.id, ...doc.data() });
                    });

                    setResultados(reservas);
                } else {
                    setResultados([]); // Borra los resultados si no se ingresa ninguna búsqueda
                }
            } catch (error) {
                console.error("Error al buscar reservas: ", error);
            }
        };


        buscarReservas();
    }, [filtro, busqueda]);

    const handleEditReserva = (reserva) => {
        // Redirige a la página de edición con el ID de la reserva, por ejemplo:
        history.push(`/editar-reserva/${reserva.id}`);
    };

    const handleDeleteReserva = async (reserva) => {
        if (window.confirm(`¿Estás seguro de que deseas borrar la reserva de ${reserva.nombre}?`)) {
            try {
                const reservaRef = doc(db, "reservas", reserva.id);
                await deleteDoc(reservaRef);
                // Actualiza la lista de reservas después de borrar
                setResultados(resultados.filter((r) => r.id !== reserva.id));
            } catch (error) {
                console.error("Error al borrar la reserva: ", error);
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div>
                {resultados.map((reserva) => (
                    <div key={reserva.id}>
                        <p>Nombre: {reserva.nombre}</p>
                        <p>Turno: {reserva.turno}</p>
                        <p>Fecha: {reserva.fecha}</p>
                        <button onClick={() => openEditModal(reserva)}>Editar</button>

                        <button onClick={() => handleDeleteReserva(reserva)}>Borrar</button>
                    </div>
                ))}
                <EditReservaModal
                    isOpen={isModalOpen}
                    onRequestClose={closeEditModal}
                    selectedReserva={selectedReserva}
                    handleEdit={handleEditReserva}

                />
            </div>
        </div>
    );
}

export { BuscarReserva };
