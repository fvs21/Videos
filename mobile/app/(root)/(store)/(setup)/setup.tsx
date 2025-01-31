import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import StoreViewer from "@/features/store/components/StoreViewer";

export default function Setup() {
    return (
        <ThemedSafeAreaView>
            <StoreViewer />
        </ThemedSafeAreaView>
    )
}