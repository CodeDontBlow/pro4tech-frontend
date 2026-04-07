import { api } from "@/services/api";
import styles from "./Panel.module.css";

interface PanelProps {
  save: () => any;
}

export default function ConfirmPanel({ save }: PanelProps) {
  const handleSave = async () => {
    try {
      const json = save();
      console.log(json);

      await api.post("/triage-rules/sync", json);
    } catch (err) {
      console.error("Erro ao sincronizar os nós de triagem: ", err);
    }
  };
  return (
    <button
      className={`label-2 ${styles.confirmPanelBtn}`}
      onClick={handleSave}
    >
      Salvar Alterações
    </button>
  );
}
