'use client'

import { useState } from "react"
import { updateUserWithId } from './actions'

interface SelectArg {
    array: Array<User>,
    value: string,
    onChange?: Function,
    id?: number
}
interface User {
    name: string,
    id: number
}
const SelectUsers = (props: SelectArg) => {
    const [val, setVal] = useState(props.value)

    return (
        <select
            value={val}
            onChange={
                (e) => {
                    props.onChange != undefined && props.onChange(e.target.value)
                    setVal(e.target.value)
                    if (props.id)updateUserWithId(props.id, Number(e.target.value))
                }}
        >
            {props.array.map((e: User, key: number) =>
                <option key={key} value={e.id}>{e.name}</option>
            )}
        </select>
    )
}

export default SelectUsers