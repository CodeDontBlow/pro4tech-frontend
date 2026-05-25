import styles from './speechbubble.module.css'
import typeToIcon from '../../utils/TypeToIcon'
import prettyBytes from 'pretty-bytes'

interface SpeechbubbleProps{
    sender: boolean,
    date: string,
    message: string,
    attachments?: {
        url: string,
        mimeType: string,
        originalName: string,
        size: number,
    }[]
}

export default function Speechbubble ({sender=true, date, message, attachments = []}: SpeechbubbleProps) {
    const hours   = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    const messageTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    
    return (
        <div className={`flex items-end gap-2.5 ${sender ? 'self-end' : 'self-start flex-row-reverse'}`}>
            <div className={`${styles.bubbleContainer} label-1 shadow-sm ${sender ? styles.sender : styles.receiver}`}>
                {message && (
                    <p className="break-words min-w-0 whitespace-pre-wrap">{message}</p>
            )}

            {attachments.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    {attachments.map((file) => {
                        const isImage = file.mimeType.startsWith('image/')
                        const icon = typeToIcon(file.mimeType)

                        return (
                            <a
                                key={`${file.url}-${file.originalName}`}
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 rounded-md border border-white-700 bg-white-300 px-2 py-1.5 hover:bg-white-500 transition"
                            >
                                {isImage ? (
                                    <img
                                        src={file.url}
                                        alt={file.originalName}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                ) : (
                                    <i className={`${icon.icon} ${icon.color} text-2xl`}></i>
                                )}

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-black-base truncate max-w-[180px]">
                                        {file.originalName}
                                    </p>
                                    <p className="text-[11px] text-black-300">
                                        {prettyBytes(file.size, { space: false })}
                                    </p>
                                </div>
                            </a>
                        )
                    })}
                </div>
            )}

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