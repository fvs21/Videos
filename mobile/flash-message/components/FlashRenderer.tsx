import { useState } from "react";
import { setUpdateFlashes, deleteAll } from "../flashMessageCreator";
import { useEffect } from "react";
import FlashAlert from "@/components/FlashAlert";
import { FlashMessage } from "../types";
import { ThemedText } from "@/components/ThemedText";

export default function FlashRenderer() {
    const [messages, setMessages] = useState<Array<FlashMessage>>([]);

    useEffect(() => {
        setUpdateFlashes(setMessages);
        return () => deleteAll();
    }, [setMessages]);

    return (
        messages.length > 0 &&
            messages.map(function(msg: FlashMessage, i) {
                return (
                    <FlashAlert key={msg.id} type={msg.type} deleteMsg={msg.deleteFlash}>
                       <ThemedText weight="300" type="default">{msg.data}</ThemedText>
                    </FlashAlert>
                )
            }) 
    );
}