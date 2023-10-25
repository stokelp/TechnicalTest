import styles from "./card.module.scss"
import { Band } from "@/utils/utils"

export default function Card({band}:{band: Band}) {


    return (
        <>
            <div className={styles.card}>
                <h1>{band.band_name}</h1>
                <h2>{band.origin}</h2>
                <p><b>Number of fans: </b>{band.fans}</p>
                <p><b>Genre: </b>{band.style}</p>
                <p><b>Year formed: </b>{band.formed}</p>
                {
                    band.split && band.split.length === 4 ?
                        <p><b>Separation year: </b>{band.split}</p>
                        : null
                }
            </div>
        </>
    )
}
