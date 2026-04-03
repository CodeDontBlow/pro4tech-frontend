import { NodeProps, Position, Handle } from "@xyflow/react"
import styles from './Nodes.module.css'

export default function ParentNode ({id, data, selected}: NodeProps<NodeData>) {
    
    return(
        <div className={`${styles.nodeContainer}`} data-selected={selected}>
            
            <p className={`${styles.label} ${styles.parentNode} ${styles.node}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, est?
            </p>

            <div className={`${styles.answerGroup}`}>
                {data.options.map((item: any, index: number) => (
                    <div className={`${styles.childNode} ${styles.node}`} key={index}>

                        <p className={styles.label}> {item.label} </p>

                        <div className={styles.buttons}>

                            <button className={`${styles.customButton} ${styles.leafBtn}`}>
                                
                            </button>

                            <div className={`${styles.customButton} ${styles.handleWrapper}`}>
                                <div className={`${styles.handleBtn}`} />

                                <Handle 
                                    type="source" 
                                    position={Position.Right} 
                                    id={`${item.id}`} 
                                    className={styles.clearHandle}
                                />
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
            </div>

            <Handle
                type='target'
                position={Position.Left}
                isConnectableStart={false}
                id={id}
            >

            </Handle>

        </div>
    )
}