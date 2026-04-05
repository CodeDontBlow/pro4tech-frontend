
type DiagramNode = {
    id: string,
    data:{
        label: string,
        options: {
            id: string,
            label: string,
            isLeaf: boolean,
            supportGroupId: string | null,
            subjectId: string | null,
        }[]
    }
}

type DiagramEdge = {
    source: string,
    target: string,
    sourceHandle?: string | null,
}

export default function toRequest(nodes: DiagramNode[], edges: DiagramEdge[]) {
    const nodesMap = new Map(nodes.map((n) => [n.id, n]))

    const targets = new Set(edges.map(e => e.target))
    const root = nodes.filter(n => !targets.has(n.id))

    function buildNode(nodeId: string, parentId: string | null, answerTrigger: string | null) : any {
        const node: DiagramNode | undefined = nodesMap.get(nodeId)

        if(!node) return

        const children = node.data.options.map(option => {
            // console.log({
            //     nodeId,
            //     optionId: option.id,
            //     edge: edges.find(e => e.source === nodeId && e.sourceHandle === option.id)
            // })
            const edge = edges.find(
                e => e.source === nodeId && e.sourceHandle === option.id
            )

            if(option.isLeaf){
                return {
                    id: option.id,
                    parentId: nodeId,
                    question: null,
                    answerTrigger: option.label,
                    isLeaf: true,
                    targetGroup: option.supportGroupId,
                    subjectId: option.subjectId,
                    children: [],

                }
            }

            if(edge){
                return buildNode(edge.target, nodeId, option.label)
            }

            return null

        }).filter(Boolean)

        return {
            id: nodeId,
            parentId: parentId,
            question: node.data.label,
            answerTrigger: answerTrigger,
            isLeaf: false,
            targetGroup: null,
            subjectId: null,
            children: children,
        }
    }


    return buildNode(root[0].id, null, null)
}