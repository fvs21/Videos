import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./ProductDisplay.style";
import { ProductDisplay as PD } from "../../types";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";

export default function ProductDisplay({ product }: { product: PD }) {
    const navigator = useNavigation<any>();
    
    return (
        <TouchableOpacity style={styles.productContainer} onPress={() => navigator.navigate("ViewProduct", { product_id: product.id })}>
            <Image 
                source={{ uri: product.images_urls[0] }} 
                style={styles.productImage} 
            />
            <View style={styles.productTextContainer}>
                <ThemedText type="default" weight="300" style={styles.productName} numberOfLines={1}>
                    {product.name}
                </ThemedText>
                <ThemedText type="defaultSemiBold" weight="300">
                    USD ${product.price}
                </ThemedText>
            </View>
        </TouchableOpacity>
    )
}