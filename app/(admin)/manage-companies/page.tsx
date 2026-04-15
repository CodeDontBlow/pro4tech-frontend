"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import QRCode from "react-qr-code";
import { useCompany } from "@/hooks/use-company";
import { ICompany } from "@/services/company/company.interface";

import { Button } from "@/app/components/ui/button";
import { Loading } from "@/app/components/layout/loading";
import { Pagination } from "@/app/components/ui/pagination";
import { Modal } from "@/app/components/ui/modal";
import { Table } from "antd";
import { getColumns } from "./companies-table-config";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrCompanyName, setQrCompanyName] = useState("");
  const [qrAccessCode, setQrAccessCode] = useState("");
  const [form, setForm] = useState({
    cnpj: "",
    name: "",
    contactName: "",
    contactEmail: "",
  });
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState("");
  const limit = 10;

  const {
    companies,
    loading,
    totalItems,
    totalPages,
    handleDelete,
    handleCreate,
    refresh,
  } = useCompany(currentPage, limit);

  async function handleSubmit() {
    setLoadingModal(true);
    setError("");
    try {
      await handleCreate(form);

      refresh();
      setIsModalOpen(false);
      setForm({ cnpj: "", name: "", contactName: "", contactEmail: "" });
    } catch (err: any) {
      const message = err.response?.data?.message;
      setError(Array.isArray(message) ? message[0] : "Erro ao criar empresa.");
    } finally {
      setLoadingModal(false);
    }
  }

  function handleShowQr(company: ICompany) {
    const accessCode = company.accessCode ?? "";
    setQrCompanyName(company.name || "Empresa");
    setQrAccessCode(accessCode);
    setQrModalOpen(true);
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6 md:py-9 h-screen flex flex-col bg-white-300 overflow-hidden">
      <div className="flex flex-col justify-between mb-4 shrink-0">
        <h1 className="font-martel font-bold text-[42px] leading-12.5 text-start mb-5">
          Empresas
        </h1>

        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={() => setIsModalOpen(true)}
            label="Adicionar"
            icon={Plus}
            variant="primary"
                size="md"
              />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-white-300 rounded-lg border border-white-700 overflow-hidden">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="flex-1 min-h-0">
              <Table
                size="medium"
                dataSource={companies}
                columns={getColumns(handleDelete, handleShowQr)}
                rowKey="id"
                pagination={false}
                tableLayout="fixed"
                sticky
                scroll={{ x: 940, y: "calc(100vh - 360px)" }}
              />
            </div>
          </>
        )}
        {!loading && (
          <footer className="px-4 md:px-6 py-4 border-t border-white-700 bg-white-300 shrink-0">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={limit}
              onPageChange={setCurrentPage}
            />
          </footer>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Empresa"
        description="Preencha os dados para concluir o cadastro"
        onSubmit={handleSubmit}
        submitLabel="Criar"
        loading={loadingModal}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            CNPJ
          </label>
          <input
            name="cnpj"
            type="text"
            placeholder="CNPJ"
            value={form.cnpj}
            onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome Fantasia
          </label>
          <input
            name="name"
            type="text"
            placeholder="Nome Fantasia"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-white-700 bg-white text-sm text-black-base placeholder:text-black-300/50 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            Nome Completo do Contato
          </label>
          <div className="flex items-center rounded-xl border border-white-700 bg-white-500 focus-within:border-green-500 focus-within:bg-white-base transition-colors overflow-hidden">
            <input
              name="contactName"
              type="text"
              placeholder="Nome Completo do Contato"
              value={form.contactName}
              onChange={(e) =>
                setForm({ ...form, contactName: e.target.value })
              }
              required
              className="flex-1 px-4 py-2.5 text-sm text-black-base placeholder:text-black-300/50 bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-black-300 uppercase tracking-wide">
            E-mail do Contato
          </label>
          <div className="flex items-center rounded-xl border border-white-700 bg-white-500 focus-within:border-green-500 focus-within:bg-white-base transition-colors overflow-hidden">
            <input
              name="contactEmail"
              type="text"
              placeholder="E-mail do Contato"
              value={form.contactEmail}
              onChange={(e) =>
                setForm({ ...form, contactEmail: e.target.value })
              }
              required
              className="flex-1 px-4 py-2.5 text-sm text-black-base placeholder:text-black-300/50 bg-white focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </Modal>

      <Modal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="QR Code da Empresa"
        description={qrCompanyName}
        cancelLabel="Fechar"
        showActions
      >
        <div className="flex flex-col items-center gap-4">
          {qrAccessCode ? (
            <div className="bg-white-base p-4 rounded-xl border border-white-700">
              <QRCode value={qrAccessCode} size={220} />
            </div>
          ) : (
            <p className="text-sm text-black-300">
              Esta empresa ainda nao possui um accessCode.
            </p>
          )}
          {qrAccessCode && (
            <div className="w-full rounded-xl border border-white-700 bg-white-500 px-4 py-3 text-center">
              <p className="text-xs text-black-300 uppercase tracking-wide">
                accessCode
              </p>
              <p className="text-sm font-semibold text-black-base break-all">
                {qrAccessCode}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
