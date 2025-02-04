import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    title: {
        paddingTop: 20
    },
    body: {
        paddingHorizontal: 20,
        flex: 1
    },
    storeOptionInputContainer: {
        marginTop: 25
    },
    storeOptionInput: {
        width: "100%",
        padding: 18,
        borderRadius: 10,
        fontSize: 16,
    },
    nextButtonContainer: {
        marginTop: 40,
        flex: 1,
        justifyContent: "flex-end"
    },
    nextButton: {
        width: "100%",
        padding: 15,
        backgroundColor: Colors.primary300,
        borderRadius: 20,
        alignItems: "center",
    },
    storeImageContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 40
    },
    selectedImageView: {
        width: 200,
        height: 200,
        borderRadius: "50%",
        overflow: "hidden",
    },
    notSelectedImageView: {
        width: 200,
        height: 200,
        borderRadius: "50%",
    },
    changeImageContainer: {
        marginTop: 25
    },
    changeImageText: {
        color: Colors.primary300,
        fontSize: 18,
        fontFamily: "Rubik-Regular"
    }
})