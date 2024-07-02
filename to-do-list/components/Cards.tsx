'use client'

import { useState } from "react"
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
interface Rect {
    x: number,
    y: number,
    left: number,
    top: number,
    bottom: number,
    right: number,
}
function Status(props: statusArg) {
    const [selectedDom, setSelectedDom] = useState<undefined | HTMLElement>(undefined)
    const [bounding, setBounding] = useState<undefined | Rect>(undefined)
    let mouseX = 0
    let mouseY = 0
    document.onmousemove = function (e) {
        mouseX = e.clientX
        mouseY = e.clientY
        if (selectedDom && bounding) {
            selectedDom.style.top = (mouseY - bounding.y) + 'px'
            selectedDom.style.left = (mouseX - bounding.x) + 'px'
        }
    }
    function mouseDown(arg: string) {
        let dom = document.getElementById(arg)
        if (dom === undefined || dom === null) return
        dom!.style.position = 'absolute'
        dom!.classList.add('selected')
        if (!dom.parentElement) return

        setBounding(dom.getBoundingClientRect())
        setSelectedDom(dom)
    }
    document.onmouseup = () => {
        if (selectedDom) {
            selectedDom!.style.top = ''
            selectedDom!.style.left = ''
            selectedDom!.style.position = 'static'
            selectedDom!.classList.remove('selected')
            setBounding(undefined)
            setSelectedDom(undefined)

            let tier = mouseX / (window.innerWidth / 3)
            if (tier < 1) console.log('Todo')
            else if (tier < 2) console.log('InProgress')
            else console.log('Done')

        }
    }


    return (<>
        <div className='status'>
            <h2>{props.name}</h2>
            {props.array.map((e, key) =>
                <div
                    className='row'
                    key={key}
                    id={props.name + '-' + key}
                    onMouseDown={() => mouseDown(props.name + '-' + key)}
                ><p>{e}</p>
                </div>)}
        </div>
    </>
    )
}



