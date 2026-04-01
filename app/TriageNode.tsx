import { Position, Handle } from '@xyflow/react';
import styles from './TriageNode.module.css'
import { NodeProps } from '@xyflow/react';

export function TriageNode({ id, data, selected }: NodeProps<NodeData>) {    
    return (
        <div className={styles.customNode} data-selected={selected}>
            <p className={styles.question}>
                Lorem ipsum dolor sit amet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, repellat.
            </p>

            <div className={styles.options}>
                {data.options.map((item: any, index: number) => (
                    <div className={styles.optionItem} key={index}>

                        <p className={styles.answer}> {item.label} </p>

                        <div className={styles.buttons}>

                            <button className={`${styles.customButton} ${styles.leafBtn}`}>
                                
                            </button>

                            <div className={styles.handleWrapper}>
                                <div className={`${styles.customButton} ${styles.handlerBtn}`} />

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
    );
}