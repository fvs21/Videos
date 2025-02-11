import { Colors } from "@/styles/variables";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageSliderContainer: {
        height: "37%",
        width: "100%",
    },
    imageSlider: {
        height: "100%",
        width: Dimensions.get("window").width,
    },
    productInfoContainer: {
        flex: 1,
        width: "100%",
        padding: 20
    },
    productTitle: {
        fontSize: 30
    },
    descriptionContainer: {
        marginTop: 4
    },
    priceContainer: {
        marginVertical: 4
    },
    price: {
        fontSize: 20
    },
    addToCartOrBuyButtonContainer: {
        height: 80,
        borderTopWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 20
    },
    buyButton: {
        flex: 1,
        padding: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary300,
        borderRadius: 30,
    },
    addToCartButton: {
        flex: 1,
        padding: 11,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "trasparent",
        borderRadius: 30,
        borderWidth: 1
    }
})