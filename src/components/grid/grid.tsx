import styles from "./grid.module.scss"

export default function Grid({cards}:{cards: any[]}) {

    return (
        <>
            <div className={styles.grid}>
                {cards}
            </div>
        </>
    )
}
