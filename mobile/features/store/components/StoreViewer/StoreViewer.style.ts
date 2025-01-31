import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    storeContainer: {

    },
    storeHeader: {
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",
    },
    storeBody: {
        padding: 20,
    },
    storeInfoContainer: {
        flexDirection: "row",
        gap: 30
    },
    storeImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    storeTextContainer: {
        flexDirection: "column",
        gap: 10
    },
    storeOwnerInformation: {
        flexDirection: "row",
        gap: 10,
        marginTop: 8,
        alignItems: "center"
    },
    storeOwnerPfp: {
        width: 20,
        height: 20,
        borderRadius: 100,
    },
    productsContainer: {
        padding: 20,
    },
    productsList: {
        flexWrap: "wrap",
        gap: 20,
        width: "100%",
        flexDirection: "row",
    }
})