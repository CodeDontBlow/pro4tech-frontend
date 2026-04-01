'use client'

import { Node, ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { TriageNode } from './TriageNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    triageNode: TriageNode,
}

type NodeData = {
    options: {id: string, label: string}[]
}

type TriageNodeType = Node<NodeData>

// Nós iniciais
const initialNodes: TriageNodeType[] = [
    {
        id: 'n1', 
        position: {x:0 , y:0}, 
        type: 'triageNode',
        data: {
            options: [
                {id: '3', label: 'Resposta 1'},
                {id: '4', label: 'Resposta 2'},
                {id: '5', label: 'Resposta 3'},
                {id: '6', label: 'Resposta 4'},
            ]
        }
    },
    {
        id: 'n2', 
        position: {x:700 , y:200}, 
        type: 'triageNode',
        data: {
            options: [
                {id: '7', label: 'Resposta 1'},
                {id: '8', label: 'Resposta 2'},
                {id: '9', label: 'Resposta 3'},
                {id: '10', label: 'Resposta 4'},
            ]
        }
    },
    {
        id: 'n3', 
        position: {x:700 , y:-200}, 
        type: 'triageNode',
        data: {
            options: [
                {id: '11', label: 'Resposta 1'},
                {id: '12', label: 'Resposta 2'},
                {id: '13', label: 'Resposta 3'},
                {id: '14', label: 'Resposta 4'},
            ]
        }
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