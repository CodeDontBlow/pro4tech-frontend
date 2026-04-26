import styles from './speechbubble.module.css'

interface SpeechbubbleProps{
    sender: boolean,
    message: string,
}

export default function Speechbubble ({sender=true, message}: SpeechbubbleProps) {

    return (
        <div className={`${styles.bubbleContainer} label-1 shadow-sm ${sender ? styles.sender : styles.receiver}`}>
            {message}
        </div>
    )
}