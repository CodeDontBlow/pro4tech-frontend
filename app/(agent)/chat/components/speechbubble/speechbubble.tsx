import styles from './speechbubble.module.css'

interface SpeechbubbleProps{
    sender: boolean,
    date: string,
    message: string,
}

export default function Speechbubble ({sender=true, date, message}: SpeechbubbleProps) {
    const hours   = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    const messageTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    
    return (
        <div className={`flex items-end gap-2.5 ${sender ? 'self-end' : 'self-start flex-row-reverse'}`}>
            <div className={`${styles.bubbleContainer} label-1 shadow-sm ${sender ? styles.sender : styles.receiver}`}>
                
                <p className="break-words min-w-0 whitespace-pre-wrap">{message}</p>

                <p className={`${styles.time} label-2 text-xs!`}>
                    {messageTime}
                </p>

                <span className={`${styles.triangle} shadow-sm`}></span>

            </div>
            <div className='h-7 border-1 img-wrapper'>
                <img src='orbi/orbi-dead.png' />
            </div>
        </div>
    )
}