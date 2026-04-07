"use client";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
} from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";

import ParentNode from "./components/nodes/ParentNode";
import ToolsPanel from "./components/panel/ToolsPanel";
import ConfirmPanel from "./components/panel/ConfirmPanel";
import { DiagramNode, DiagramNodeRaw, DiagramEdge } from "./types/types";
import {
  addNode,
  editNode,
  deleteNode,
  addOption,
  deleteOption,
  setOptionAsLeaf,
} from "./utils/diagramActions";

import { api } from "@/services/api";
import toDiagram from "./adapters/toDiagram";
import toRequest from "./adapters/toRequest";

const nodeTypes = {
  question: ParentNode,
};

export default function Page() {
  const [apiNodes, setApiNodes] = useState([]);
  const [nodes, setNodes] = useState<DiagramNodeRaw[]>([]);
  const [edges, setEdges] = useState<DiagramEdge[]>([]);

  useEffect(() => {
    api
      .get("triage-rules")
      .then((res) => setApiNodes(res.data))
      .catch((err) => console.error("Erro ao ler triage-rules", err));
  }, []);

  useEffect(() => {
    if (!apiNodes.length) return;

    const { nodes, edges } = toDiagram(apiNodes);

    setNodes(nodes);
    setEdges(edges);
  }, [apiNodes]);

  const handleAddNode = () => {
    setNodes((n) => addNode(n));
  };

  const nodesWithActions: DiagramNode[] = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      deleteOption: (nodeId, optionId) =>
        setNodes((n) => deleteOption(n, nodeId, optionId)),

      addOption: (nodeId, label) =>
        setNodes((n) => addOption(n, nodeId, label)),

      editNode: (nodeId, label) => setNodes((n) => editNode(n, nodeId, label)),

      deleteNode: (nodeId) => setNodes((n) => deleteNode(n, nodeId)),

      setOptionAsLeaf: (nodeId, optionId, payload) => {
        setNodes((n) => {
          const { updatedNodes, updatedEdges } = setOptionAsLeaf(
            n,
            edges,
            nodeId,
            optionId,
            payload,
          );

          setEdges(updatedEdges);
          return updatedNodes;
        });
      },
    },
  }));

  // Manipuladores de Eventos (atualiza o diagrama em alterações)
  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  // Manipulador de conexão entre dois nós
  const onConnect = useCallback((params: any) => {
    setEdges((edgesSnapshot) => {
      const filtered = edgesSnapshot.filter(
        (edge) =>
          !(
            edge.source === params.source &&
            edge.sourceHandle === params.sourceHandle
          ),
      );

      const newEdges = addEdge(params, filtered) as DiagramEdge[];
      return newEdges;
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
        <Controls />
        <Panel position="bottom-center">
          <ToolsPanel addNode={handleAddNode} />
        </Panel>
        <Panel position="top-right">
          <ConfirmPanel save={() => toRequest(nodes, edges)} />
        </Panel>
      </ReactFlow>
    </div>
  );
}
