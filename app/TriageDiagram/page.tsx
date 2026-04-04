'use client'

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import { useCallback, useState } from 'react';
import ParentNode from './components/nodes/ParentNode';
import { initialNodes } from './store/nodes'
import { initialEdges } from './store/edges';
import CustomPanel from './components/panel/Panel';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    question: ParentNode,
}

type NodeData = {
    label: string;
    options: { id: string; label: string }[];
    deleteOption: (nodeId: string, optionId: string) => void;
};

export default function TriageDiagram (){
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    const addNode = () => {
        const newNode = {
            id: `${nodes.length + 1}`,
            position: {x: 0, y: 0},
            data: {
                label: `Pergunta ${nodes.length + 1}`,
                options: [],
            },
            type: 'question',
        }

        setNodes((n) => [...n, newNode])
    }

    const deleteOption = (nodeId: string, optionId: string) => {
        setNodes((nodes) =>
            nodes.map((node) => {
            if (node.id !== nodeId) return node;

            return {
                ...node,
                data: {
                ...node.data,
                options: node.data.options.filter(
                    (opt) => opt.id !== optionId
                ),
                },
            }
            })
        )
    }

    const addOption = (nodeId: string, label: string) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id !== nodeId) return node;

                const newOption = {
                    id: crypto.randomUUID(),
                    label,
                    isLeaf: false,
                    subjectId: null,
                    supportGroupId: null
                };

                return {
                    ...node,
                    data: {
                        ...node.data,
                        options: [...node.data.options, newOption],
                    },
                }
            })
        )
    }

    const setOptionAsLeaf = ( nodeId: string, optionId: string, payload: any ) => {
        setNodes((nodes) =>
            nodes.map((node) => {
            if (node.id !== nodeId) return node;

            return {
                ...node,
                data: {
                    ...node.data,
                    options: node.data.options.map((opt) =>
                        opt.id === optionId
                        ? {
                            ...opt,
                            isLeaf: true,
                            ...payload,
                            }
                        : opt
                    ),
                },
            }
        }))

        setEdges((edges) =>
            edges.filter(
            (e) =>
                !(
                e.source === nodeId &&
                e.sourceHandle === optionId
                )
            )
        )
    }

    const editNode = (nodeId: string, newLabel: string) => {
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === nodeId
                    ? {
                        ...node,
                        data: { ...node.data, label: newLabel },
                    }
                    : node
            )
        )
    }

    const deleteNode = (nodeId: string) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    }

    const nodesWithActions = nodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            deleteOption,
            addOption,
            editNode,
            deleteNode,
            setOptionAsLeaf,
        },
    }))

    // Manipuladores de Eventos (atualiza o diagrama em alterações)
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []
    )

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []
    )

    // Manipulador de conexão entre dois nós
    const onConnect = useCallback((params: any) => {
        setEdges((edgesSnapshot) => {
            const filtered = edgesSnapshot.filter(
                (edge) =>
                    !(
                        edge.source === params.source &&
                        edge.sourceHandle === params.sourceHandle
                    )
            );

            return addEdge(params, filtered);
        });
    }, []);

    return(
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow 
                nodes={nodesWithActions}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                // panOnScroll={true}
                // selectionOnDrag={true}
                // panOnDrag={false}
                fitView
            >
                <Background />
                {/* <MiniMap /> */}
                {/* <Controls /> */}
                <Panel position='bottom-center'>
                    <CustomPanel addNode={addNode}/>
                </Panel>
            </ReactFlow>
        </div>
    )
}