import { X, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  showActions?: boolean;
  submitIcon?: LucideIcon;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  onSubmit,
  onCancel,
  submitLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  showActions = true,
  submitIcon: SubmitIcon,
}: ModalProps) {
  if (!isOpen) return null;

  const handleCancel = onCancel || onClose;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black-base/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white-300 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-7 pt-6 pb-5 flex justify-between items-start">
          <div>
            <h2 className="text-start text-xl font-bold text-black-base font-martel">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-start text-black-300 mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-black-300 hover:text-black-base transition-colors mt-0.5 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white-700 mx-7" />

        {/* Content */}
        <div className="text-start px-7 py-6 flex flex-col gap-4">
          {children}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="px-7 pb-6 flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-xl border bg-white-300 border-white-700 text-sm text-black-300 font-medium hover:bg-white-500 transition-colors cursor-pointer"
            >
              {cancelLabel}
            </button>
            {onSubmit && (
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-green-500 text-white-base text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {SubmitIcon && <SubmitIcon size={16} />}
                {loading ? "Carregando..." : submitLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
