import {useState} from 'react';
import useGet from "../../custumHooks/useGet";
import DataTable from "react-data-table-component";
import CreateDepartmentModal from "./CreateDepartmentModal";
// import React from "@types/react";


const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable:true
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable:true
    },
    {
        name: 'Manager ID',
        selector: row => row.manager_id,
        sortable:true
    },
    {
        name: 'Manager Started At',
        selector: row => row.manager_start_at,
        sortable:true
    },
    {
        key: "action",
        text: "Action",
        name: "Action",
        className: "action",
        width: 100,
        align: "left",
        sortable: false,
        cell: (record) => {
            return (
                <>
                    <div className="d-flex justify-content-between w-50">
                        <i
                            className="far fa-edit fa-lg"
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => console.log(record.id)}
                        ></i>
                        <i
                            className="fa-regular fa-trash-can fa-lg"
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => console.log(record.id)}
                        ></i>

                        <i
                            className="fa-solid fa-circle-info fa-lg"
                            style={{ cursor: "pointer", color: "green" }}
                            onClick={() => console.log(record.id)}
                        ></i>
                    </div>
                </>
            );
        },
    }
];

const customStyles = {
    columns: {
        style: {
            width: "fit-content",
        },
    },
    rows: {
        style: {
            minHeight: "50px", // override the row height

        },
    },
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",

        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",

        },
    },
};

const ListAllDepartments = () => {
    const { data, isPending, error } = useGet("GET","http://127.0.0.1:8000/api/departments");
    const [txt, setTxt] = useState("");

    function search(rows) {
        return rows.filter((row) =>
            row.name.toLowerCase().includes(txt.toLowerCase())
        );
    }

    return (
        <div className="row">
            {isPending && (
                <>
                    <div className={'d-flex justify-content-center'}>
                    <div className="alert alert-primary align-self-center" role="alert">
            <span
                className="spinner-border text-info spinner-border-m me-2"
                role="status"
            >
              <span className="visually-hidden text-center">Loading...</span>
            </span>
                        <span className={'fs-5'}>Getting Data pleas wait!</span>
                    </div>
                    </div>
                </>
            )}
            {error && (
                <>
                    <div className="alert alert-danger" role="alert">
                        we'r sry , {error} ..pls try again later!
                    </div>
                </>
            )}
            {data && (
                <>
                <div className="row ">
                    <div className="offset-6 col-3 input-group-sm ">
                        <input
                            className="form-control "
                            type="text"
                            placeholder="type to search"
                            value={txt}
                            onChange={(e) => setTxt(e.target.value)}
                        />
                    </div>
                    <div className=" col-2 me-1 ">
                        <button className="btn btn-sm btn-success " data-bs-toggle="modal" data-bs-target="#modal">Add new department</button>
                    </div>
                    <CreateDepartmentModal/>
                </div>
                    <DataTable
                        columns={columns}
                        data={search(data)}
                        pagination
                        customStyles={customStyles}
                    />
                </>
            )}
        </div>
    );
};

export default ListAllDepartments