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
    return (
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    )
}



interface RowArg {
    status: string,
    user: string,
    name: string
}
const Row = (props: RowArg) => {
    return (
        <tr>
            <th>{props.name}</th>
            <td><Select array={status} value={props.status}/></td>
            <td><Select array={users} value={props.user}/></td>
        </tr>
    )
}



interface SelectArg{
    array : Array<string>,
    value : string
}
const Select = (props : SelectArg) => {
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