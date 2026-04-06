import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { api } from "@/services/api";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (config: { targetGroupId: string; subjectId: string }) => void;
}

type Group = {
  id: string;
  name: string;
};

type Subject = {
  id: string;
  name: string;
};

export default function LeafConfigModal({ show, onClose, onSave }: ModalProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [groupId, setGroupId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  useEffect(() => {
    api
      .get("/support-groups")
      .then((res: any) => setGroups(res.data))
      .catch((err: any) => console.error("Erro ao ler support-group", err));
  }, []);

  useEffect(() => {
    api
      .get("/ticket-subjects")
      .then((res: any) => setSubjects(res.data))
      .catch((err: any) => console.error("Erro ao ler support-group", err));
  }, []);

  if (!show) return null;

  return createPortal(
    <>
      <Dialog open={show} onClose={() => onClose()} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className={`max-w-lg space-y-4 ${styles.container}`}>
            <section className={styles.textSection}>
              <h2 className={`subtitle-2`}>Definir Resposta Final</h2>

              <p className={`text-2`}>
                Você está definindo essa resposta como uma “folha”, isso
                significa que a triagem acabará e o cliente será encaminhado
                para um atendente caso ele escolha essa opção.
              </p>
              <p className={`text-2`}>
                Escolha para qual Grupo de Suporte o cliente será direcionado.
              </p>
            </section>

            <section className={styles.dropdownSection}>
              <div className={styles.dropdownContainer}>
                <label htmlFor="" className={`label-1`}>
                  Grupo de Suporte:
                </label>

                <select
                  className={styles.dropdown}
                  onChange={(e) => setGroupId(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.dropdownContainer}>
                <label htmlFor="" className={`label-1`}>
                  Assunto do Chamado:
                </label>

                <select
                  className={styles.dropdown}
                  onChange={(e) => setSubjectId(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className={`${styles.buttonsSection}`}>
              <button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                className={`${styles.btn} ${styles.confirm}`}
                onClick={() =>
                  onSave({
                    targetGroupId: groupId,
                    subjectId: subjectId,
                  })
                }
                disabled={!groupId || !subjectId}
              >
                Salvar
              </button>
            </section>
          </DialogPanel>
        </div>
      </Dialog>
    </>,
    document.body,
  );
}
