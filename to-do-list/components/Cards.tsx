'use client'

import status from "../vars/status"

interface CardsArg {
    users: Array<string>,
    rows: Array<RowsInterface>,
    setRows: Function,
    id: number
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
    id?: number
}
interface sInterface {
    [key: string]: Array<string>
}
export default function Cards(props: CardsArg) {

    let s: sInterface = {}
    status.forEach(j => {
        s[j] = []
        props.rows.forEach((e: RowsInterface) => {
            if (e.status == j) { s[j].push(e.name) }
        })
    })

    return <section id='Cards'>
        {Object.entries(s).map((e, key) =>
            <Status key={key} name={e[0]} array={e[1]} />
        )}
    </section>
}

interface statusArg {
    name: string,
    array: Array<string>
}
function Status(props: statusArg) {
    return (<>
        <div className='status'>
            <h2>{props.name}</h2>
            {/* <div className='rows'> */}
                {props.array.map((e, key) => <div className='row'><p key={key}>{e}</p></div>)}
            {/* </div> */}
        </div>
    </>
    )
}



