import { useEffect, useState } from "react"
import styles from "./search.module.scss"
import AsyncSelect from 'react-select/async'
import { convertArrayToOption } from "@/utils/utils"
interface SearchProps {
    callback: Function;
}

export default function Search({ callback }: SearchProps) {
    const [style, setStyle] = useState<string[]>([])
    const [countries, setCountries] = useState<string[]>([])
    const [sort, setSort] = useState("")
    const [bands, setBands] = useState<string[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        //do the search here
        if (style.length === 0 && countries.length === 0) {
            fetch("/api/bands").then(res => res.json()).then(data => {
                setBands(data.data)
            })
        }
        else {
            fetch(`/api/bands?styles=${style}&countries=${countries}`).then(res => res.json()).then(data => {
                setBands(data.data)
            })
        }
    }, [style, countries, sort])

    useEffect(() => {
        callback(bands)
    }, [bands])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.length > 0) {
                fetch(`/api/bands?s=${search}${countries? '&countries=' + countries.join(',') : null}${style? '&styles=' + style.join(',') : null} `).then(res => res.json()).then(data => {
                    setBands(data.data)
                })
            }
        }, 2000)
        return () => clearTimeout(timeout)
    }, [search])

    return (
        <>
            <div className={styles.search}>
            <AsyncSelect
                isMulti
                isSearchable
                cacheOptions
                defaultOptions
                loadOptions={() => {fetch("/api/styles").then(res => res.json()).then(data => {
                    return convertArrayToOption(data.data)
                  })}}
                // styles={customStyles}
                onChange={(e) => {
                    setStyle(e as string[])
                }}
                value={style}
            />
             <AsyncSelect
                isMulti
                isSearchable
                cacheOptions
                defaultOptions
                loadOptions={() => {fetch("/api/countries").then(res => res.json()).then(data => {
                    return convertArrayToOption(data.data)
                })}}
                // styles={customStyles}
                onChange={(e) => {
                    setCountries(e as string[])
                }}
                value={countries}
            />
                <select name="sort" id="sort">
                </select>

                <input type="text" name="search" id="search" value={search} onChange={(e)=>{
                    setSearch(e.target.value)
                }}/>

            </div>
        </>
    )
}


