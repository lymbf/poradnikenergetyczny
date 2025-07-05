"use client"

import {cn} from "@/lib/utils";
import {Card, CardHeader} from "@/components/ui/card";
import {InfoIcon} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {useChat} from "@ai-sdk/react";
import useChatUIHook from "@/hooks/chat/chat-ui-hook";


export default function Page() {
    const [message, setMessage] = useState<string>('')
    const {messages, input, handleInputChange, handleSubmit} = useChat();

    const {setIsFocusedMessageBox} = useChatUIHook({
        message: input,
        setMessage: handleInputChange,
        sendMessage: handleSubmit
    })

    return (
        <div className={cn('relative min-w-[360px] sm:min-w-[800px]')}>
            <Card className={'min-w-[400px] w-full max-w-[800px]'}>
                <CardHeader>

                    <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                        <InfoIcon size="16" strokeWidth={2}/>
                        Chat testing platform
                    </div>

                    <div className='flex flex-col gap-4 w-full min-h-[400px]'>
                        {messages.map((message, index) => (
                            <div key={message.id} className="whitespace-pre-wrap">
                                {message.role === 'user' ? 'User: ' : 'AI: '}
                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case 'text':
                                            return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit}>
                            <Textarea id={'chat'} name='chat'
                                      value={input}
                                      onChange={handleInputChange}
                                      onFocus={() => {
                                          setIsFocusedMessageBox(true)
                                      }}
                                      onBlur={() => {
                                          setIsFocusedMessageBox(false)
                                      }}
                                      className={cn(
                                          'focus-visible:ring-0 ',
                                          'outline-none outline-offset-0 focus:outline-none focus-visible:outline-none focus:outline-offset-0',

                                          'focus:border-muted-foreground')}
                                      placeholder="Type your message here."/>
                        {/*<input*/}
                        {/*    className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"*/}
                        {/*    value={input}*/}
                        {/*    placeholder="Say something..."*/}
                        {/*    onChange={handleInputChange}*/}
                        {/*/>*/}
                    </form>

                </CardHeader>

            </Card>
        </div>
    )
}