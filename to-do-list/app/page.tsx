'use client'

import { useState } from "react";

const status: Array<string> = ['To do', 'In progress', 'Done']
const users: Array<string> = ['Alfred', 'Romain', 'Arnaud', 'Marco']

export default function Home() {
    return (
        <section>
            <h1>Table</h1>
            <Table />
        </section>
    );
}

interface RowsInterface {
    name: string,
    status: string,
    user: string
}
const Table = () => {
    const [rows, setRows] = useState<Array<RowsInterface>>([])

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>User</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows.map((e, key) =>
                    <Row
                        key={key}
                        // name={e.name}
                        // status={e.status}
                        row={e}
                        setRows={setRows}
                        rows={rows}
                    />
                )}

                <AddRowRow setRows={setRows} rows={rows} />

            </tbody>
        </table>
    )
}

interface AddRowRowArg {
    setRows: Function,
    rows: Array<Object>
}
const AddRowRow = (props: AddRowRowArg) => {
    const [add, setAdd] = useState({ status: status[0], user: users[0], name: '' })

    function submit() {
        if(add.name == '')return
        props.setRows([...props.rows, add])
        setAdd({ status: status[0], user: users[0], name: '' })
    }
    return (
        <tr id='addRow'>
            <td>
                <input
                    type="text"
                    value={add.name}
                    onChange={(e) => { setAdd({ ...add, name: e.target.value }) }}
                />
            </td>

            <td>
                <select
                    value={add.status}
                    onChange={(e) => { setAdd({ ...add, status: e.target.value }) }}
                >
                    {status.map((e,key) =>
                        <option key={key} value={e}>{e}</option>
                    )}
                </select>
            </td>

            <td>
                <select
                    value={add.user}
                    onChange={(e) => { setAdd({ ...add, user: e.target.value }) }}
                >
                    {users.map((e,key) =>
                        <option key={key} value={e}>{e}</option>
                    )}
                </select>
            </td>

            <td>
                <button onClick={submit}>Add !</button>
            </td>
        </tr>
    )
}


interface RowArg {
    row: RowsInterface,
    setRows: React.Dispatch<React.SetStateAction<RowsInterface[]>>,
    rows: Array<RowsInterface>
}
const Row = (props: RowArg) => {
    const del = () => {
        const updatedRows = props.rows.filter(r => r !== props.row);
        props.setRows(updatedRows);
    }
    return (
        <tr key={props.rows.indexOf(props.row)}>
            <td>{props.row.name}</td>
            <td><Select array={status} value={props.row.status} /></td>
            <td><Select array={users} value={props.row.user} /></td>
            <td><button onClick={del}>Delete</button></td>
        </tr>
    )
}



interface SelectArg {
    array: Array<string>,
    value: string
}
const Select = (props: SelectArg) => {
    const [val, setVal] = useState(props.value)
    return (
        <select
            value={val}
            onChange={(e) => { setVal(e.target.value) }}
        >
            {props.array.map((e,key) =>
                <option key={key} value={e}>{e}</option>
            )}
        </select>
    )
}