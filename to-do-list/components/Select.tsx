import { useState } from "react"
import { updateStatusWithId } from './actions'

interface SelectArg {
    array: Array<string>,
    value: string,
    onChange?: Function,
    id?: number
}
const Select = (props: SelectArg) => {
    const [val, setVal] = useState(props.value)

    return (
        <select
            value={val}
            onChange={
                (e) => {
                    props.onChange != undefined && props.onChange(e.target.value)
                    setVal(e.target.value)
                    if (props.id)updateStatusWithId(props.id, e.target.value)
                }}
        >
            {props.array.map((e, key) =>
                <option key={key} value={e}>{e}</option>
            )}
        </select>
    )
}

export default Select