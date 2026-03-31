'use client'

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls } from '@xyflow/react';
import { useCallback, useState } from 'react';
import '@xyflow/react/dist/style.css';

// Nós iniciais
const initialNodes = [
    {
        id: 'n1', 
        position: {x:0 , y:0}, 
        data: {label:'Node 1'},
    },
    {
        id: 'n2', 
        position: {x:0 , y:100}, 
        data: {label:'Node 2'},
    }
]

// Conexões iniciais
const initialEdges = [
    {
        id: 'n1-n2', 
        source: 'n1', 
        target: 'n2',
        type: 'step',
    },
]

export default function Triage (){
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    // Manipuladores de Eventos (atualiza o diagrama em alterações)
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), []
    )

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), []
    )

    // Manipulador de conexão entre dois nós
    const onConnect = useCallback(
        (params: any) => setEdges((edgeSnapshot) => addEdge(params, edgeSnapshot)), []
    )

    return(
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlow 
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}