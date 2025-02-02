import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";

export default function CreateStoreOne({step, setStep}: {step: number, setStep: (step: number) => void}) {
    return (
        <ThemedSafeAreaView>  
            <ThemedText weight="300" type="default">MFJkosa</ThemedText>
        </ThemedSafeAreaView>
    )
}