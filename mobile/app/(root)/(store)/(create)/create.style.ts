import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    createStoreContainer: {
        position: "relative",
        height: "100%"
    },
    createStoreHeader: {
        paddingHorizontal: 20,
        paddingTop: 10
    },
    createStoreOptionsContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{translateY: "-50%"}, {translateX: "-50%"}]
    },
    createStoreOption: {
        padding: 15,
        width: 300,
        marginBottom: 30,
        borderWidth: 1,
        borderRadius: 14,
    },
    storeOptionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    storeOptionDescription: {
        paddingTop: 10,
        fontSize: 12,
        width: "80%"
    }
})