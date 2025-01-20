import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    registrationInput: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        fontSize: 16
    },
    label: {
        paddingBottom: 8
    },
    registrationStep: {
        display: "flex",
        justifyContent: "space-between",
        height: "100%"
    },
    nextButton: {
        width: "100%",
        padding: 16,
        backgroundColor: Colors.primary300,
        borderRadius: 30
    },
    nextButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Rubik-Medium"
    }
})  