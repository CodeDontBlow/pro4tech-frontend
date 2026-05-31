"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import { Button } from "@/app/components/ui/button";

interface AgentProfile {
  id: string;
  supportLevel: string;
  user: {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatarUrl?: string;
  };
  supportGroups?: {
    id: string;
    name: string;
  }[];
}

export default function ProfilePage() {
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/img/logo-orbita.svg");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (!token) return;

      const payload: { id?: string; sub?: string } = JSON.parse(
        atob(token.split(".")[1])
      );

      const id = payload.id || payload.sub;
      const response = await api.get(`/agent/${id}`);
      const data = response.data;

      setAgent(data);
      setFormData({
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      });
      setProfileImage(data.user.avatarUrl || "/img/logo-orbita.svg");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    try {
      if (!agent) return;

      await api.patch("/user/me", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      setEditing(false);
    } catch (err: any) {
      console.log("STATUS:", err?.response?.status);
      console.log("DATA:", err?.response?.data);
      console.log("ERROR:", err);
    }
  }

  if (loading) {
    return <div className="p-10">Carregando...</div>;
  }

  if (!agent) {
    return <div className="p-10">Perfil não encontrado</div>;
  }

  return (
    <section className="p-8 relative">
      <div className="max-w-5xl mx-auto bg-white-300 border border-white-700 rounded-3xl shadow-sm p-10">
        <div className="flex flex-col items-center gap-5 pb-10 border-b border-white-700">
          <div className="relative">
            <img
              src={profileImage}
              alt="perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-300"
            />
          </div>

          {editing ? (
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border rounded-xl px-4 py-2 text-center"
            />
          ) : (
            <h1 className="subtitle-1">{formData.name}</h1>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <EditableInfo
            label="Email"
            value={formData.email}
            editing={editing}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />

          <EditableInfo
            label="Telefone"
            value={formData.phone}
            editing={editing}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />

          <Info label="Cargo" value={agent.user.role} />

          <Info label="Nível suporte" value={agent.supportLevel} />
        </div>

        {agent.supportGroups && agent.supportGroups.length > 0 && (
          <div className="mt-10">
            <h2 className="subtitle-2 mb-4">Grupos de Suporte</h2>

            <div className="flex flex-wrap justify-center gap-3">
              {agent.supportGroups.map((group) => (
                <span
                  key={group.id}
                  className="px-4 py-2 rounded-full bg-teal-300"
                >
                  {group.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-10">
          {editing ? (
            <>
              <Button
                label="Cancelar"
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: agent.user.name,
                    email: agent.user.email,
                    phone: agent.user.phone,
                  });
                  setEditing(false);
                }}
              />

              <Button
                label="Salvar"
                variant="secondary"
                onClick={handleUpdate}
              />
            </>
          ) : (
            <Button
              label="Editar perfil"
              variant="secondary"
              onClick={() => setEditing(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-1 text-black-300">{label}</p>
      <p>{value || "-"}</p>
    </div>
  );
}

function EditableInfo({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="label-1 text-black-300">{label}</p>

      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-xl px-4 py-2"
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}