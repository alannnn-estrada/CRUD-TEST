import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../helpers/API/auth";
import instance from "../../helpers/API/api";
import { useNavigate } from "react-router-dom";

export function DeleteButton({ id, itemName, tableName }) {
    const { userName, password } = useAuth();
    const navigate = useNavigate();
    const handleDelete = () => {
        const confirmed = window.confirm(`Está seguro de eliminar el producto ${itemName}?`);
        if (confirmed) {
            instance
                .post("/post/deleteProduct", { username: userName, password: password, id: id })
                .then((response) => {
                    alert(response.data.message);
                    navigate(`/dashboard?table=${tableName}`);
                })
                .catch((error) => {
                    console.log(error.response.data.messageServer);
                });
            console.log(`Delete ${itemName} with id ${id}`);
        }
    }
    return (
        <FaTrash onClick={handleDelete} color="#d62828" />
    )
}