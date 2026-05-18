import { start } from "repl";

interface FilePreviewProps {
    file: File;
    onSubmit?: (file: File) => void;
    onCancel?: () => void;
    open: boolean;
}

export default function FilePreview({file, onSubmit, onCancel, open}: FilePreviewProps) {
    if (!open) return null;

    const typeToIcon = (fileType: string) => {
        if (fileType === 'application/pdf') return 'bi bi-file-earmark-pdf-fill text-orange-base'
        if (fileType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheet')) return 'bi bi-file-earmark-spreadsheet-fill text-green-base'
        if (fileType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessing')) return 'bi bi-file-earmark-word-fill text-blue-base'
        if (fileType.startsWith('text/')) return 'bi bi-file-earmark-text-fill text-black-300'
        if (fileType === 'application/zip' || fileType === 'application/x-compressed' || fileType === 'application/x-7z-compressed' )  return 'bi bi-file-earmark-zip-fill text-orange-300'
        if (fileType.startsWith('application/x-msdownload')) return 'bi bi-file-earmark-code-fill text-teal-base'
        return 'bi bi-file-earmark-fill text-black-base'
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-4 bg-white-base rounded-lg shadow-md w-full h-full top-0 left-0 absolute z-10">
            <div>
                <p className="label-2 font-light"> Arquivo Selecionado:</p>
            </div>


            {file.type.startsWith("image/") ? (
                <>
                    <p className="label-1 font-medium">{file.name}</p>
                
                    <img src={URL.createObjectURL(file)} alt={file.name} className="max-w-xxl max-h-100 rounded" />
                </>
            ): (
                <div className="flex gap-3 py-4 px-3 bg-white-300 rounded border border-white-700">

                    <i className={`${typeToIcon(file.type)} text-6xl`}></i>

                    <div className="flex flex-col gap-1">
                        <p className="label-1 font-medium text-ellipsis overflow-hidden whitespace-nowrap w-xs text-left">
                            {file.name}
                        </p>
                        <p className="label-2 font-light text-left">
                            {Math.round(file.size / 1024)} KB
                        </p>
                    </div>
                </div>
            )}


            <div className="flex gap-4">
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    onClick={onCancel}
                >Cancelar</button>
            </div>
        </div>
    )
}