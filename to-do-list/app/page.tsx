'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import List from "../components/List"
import Select from '../components/Select'



export default function Home() {
    const router = useRouter()
    const [format, setFormat] = useState('Table')

    if (window.localStorage.getItem("user") == null) { router.push('/log') }

    function FormatChange(e: any){
        // console.log(e)
        setFormat(e)
    }

    return (
        <>
            <section id='interface'>
                <h1>Table</h1>
                <Select
                    array={['Table', 'Cards']}
                    value={format}
                    onChange={FormatChange}
                />
            </section>
            <List format={format} />
        </>
    );
}




