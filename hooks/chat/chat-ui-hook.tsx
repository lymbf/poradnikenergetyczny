import {ChangeEvent, useEffect, useState} from "react";


export default function useChatUIHook({message, setMessage, sendMessage}: {
    message: string,
    setMessage: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    sendMessage: (...args: any[]) => any
}) {
    const [isFocusedMessageBox, setIsFocusedMessageBox] = useState(false);

    useEffect(() => {
        const handleEnterPressed = (event: KeyboardEvent) => {
            if (event.keyCode === 13 && isFocusedMessageBox && !event.shiftKey) {
                console.log('focused state: ', isFocusedMessageBox)
                console.log('sending the message: ', message)
                sendMessage()
            }
        }
        window.addEventListener('keypress', handleEnterPressed)
        return () => {
            removeEventListener('keypress', handleEnterPressed)
        }
    })

    return {setIsFocusedMessageBox}
}