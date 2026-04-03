'use client'

import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import { useCallback, useState } from 'react';
import ParentNode from './components/nodes/ParentNode';
import { initialNodes } from './store/nodes'
import { initialEdges } from './store/edges';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    question: ParentNode,
}

export default function TriageDiagram (){
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
                // panOnScroll={true}
                // selectionOnDrag={true}
                // panOnDrag={false}
                fitView
            >
                <Background />
                {/* <MiniMap /> */}
                {/* <Controls /> */}
                <Panel position='bottom-center'>
                    Painel
                </Panel>
            </ReactFlow>
        </div>
    )
}