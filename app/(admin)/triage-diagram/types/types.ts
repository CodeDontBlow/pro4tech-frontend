import { Node, Edge } from "@xyflow/react";

export type DiagramEdge = Edge<{
  source: string;
  target: string;
  sourceHandle?: string | null;
}>;

// Diagrama sem Funções
export type DiagramNodeRaw = Node<{
  label: string;
  options: NodeOption[];
}>;

export type DiagramNode = Node<NodeData>;

export type NodeData = {
  label: string;
  options: NodeOption[];
  deleteOption: (nodeId: string, optionId: string) => void;
  addOption: (nodeId: string, label: string) => void;
  editNode: (nodeId: string, label: string) => void;
  deleteNode: (nodeId: string) => void;
  setOptionAsLeaf: (nodeId: string, optionId: string, payload: any) => void;
};

export type NodeOption = {
  id: string;
  label: string;
  isLeaf: boolean;
  subjectId: string | null;
  supportGroupId: string | null;
};

export type ApiNode = {
  id: string;
  question: string | null;
  answerTrigger: string | null;
  isLeaf: boolean;
  targetGroupId: string | null;
  subjectId: string | null;
  children: ApiNode[];
};
