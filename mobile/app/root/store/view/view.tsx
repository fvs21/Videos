import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import StoreViewer from "@/features/store/components/StoreViewer";
import { useState } from "react";

export default function ViewStore() {
    return (
        <ThemedSafeAreaView>
            <StoreViewer />
        </ThemedSafeAreaView>
    )
}