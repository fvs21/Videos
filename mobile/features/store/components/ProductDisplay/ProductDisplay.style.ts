import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    productContainer: {
        width: "45%",
        flexGrow: 1
    },
    productImage: {
        aspectRatio: 1,
        borderRadius: 4
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