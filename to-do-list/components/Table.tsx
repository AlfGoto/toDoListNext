import { useState } from "react"
import status from "../vars/status"
import { createRow, deleteRowWithId, updateNameWithId } from './actions'
import Select from './Select'
import SelectUsers from "./SelectUsers"


interface TableArg {
    users: Array<User>,
    rows: Array<RowsInterface>,
    // setRows: React.Dispatch<React.SetStateAction<RowsInterface[]>>,
    setRows: Function,
    id: number,
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
    id?: number
}
interface User {
    name: string,
    id: number
}
const Table = (props: TableArg) => {
    // const [rows, setRows] = useState<Array<RowsInterface>>([])

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
                {props.rows.map((e, key) =>
                    <Row
                        key={key}
                        row={e}
                        setRows={e => { props.setRows(e) }}
                        rows={props.rows}
                        users={props.users}
                    />
                )}

                <AddRowRow setRows={(e: any) => { props.setRows(e) }} rows={props.rows} users={props.users} idList={props.id} />

            </tbody>
        </table>
    )
}

interface AddRowRowArg {
    setRows: Function,
    rows: Array<Object>,
    users: Array<User>,
    idList: number
}
const AddRowRow = (props: AddRowRowArg) => {
    const [add, setAdd] = useState({ status: status[0], user: '', name: '' })

    function submit() {
        if (add.name == '') return
        props.setRows([...props.rows, add])
        createRow(props.idList, add)
        setAdd({ status: status[0], user: '', name: '' })
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
                    {status.map((e, key) =>
                        <option key={key} value={e}>{e}</option>
                    )}
                </select>
            </td>
            <td>
                <select
                    value={add.user}
                    onChange={(e) => { setAdd({ ...add, user: e.target.value }) }}
                >
                    <option value=""></option>
                    {props.users.map((e, key) =>
                        <option key={key} value={e.id}>{e.name}</option>
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
    rows: Array<RowsInterface>,
    users: Array<User>
}
const Row = (props: RowArg) => {
    const [name, setName] = useState(props.row.name)
    const del = () => {
        const updatedRows = props.rows.filter(r => r !== props.row);
        props.setRows(updatedRows);
        if (props.row.id) deleteRowWithId(props.row.id)
    }
    return (
        <tr key={props.rows.indexOf(props.row)}>
            <td>
                <input
                    type="text"
                    value={name}
                    onChange={e => {
                        let newRow: RowsInterface = { ...props.row }
                        newRow.name = e.target.value
                        const index = props.rows.indexOf(props.row)
                        let old = [...props.rows]
                        old[index] = newRow
                        props.setRows(old)
                        setName(e.target.value)
                        if(props.row.id)updateNameWithId(props.row.id, e.target.value)
                    }}
                />
            </td>
            <td>
                <Select
                    id={props.row.id}
                    array={status}
                    value={props.row.status}
                    onChange={(e: string) => {
                        let newRow: RowsInterface = { ...props.row }
                        newRow.status = e
                        const index = props.rows.indexOf(props.row)
                        let old = [...props.rows]
                        old[index] = newRow
                        props.setRows(old)
                    }}
                />
            </td>
            <td>
                <SelectUsers
                    id={props.row.id}
                    array={props.users}
                    value={props.row.user}
                    onChange={(e: string) => {
                        let newRow: RowsInterface = { ...props.row }
                        newRow.user = e
                        const index = props.rows.indexOf(props.row)
                        let old = [...props.rows]
                        old[index] = newRow
                        props.setRows(old)
                    }}
                />

            </td>
            <td>
                <button
                    onClick={del}>
                    Delete
                </button>
            </td>
        </tr>
    )
}




export default Table