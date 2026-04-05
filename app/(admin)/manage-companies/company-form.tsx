"use client";
import { useState } from "react";
import { CreateCompanyDTO } from "@/services/company/company.types";
import QRCode from "react-qr-code";

export function CompanyForm({ onSubmit }: { onSubmit: (data: CreateCompanyDTO) => void }) {
    const [form, setForm] = useState<CreateCompanyDTO>({
        cnpj: "",
        name: "",
        contactName: "",
        contactEmail: "",
    });

    const [qrData, setQrData] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);

        // Gerar QR code a partir do nome da empresa (exemplo)
        setQrData(JSON.stringify(form));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="cnpj" placeholder="CNPJ" onChange={handleChange} />
                <input name="name" placeholder="Nome" onChange={handleChange} />
                <input name="contactName" placeholder="Contato" onChange={handleChange} />
                <input name="contactEmail" placeholder="Email" onChange={handleChange} />
                <button type="submit">Salvar</button>
            </form>

            {qrData && (
                <div style={{ marginTop: 20 }}>
                    <QRCode value={qrData} />
                </div>
            )}
        </div>
    );
}