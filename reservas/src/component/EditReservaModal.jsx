/*import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

Modal.setAppElement("#root");

function EditReservaModal({ isOpen, onRequestClose, selectedReserva }) {
    // Asegúrate de inicializar selectedReserva si es nulo

    const [editedReserva, setEditedReserva] = useState(selectedReserva || {
        id: "",
        nombre: "",
        fecha: "",
        turno: "",
        mesa: "",
        cantidad: 0,
    });
    const handleSave = async () => {
        console.log("editedReserva:", editedReserva);

        if (editedReserva && editedReserva.id) {
            console.log("Reserva a actualizar:", editedReserva);
            try {
                const reservaDocRef = doc(db, "reservas", editedReserva.id);
                await updateDoc(reservaDocRef, {
                    nombre: editedReserva.nombre,
                    fecha: editedReserva.fecha,
                    turno: editedReserva.turno,
                    mesa: editedReserva.mesa,
                    cantidad: editedReserva.cantidad,
                });
                onRequestClose();
            } catch (error) {
                console.error("Error al actualizar la reserva: ", error);
            }
        } else {
            console.error("Error: editedReserva.id es nulo o indefinido");
        }
    };


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar Reserva"
        >
            <div>
                <h2>Editar Reserva</h2>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={editedReserva.nombre}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, nombre: e.target.value })
                    }
                />
                <label>Fecha:</label>
                <input
                    type="date"
                    value={editedReserva.fecha}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, fecha: e.target.value })
                    }
                />
                <label>Turno:</label>
                <input
                    type="text"
                    value={editedReserva.turno}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, turno: e.target.value })
                    }
                />
                <label>Mesa:</label>
                <input
                    type="text"
                    value={editedReserva.mesa}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, mesa: e.target.value })
                    }
                />
                <label>Cantidad de Personas:</label>
                <input
                    type="number"
                    value={editedReserva.cantidad}
                    onChange={(e) =>
                        setEditedReserva({
                            ...editedReserva,
                            cantidad: parseInt(e.target.value, 10),
                        })
                    }
                />
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onRequestClose}>Cerrar</button>
            </div>

        </Modal>
    );
}

export { EditReservaModal };*/
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

Modal.setAppElement("#root");

function EditReservaModal({ isOpen, onRequestClose, selectedReserva }) {
    const [editedReserva, setEditedReserva] = useState({
        id: "", // Asegúrate de tener un valor inicial válido
        nombre: "",
        fecha: "",
        turno: "",
        mesa: "",
        cantidad: 0,
    });

    useEffect(() => {
        if (selectedReserva) {
            // Si hay una reserva seleccionada, actualiza el estado con sus valores
            setEditedReserva({
                id: selectedReserva.id || "", // Asegúrate de que id sea una cadena vacía si es nulo
                nombre: selectedReserva.nombre || "",
                fecha: selectedReserva.fecha || "",
                turno: selectedReserva.turno || "",
                mesa: selectedReserva.mesa || "",
                cantidad: selectedReserva.cantidad || 0,
            });
        }
    }, [selectedReserva]);

    const handleSave = async () => {
        console.log("editedReserva:", editedReserva);

        if (editedReserva && editedReserva.id) {
            console.log("Reserva a actualizar:", editedReserva);
            try {
                const reservaDocRef = doc(db, "reservas", editedReserva.id);
                await updateDoc(reservaDocRef, {
                    nombre: editedReserva.nombre,
                    fecha: editedReserva.fecha,
                    turno: editedReserva.turno,
                    mesa: editedReserva.mesa,
                    cantidad: editedReserva.cantidad,
                });
                onRequestClose();
            } catch (error) {
                console.error("Error al actualizar la reserva: ", error);
            }
        } else {
            console.error("Error: editedReserva.id es nulo o indefinido");
        }
    };

    return (

        <Modal

            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar Reserva"
        >
            <div className="form-container">

                <h3>Editar Reserva</h3>
                <label>Nombre:</label>
                <input className="input"
                    type="text"
                    value={editedReserva.nombre}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, nombre: e.target.value })
                    }
                />
                <label>Fecha:</label>
                <input className="input"
                    type="date"
                    value={editedReserva.fecha}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, fecha: e.target.value })
                    }
                />
                <label>Turno:</label>
                <input className="input"
                    type="text"
                    value={editedReserva.turno}
                    onChange={(e) =>
                        setEditedReserva({ ...editedReserva, turno: e.target.value })
                    }

                />
                <label>Cantidad de Personas:</label>
                <input className="input"
                    type="number"
                    value={editedReserva.cantidad}
                    onChange={(e) =>
                        setEditedReserva({
                            ...editedReserva,
                            cantidad: parseInt(e.target.value, 10),
                        })
                    }
                />
                <button className="button" onClick={handleSave}>Guardar</button>
                <button className="button" onClick={onRequestClose}>Cerrar</button>
            </div>
        </Modal >
    );
}

export { EditReservaModal };

