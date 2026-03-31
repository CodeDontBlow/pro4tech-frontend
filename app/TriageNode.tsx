import { Position, Handle } from '@xyflow/react';
import styles from './TriageNode.module.css'

interface NodeProps {
    options: Object[]
}

const ops = [
    'resposta 1',
    'resposta 2',
    'resposta 3',
    'resposta 4',
]
export function TriageNode({options}: NodeProps) {
    return (
        <div className={styles.customNode}>
            <p className={styles.question}>
                Lorem ipsum dolor sit amet.
            </p>

            <div className={styles.options}>
                {ops.map((item: string, index: number) => (
                    <div className={styles.optionItem} key={index}>

                        <p className={styles.answer}>
                            {item}
                        </p>

                        <Handle 
                            type="source" 
                            position={Position.Right} 
                            id={`opt-${index}`}
                            style={{border: 'none', background: 'none', width: 10, height: 10}}
                        >
                            <div className={styles.customHandler}>

                            </div>
                        </Handle>
                        
                    </div>

                ))}
            </div>

            <Handle
                type='target'
                position={Position.Top}
            >

            </Handle>

        </div>
    );
}