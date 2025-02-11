import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    productContainer: {
        width: "45%",
        borderRadius: 10,
        flexGrow: 1
    },
    productImage: {
        aspectRatio: 1,
    },
    productTextContainer: {
        paddingTop: 4,
    },
    productName: {
        fontSize: 16,
        overflow: "hidden",
        textOverflow: "ellipsis",
    }
})