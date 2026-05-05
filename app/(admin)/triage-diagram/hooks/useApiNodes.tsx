import { useState, useEffect } from "react"
import { api } from "@/services/api"

export default function useApiNodes() {
  const [apiNodes, setApiNodes] = useState([])
  const [rootNodeId, setRootNodeId] = useState('')

  const fetchData = () => {
    api
      .get("/triage-rules")
      .then((res) => setApiNodes(res.data))
      .catch((err) => console.error("Erro ao ler triage-rules", err))

    api
      .get("/triage-rules/root")
      .then((res) => setRootNodeId(res.data.id))
      .catch((err) => console.error("Erro ao ler triage-rules/root", err))
  }

  useEffect(() => {
    fetchData()
  }, [])

    return { apiNodes, rootNodeId, refetch: fetchData }

}