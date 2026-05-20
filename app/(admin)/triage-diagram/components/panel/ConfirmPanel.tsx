import { api } from "@/services/api";
import styles from "./Panel.module.css";
import { toast } from "sonner"
import useApiNodes from "../../hooks/useApiNodes";

interface PanelProps {
  save: () => any
  refetch: () => void
}

export default function ConfirmPanel({ save, refetch }: PanelProps) {
  
  const handleSave = async () => {
    try {
      const json = save();
      await api.post("/triage-rules/sync", json)
      console.log(json);

      refetch()

      toast.success(`Diagrama salvo e atualizado com sucesso!`)

    } catch (err) {
      console.error("Erro ao sincronizar os nós de triagem: ", err);
      toast.error("Erro ao salvar o diagrama! ")
    }
  
  }
  return (
    <div className="flex gap-2">
      <button
        className={`label-2 bg-black-300! ${styles.confirmPanelBtn}`}
        onClick={refetch}
      >
        Cancelar Alterações
      </button>
      <button
        className={`label-2 ${styles.confirmPanelBtn}`}
        onClick={handleSave}
      >
        Salvar Alterações
      </button>
    </div>
  );
}
