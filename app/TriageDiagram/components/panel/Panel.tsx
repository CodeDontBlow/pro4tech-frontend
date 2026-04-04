import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Panel.module.css'

interface PanelProps {
    addNode: () => void
}

export default function CustomPanel({addNode}: PanelProps) {
    return (
        <div className={styles.panelContainer}>
            <section className={styles.section}>
                <button className={styles.panelBtn} onClick={addNode}>
                    <i className={` ${styles.icon} bi bi-plus-square-fill`} />
                    Adicionar Pergunta
                </button>
            </section>
        </div>
    )
}