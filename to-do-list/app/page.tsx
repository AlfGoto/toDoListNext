'use client'

import { useState } from "react";

const status: Array<string> = ['To do', 'In progress', 'Done']
const users: Array<string> = ['Alfred', 'Romain', 'Arnaud', 'Marco']

export default function Home() {
    return (
        <section>
            HELLO
            <Table />
        </section>
    );
}

const Table = () => {
    const [rows, setRows] = useState([])

    return (
        <table>
            <thead>
                <th>Name</th>
                <th>Status</th>
                <th>User</th>
                <th>-</th>
            </thead>
            <tbody>
                <Row
                    name='Tirer la chasse'
                    status={status[1]}
                    user={users[0]}
                />

                <AddRowRow setRows={setRows} rows={rows}/>

            </tbody>
        </table>
    )
}

interface AddRowRowArg{
    setRows: Function,
    rows: Array<Object>
}
const AddRowRow = (props : AddRowRowArg) => {

    return (
        <tr>
            <td><input type="text" form='ADDROW' /></td>
            <td></td>
            <td></td>
        </tr>
    )
}


interface RowArg {
    status: string,
    user: string,
    name: string
}
const Row = (props: RowArg) => {
    const del = ()=>{
        console.log('delete ' + props.name)
    }
    return (
        <tr>
            <td>{props.name}</td>
            <td><Select array={status} value={props.status} /></td>
            <td><Select array={users} value={props.user} /></td>
            <td onClick={del}>Delete</td>
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
            {props.array.map(e =>
                <option value={e}>{e}</option>
            )}
        </select>
    )
}