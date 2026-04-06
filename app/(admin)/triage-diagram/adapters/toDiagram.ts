import { Node, Edge } from "@xyflow/react";
import { ApiNode } from "../types/types";

export default function toDiagram(data: ApiNode[]){

    const nodes: Node[] = []
    const edges: Edge[] = []
    
    function traverse(node: ApiNode, x = 0, y = 0) {
        let newNode = {
            id: node.id,
            type: 'question',
            position: {x, y},
            data: {
                label: node.question ?? 'Fim',
                options: node.children.map((child) => (
                    {
                        id: child.id,
                        label: child.answerTrigger,
                        isLeaf: child.isLeaf,
                        supportGroupId: child.targetGroupId,
                        subjectId: child.subjectId,
                    }
                ))
            }
        }
    
        nodes.push(newNode)
    
        node.children.forEach((child, index) => {
            const childX = x + 600
            const childY = y + index * 350 - (node.children.length * 100)
    
            if (!child.isLeaf){
                let newEdge = {
                    id: `${node.id}-${child.id}`,
                    source: node.id,
                    sourceHandle: child.id,
                    target: child.id,
                }
    
                edges.push(newEdge)
    
                traverse(child, childX, childY)
            }
    
        })
    }

    data.forEach(node => traverse(node))

    return { nodes, edges}
}
