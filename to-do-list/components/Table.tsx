import { useState } from "react"
import status from "../vars/status"
import Select from './Select'


interface TableArg {
    users: Array<string>,
    rows: Array<RowsInterface>,
    // setRows: React.Dispatch<React.SetStateAction<RowsInterface[]>>,
    setRows: Function,
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
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

                <AddRowRow setRows={(e: any) => { props.setRows(e) }} rows={props.rows} users={props.users} />

            </tbody>
        </table>
    )
}

interface AddRowRowArg {
    setRows: Function,
    rows: Array<Object>,
    users: Array<string>
}
const AddRowRow = (props: AddRowRowArg) => {
    const [add, setAdd] = useState({ status: status[0], user: props.users[0], name: '' })

    function submit() {
        if (add.name == '') return
        props.setRows([...props.rows, add])
        setAdd({ status: status[0], user: props.users[0], name: '' })
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
                    {props.users.map((e, key) =>
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
    rows: Array<RowsInterface>,
    users: Array<string>
}
const Row = (props: RowArg) => {
    const [name, setName] = useState(props.row.name)
    const del = () => {
        const updatedRows = props.rows.filter(r => r !== props.row);
        props.setRows(updatedRows);
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
                    }}
                />
            </td>
            <td>
                <Select
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
                <Select
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