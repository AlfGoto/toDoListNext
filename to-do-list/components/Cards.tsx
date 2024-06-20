'use client'

import status from "../vars/status"

interface CardsArg{
    users: Array<string>,
    rows: Array<RowsInterface>,
    setRows: Function,
}
interface RowsInterface {
    name: string,
    status: string,
    user: string,
}
interface sInterface{
    [key: string]: Array<string>
}
export default function Cards(props : CardsArg){

    let s: sInterface = {}
    status.forEach(j=>{
        s[j] = []
        props.rows.forEach((e: RowsInterface)=>{
            if(e.status == j){s[j].push(e.name)}
        })
    })
    console.log(s)




    return(
        <section>
            
        </section>
    )
}