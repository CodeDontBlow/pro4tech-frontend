'use client'

import Speechbubble from "./components/speechbubble/speechbubble";
import { InputField } from "@/app/components/ui/inputField";
import { Button } from "@/app/components/ui/button";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Page(){
    const searchParams = useSearchParams()
    const ticketId = searchParams.get("id")

    console.log(ticketId)

    return(
        <div className="h-screen flex flex-col items-center bg-white-base">
            <header className="bg-white-500 w-full p-4 flex justify-between shadow-md/15">
                <h4 className='text-1 align-middle flex items-center'>
                    Nome do Cliente
                </h4>

                <div className="flex gap-1.5">
                    {/* <Button label='Escalonar' className="bg-green-700!"/> */}
                    <Button label='Concluir' className="bg-black-300!"/>
                </div>

                
            </header>

            <section className="w-full flex-1 overflow-y-auto flex justify-center">
                
                <section className="px-2 py-6 flex flex-col gap-1.5 max-w-3xl w-full">

                    <div className="">
                        <h6 className="label-2">
                            Você está atendendo
                        </h6>
                        <h2 className="subtitle-2">
                            Nome Cliente
                        </h2>
                        <p className="text-2 mb-6 mt-1">
                            Funcionário da empresa <b className="text-blue-700">Empresa</b> com problema em <b className="text-blue-700">Segurança</b>
                        </p>
                    </div>

                    <Speechbubble 
                        sender={false}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloremque at possimus itaque dolorem nam illo error alias, amet voluptate.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={false}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloremque at possimus itaque dolorem nam illo error alias, amet voluptate.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={false}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloremque at possimus itaque dolorem nam illo error alias, amet voluptate.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={false}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloremque at possimus itaque dolorem nam illo error alias, amet voluptate.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={false}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste doloremque at possimus itaque dolorem nam illo error alias, amet voluptate.'
                    />
                    <Speechbubble 
                        sender={true}
                        message='Lorem ipsum, dolor sit amet.'
                    />
                    <br />
                </section>

            </section>
        
            <header className="bg-white-500 w-full px-4 py-3 flex items-center gap-2.5 shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
                
                <InputField placeholder="Digite sua mensagem" className="bg-white-base focus:ring-[var(--blue-300)]!" />
                
                <Button icon={Send} type="submit" className="bg-blue-base! rounded-full! aspect-square!"/>
            </header>
        </div>
    )
}