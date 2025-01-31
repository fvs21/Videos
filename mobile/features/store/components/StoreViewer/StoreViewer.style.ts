import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    storeContainer: {
        position: "relative",
        height: "100%",
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
    storeName: {
        fontSize: 28,
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
        padding: 14,
    },
    productsList: {
        flexWrap: "wrap",
        gap: 20,
        width: "100%",
        flexDirection: "row",
    },
    editableStoreName: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    editableStoreImage: {
        position: "relative",
    },
    editableStoreImageOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    editableStoreFooter: {
        padding: 20,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    addProductButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#f0f032",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})