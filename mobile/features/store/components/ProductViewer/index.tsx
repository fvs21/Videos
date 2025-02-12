import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { useGetProductInformation } from "../../api";
import { Colors } from "@/styles/variables";
import ProductImageSlider from "../ProductImageSlider";
import { styles } from "./ProductViewer.style";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "../../types";
import { useState } from "react";
import { flash } from "@/flash-message/flashMessageCreator";


export default function ProductViewer({product_id}: {product_id: number}) {
    const { data, isLoading } = useGetProductInformation(product_id);
    const isDark = useColorScheme() === 'dark';
    const [readMore, setReadMore] = useState<boolean>(false);

    if(isLoading)
        return <View></View>;

    const prod: Product = {
        ...data as Product
    };

    prod.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    
    return (
        <View style={{backgroundColor: isDark ? Colors.dark.background : Colors.light.background, height: "100%"}}>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <ProductImageSlider 
                    images_urls={data?.images_urls as string[]} 
                />
                <View style={styles.productInfoContainer}>
                    <View>
                        <ThemedText style={styles.productTitle} weight="300" type="title">{data?.name}</ThemedText>
                    </View>
                    <View style={styles.priceContainer}>
                        <ThemedText style={styles.price} weight="300" type="defaultSemiBold">{`$${data?.price}`}</ThemedText>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <ThemedText weight="300" type="default">
                            {prod?.description}
                        </ThemedText>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.addToCartOrBuyButtonContainer, {borderColor: isDark ? Colors.dark.border : Colors.light.border}]}>
                <TouchableOpacity style={styles.buyButton} onPress={() => flash("Product bought!", 3000, "success")}>
                    <Text style={{fontFamily: "Rubik-Regular", fontSize: 16, color: "white"}}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.addToCartButton, {borderColor: isDark ? Colors.dark.border : Colors.light.border}]}>
                    <ThemedText weight="300" type="default">Add to Cart</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    )
}