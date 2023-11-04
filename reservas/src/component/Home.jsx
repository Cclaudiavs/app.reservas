import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BuscarReserva } from "./BuscarReserva";
import { EditReservaModal } from "./EditReservaModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";



function Home() {
    const [filtro, setFiltro] = useState("nombre");
    const [showSearchFilter, setShowSearchFilter] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false);
    const [reservaParaEditar, setReservaParaEditar] = useState("");



    const [editedReserva, setEditedReserva] = useState(
        selectedReserva
            ? {
                id: selectedReserva.id,
                nombre: selectedReserva.nombre,
                fecha: selectedReserva.fecha,
                turno: selectedReserva.turno,
                mesa: selectedReserva.mesa,
                cantidad: selectedReserva.cantidad,
            }
            : {
                id: "", // Asegúrate de tener un valor inicial válido
                nombre: "",
                fecha: "",
                turno: "",
                mesa: "",
                cantidad: 0,
            }
    );


    // Función para abrir el modal de agregar o editar
    const handleAbrirEditarModal = (reserva) => {
        setIsModalOpen(true);
        setReservaParaEditar(reserva);
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

    // Función para agregar una nueva reserva
    const handleAgregarReserva = async (nuevaReserva) => {
        try {
            // Agregar la nueva reserva a Firestore
            const reservasCollection = collection(db, "reservas");
            const docRef = await addDoc(reservasCollection, nuevaReserva);

            const nuevaReservaId = docRef.id; // Obtén el ID de la nueva reserva

            // Realiza otras acciones necesarias, por ejemplo, redirigir a la página de detalles de la reserva
            history.push(`/reserva/${nuevaReservaId}`);

            setIsAgregarModalOpen(false); // Cierra el modal de agregar reserva
        } catch (error) {
            console.error("Error al agregar la reserva: ", error);
        }
    };


    // Función para editar una reserva existente
    const handleEditarReserva = async (reservaEditada) => {
        try {
            // Actualiza la reserva en Firestore usando su ID (reservaEditada.id)
            const reservaRef = doc(db, "reservas", reservaEditada.id);
            await updateDoc(reservaRef, {
                nombre: reservaEditada.nombre,
                fecha: reservaEditada.fecha,
                turno: reservaEditada.turno,
                mesa: reservaEditada.mesa,
                cantidad: reservaEditada.cantidad,
            });

            // Realiza otras acciones necesarias, como redirigir a la página de detalles de la reserva
            history.push(`/reserva/${reservaEditada.id}`);

            setIsModalOpen(false); // Cierra el modal de edición de reserva
        } catch (error) {
            console.error("Error al editar la reserva: ", error);
        }
    };


    const auth = useAuth();
    const navigate = useNavigate();

    const handleBuscarReserva = () => {
        setShowSearchFilter(!showSearchFilter);
    };

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const handleLogout = async () => {
        try {
            await auth.logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Título</h1>
            <div className="logout-button">
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <Button variant="contained" onClick={handleAgregarReserva} component={Link} to="/agregar-reserva">
                Añadir Reserva
            </Button>
            <Button variant="contained" onClick={handleBuscarReserva}>
                Buscar Reserva
            </Button>

            {showSearchFilter && (
                <BuscarReserva
                    openModal={setIsModalOpen}
                    selectReserva={(reserva) => setSelectedReserva(reserva)}
                />
            )}

            <EditReservaModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                selectedReserva={selectedReserva}
                isEditing={!!reservaParaEditar}
                editedReserva={editedReserva}
                onEditarReserva={handleEditarReserva}
            />
        </div>
    );
}

export default Home;