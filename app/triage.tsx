'use client'

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { TriageNode } from './TriageNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    triageNode: TriageNode,
}

// Nós iniciais
const initialNodes = [
    {
        id: 'n1', 
        position: {x:0 , y:0}, 
        type: 'triageNode',
    },
    {
        id: 'n2', 
        position: {x:0 , y:100}, 
        type: 'triageNode',
    },
]

// Conexões iniciais
const initialEdges = [
    // {
    //     id: 'n1-n2', 
    //     source: 'n1', 
    //     target: 'n2',
    // },
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
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                panOnScroll={true}
                selectionOnDrag={true}
                panOnDrag={false}
                connectionMode="loose"
                fitView
            >
                <Background />
                <MiniMap />
                <Panel position='bottom-center'>
                    Painel
                </Panel>
                <Controls />
            </ReactFlow>
        </div>
    )
}