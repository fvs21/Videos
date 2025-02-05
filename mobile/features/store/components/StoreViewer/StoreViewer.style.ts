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
        width: "100%",
        height: "auto",
        flex: 1
    },
    storeInfoContainer: {
        flexDirection: "row",
        gap: 30,
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
        fontSize: 20,
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
        flex: 1,  // added flex: 1 to allow vertical centering
    },
    productsList: {
        flexWrap: "wrap",
        gap: 20,
        width: "100%",
        flexDirection: "row",
    },
    editableStoreName: {
        borderWidth: 1,
        paddingHorizontal: 6,
        borderRadius: 10
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
        borderRadius: 100,
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
    },
    modalHeader: {
        padding: 20,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    emptyStore: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})