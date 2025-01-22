import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    registrationInput: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        fontSize: 16
    },
    passwordInput: {
        fontSize: 16,
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
    },
    header: {
        height: "12%",
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontSize: 30
    },
    registrationBody: {
        height: "85%",
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "space-between"
    },
    dateInputDisplay: {
        borderWidth: 1,
        borderColor: Colors.primary300,
    }
})  