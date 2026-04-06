import { DiagramNode, DiagramNodeRaw, DiagramEdge, NodeOption } from "../types/types"

// NODES
export const addNode = ( 
    nodes: DiagramNodeRaw[] 
): DiagramNodeRaw[] => {
    return [
        ...nodes,
        {
            id: `question-${crypto.randomUUID()}`,
            position: {x: 0, y: 0},
            data: {
                label: `Pergunta ${nodes.length + 1}`,
                options: [],
            },
            type: 'question',
        }
    ]
}

export const editNode = (
    nodes: DiagramNodeRaw[],
    nodeId: string, 
    newLabel: string
): DiagramNodeRaw[] => {
    return nodes.map((node) =>
        node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, label: newLabel },
            }
            : node
    )
}

export const deleteNode = (
    nodes: DiagramNodeRaw[],
    nodeId: string
): DiagramNodeRaw[] => {
    return nodes.filter((node) => node.id !== nodeId);
}



// OPTIONS
export const addOption = (
    nodes: DiagramNodeRaw[],
    nodeId: string, 
    label: string,
): DiagramNodeRaw[] => {
    return nodes.map((node) => {
        if (node.id !== nodeId) return node;

        const newOption: NodeOption = {
            id: `answer-${crypto.randomUUID()}`,
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
}

export const deleteOption = (
    nodes: DiagramNodeRaw[],
    nodeId: string, 
    optionId: string
): DiagramNodeRaw[] => {
    return nodes.map((node) => {
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
}

export const setOptionAsLeaf = ( 
    nodes: DiagramNodeRaw[],
    edges: DiagramEdge[],
    nodeId: string, 
    optionId: string, 
    payload: any 
): { updatedNodes: DiagramNodeRaw[], updatedEdges: DiagramEdge[] } => {
    const updatedNodes = nodes.map((node) => {
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
    })

    const updatedEdges = edges.filter((e) => !(
        e.source === nodeId &&
        e.sourceHandle === optionId
    ))

    return {updatedNodes, updatedEdges}
}
