'use client'

interface ModalAddAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddAgent({ isOpen, onClose }: ModalAddAgentProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black-base/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white-300 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white-700 flex justify-between items-center bg-white-500">
          <h2 className="font-martel text-2xl font-bold text-black-base">
            Novo Atendente
          </h2>
          <button 
            onClick={onClose}
            className="text-black-700/50 hover:text-black-base transition-colors text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form className="p-8 font-ibm-plex flex text-start flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black-700">Nome Completo</label>
            <input 
              type="text" 
              placeholder="Ex: Ana Silva"
              className="w-full px-4 py-2.5 rounded-lg border border-white-700 focus:outline-none focus:border-green-700 transition-colors bg-white-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black-700">E-mail</label>
            <input 
              type="email" 
              placeholder="ana.silva@pro4tech.com"
              className="w-full px-4 py-2.5 rounded-lg border border-white-700 focus:outline-none focus:border-green-700 transition-colors bg-white-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-black-700">Grupo</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-white-700 focus:outline-none focus:border-green-700 transition-colors bg-white-base cursor-pointer">
                <option>Hardware</option>
                <option>Software</option>
                <option>Redes</option>
                <option>Sistemas</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-black-700">Nível</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-white-700 focus:outline-none focus:border-green-700 transition-colors bg-white-base cursor-pointer">
                <option>Nível 1</option>
                <option>Nível 2</option>
                <option>Nível 3</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-white-700 text-black-700 font-semibold hover:bg-white-500 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-green-700 text-white-base font-semibold hover:bg-green-500 transition-colors cursor-pointer"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}