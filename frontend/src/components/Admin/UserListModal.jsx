import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUsers } from "../../../Client/Services/userServices";
import { Button } from "@material-tailwind/react";

const UserListModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full modal-container">
        <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-2 border-b border-gray-300">Email</th>
              <th className="py-2 border-b border-gray-300">Nombre</th>
              <th className="py-2 border-b border-gray-300">Apellido</th>
              <th className="py-2 border-b border-gray-300">Dirección</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center border-b border-gray-300">
                <td className="py-2 border-r border-gray-300">{user.email}</td>
                <td className="py-2 border-r border-gray-300">{user.nombre}</td>
                <td className="py-2 border-r border-gray-300">
                  {user.apellido}
                </td>
                <td className="py-2">
                  {user.direcciones.map((dir, idx) => (
                    <p key={idx}>{dir.direccion}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <Button size="sm" color="red" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

UserListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserListModal;
