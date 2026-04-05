import styles from './Panel.module.css'

interface PanelProps {
    save: () => any
}

export default function ConfirmPanel({save}: PanelProps){
    return(
        <button 
            className={`label-2 ${styles.confirmPanelBtn}`}
            onClick={() => console.log(save())}
        >
            Salvar Alterações
        </button>
    )
}