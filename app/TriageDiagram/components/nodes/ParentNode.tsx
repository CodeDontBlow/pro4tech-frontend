import { NodeProps, Position, Handle, useUpdateNodeInternals } from "@xyflow/react"
import { useEffect, useState } from "react";
import styles from './Nodes.module.css'
import LeafConfigModal from "../modal/Modal";

export default function ParentNode ({id, data, selected}: NodeProps<NodeData>) {
    const updateNodeInternals = useUpdateNodeInternals()
    const [isEditing, setIsEditing] = useState(false)
    const [label, setLabel] = useState(data.label);
    const [newOptionLabel, setNewOptionLabel] = useState('')
    const [leafModal, setLeafModal] = useState({
        open: false,
        optionId: null,
    });

    useEffect(() => {
        updateNodeInternals(id)
    }, [data.options.length, selected])

    useEffect(() => {
        setLabel(data.label)
    }, [data.label])

    return(
        <div className={`${styles.nodeContainer}`} data-selected={selected}>
            
            <div className={`${styles.parentNode} ${styles.node}`}>
                 {isEditing ? (
                    <input
                        className={styles.editingLabel}
                        value={label}
                        autoFocus
                        onChange={(e) => setLabel(e.target.value)}
                        onBlur={() => {
                            data.editNode(id, label)
                            setIsEditing(false)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                data.editNode(id, label)
                                setIsEditing(false)
                            }
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                    />
                ) : (
                    <p
                        className={styles.label}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {data.label}
                    </p>
                )}
            </div>

            <div className={`${styles.answerGroup}`}>
                {data.options.map((item: any, index: number) => (
                    <div className={`${styles.childNode} ${styles.node}`} key={index}>

                        <p className={styles.label}> {item.label} </p>

                        <div className={styles.buttons}>

                            <button 
                                className={`${styles.customButton} ${styles.trashBtn}`}
                                onClick={() => data.deleteOption(id, item.id)}
                            >
                                <i className={`bi bi-trash`} />
                            </button>

                            <button 
                                className={`${styles.customButton} ${styles.leafBtn}`}
                                onClick={() => setLeafModal({
                                    open: true,
                                    optionId: item.id
                                })}
                            >
                                <i className={`bi bi-leaf`} />                                
                            </button>

                            {item.isLeaf === false && (
                                <div className={`${styles.customButton} ${styles.handleWrapper}`}>
                                    <div className={`${styles.handleBtn}`}> 
                                        <i className={`bi bi-node-plus`} />   
                                    </div>

                                    <Handle 
                                        type="source" 
                                        position={Position.Right} 
                                        id={`${item.id}`} 
                                        className={styles.clearHandle}
                                        isConnectableEnd={false}
                                    />
                                </div>
                            )}
                            
                        </div>
                        
                    </div>
                ))}
            </div>

            {selected && (
                <div 
                    className={styles.nodePanel}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <div className={`${styles.btn} ${styles.addOption}`}>
                        
                        <input
                            className={styles.input}
                            value={newOptionLabel}
                            onChange={(e) => setNewOptionLabel(e.target.value)}
                            placeholder="Adicionar Resposta"
                            onMouseDown={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    data.addOption(id, newOptionLabel);
                                    setNewOptionLabel('');
                                }
                            }}
                        />
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (!newOptionLabel.trim()) return;
                                data.addOption(id, newOptionLabel);
                                setNewOptionLabel('');
                            }}>
                            <i className={`bi bi-plus`} />
                        </button>
                    </div>

                    <button className={styles.btn} onClick={() => setIsEditing(true)}>
                        <i className={`bi bi-pencil-fill`} />   
                        Editar                     
                    </button>

                    <button className={styles.btn} onClick={() => data.deleteNode(id)}>
                        <i className={`bi bi-trash-fill`} />
                        Excluir
                    </button>
                </div>
            )}

            <Handle
                type='target'
                position={Position.Left}
                isConnectableStart={false}
                style={{top: 45}}
                id={id}
            />

            <LeafConfigModal
                show={leafModal.open}
                onClose={() => 
                    setLeafModal({open: false, optionId: null})
                }
                onSave={(payload: any) => {
                    data.setOptionAsLeaf(
                        id,
                        leafModal.optionId,
                        payload
                    )

                    setLeafModal({ open: false, optionId: null })
                }}
            />

        </div>
    )
}