import { useEffect, useState } from "react";
import instance from "../../helpers/API/api";
import { useAuth } from "../../helpers/API/auth";
import { Table } from "../table/table";
import { AddForm } from "../add/add";

export function TableComponent({ tableName }) {
    const [information, setInformation] = useState();
    const { userName, password } = useAuth();
    const styles = {
        text_name_table: {
            textTransform: "capitalize",
        },
    };

    const request = ({ username, password }) => {
        instance
            .post("/post/table", { username, password })
            .then((response) => {
                setInformation(response.data.result);
            })
            .catch((error) => {
                console.log(error.response.data.messageServer);
            })
            .finally(() => {
                setTimeout(() => {
                    request({ username, password });
                }, 1000);
            });
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            request({ username: userName, password: password });
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [userName, password]);

    return (
        <>
            <h1 style={styles.text_name_table}>{tableName}</h1>
            <AddForm />
            <Table information={information} tableName={tableName} />
        </>
    );
}
