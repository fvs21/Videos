import GoBackButton from "@/components/GoBackButton";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import ProductViewer from "@/features/store/components/ProductViewer";
import { Text, View } from "react-native";

export default function ViewProduct({route}: any) {
    const product_id = route.params.product_id;

    return (
        <ProductViewer product_id={product_id} />
    )
}