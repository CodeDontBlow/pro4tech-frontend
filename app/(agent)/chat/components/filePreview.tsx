import { useEffect, useState } from "react";
import typeToIcon from "../utils/TypeToIcon";
import { X, Send, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import prettyBytes from "pretty-bytes";

interface FilePreviewProps {
    files: File[]
    onSubmit?: () => void
    onCancel?: () => void
    removeFile: (index: number) => void
    filesLimit: number
}

export default function FilePreview({files, onSubmit, onCancel, removeFile, filesLimit}: FilePreviewProps) {
    const [currentFile, setCurrentFile] = useState(0)
    
    
    useEffect(() => {
        if (currentFile >= files.length){
            setCurrentFile(Math.max(0, files.length - 1))
        }
    }, [files, currentFile])
    
    
    const selectedFile = files[currentFile]
    
    if (!selectedFile) return null

    return (
        <div className="flex flex-col justify-center items-center gap-4 p-4 bg-white-base rounded-lg shadow-md w-full h-full top-0 left-0 absolute z-10">
            
            <header className="absolute top-0 right-0 left-0 justify-end flex p-4">
                <Button
                    label='Cancelar Seleção'
                    className="bg-black-300!"
                    onClick={onCancel}
                />
            </header>

            <section>
                <p className="label-2 font-light mb-2"> Arquivo Selecionado:</p>
            
                <div className="flex flex-col items-center gap-5 p-5 bg-white-300 rounded border border-white-700">

                    {selectedFile.type.startsWith("image/") ? (
                        <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} className="max-w-xxl max-h-80 rounded" />
                    ): (
                        <i className={`${typeToIcon(selectedFile.type).icon} text-6xl text-black-300`}></i>
                    )}
                        
                    <div>
                        <p className="label-1 font-medium text-ellipsis overflow-hidden whitespace-nowrap w-sm text-center text-black-base">
                            {selectedFile.name}
                        </p>

                        <p className="label-2 text-center text-black-300">
                            {prettyBytes(selectedFile.size, {space: false})} - {selectedFile.name.split('.').pop()?.toUpperCase()}
                        </p>
                    </div>
                </div>
            </section>


            <header className="flex justify-between items-center absolute bottom-0 p-3 gap-2  w-full border-t border-white-700 bg-white-300">

                <div className="flex gap-2 items-center">
                    {files.length < filesLimit && (
                        <label htmlFor="fileInput" className="bg-white-500 aspect-square! border border-white-700 rounded cursor-pointer transition-all text-black-300 hover:bg-teal-base hover:text-beige-300 h-15 flex items-center justify-center" onClick={() => {}}>
                            <Plus strokeWidth={3}/>
                        </label>
                    )}

                    {files.map((f, index) => {
                        const {icon, color} = typeToIcon(f.type)

                        return (
                            <div key={f.name + index} className="bg-white-base aspect-square! border border-white-700 rounded cursor-pointer relative transition-all group hover:brightness-85 h-15 flex items-center justify-center" onClick={() => setCurrentFile(index)}>
                                
                                {f.type.startsWith('image/') 
                                    ? <img src={URL.createObjectURL(f)} alt={f.name} className="rounded max-h-full" />
                                    : <i className={`${icon} ${color} text-4xl`}/> }
                                

                                <button className="aspect-square! opacity-0 p-1 text-black-700 cursor-pointer absolute top-0 right-0 transition-all group-hover:opacity-100" onClick={() => removeFile(index)}>
                                    <X size={14} strokeWidth={3}/>
                                </button>
                            </div>
                        )
                    })}

                    {files.length >= filesLimit && (
                        <p className="label-2 text-red-700 font-medium">Limite de {filesLimit} arquivos atingido!</p>
                    )}
                </div>

                
                <Button
                    icon={Send}
                    type="button"
                    className="bg-blue-base! aspect-square!"
                    onClick={onSubmit}
                />
            </header>



        </div>
    )
}