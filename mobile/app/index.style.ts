import { Colors } from "@/styles/variables";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    indexContainer: {
        height: '100%',
        display: 'flex',
    },
    darkMain: {
        backgroundColor: Colors.dark.background,
    },
    lightMain: {
        backgroundColor: Colors.light.background
    },
    heading: {
        height: "35%",
        display: 'flex',
        justifyContent: 'center',
    },
    body: {
        paddingHorizontal: 25,
        height: "50%",
    },

    inputs: {
        paddingVertical: 22,
        paddingHorizontal: 18,
        borderRadius: 14,
        fontSize: 16,
        marginBottom: 20
    },

    loginButton: {
        width: '100%',
        padding: 14,
        backgroundColor: Colors.primary300,
        borderRadius: 30,
        marginBottom: 20
    },
    loginButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    },
    forgotButton: {
        textAlign: 'center',
        color: Colors.primary200,
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    },
    footer: {
        height: "15%",
        display: 'flex',
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
    },
    registerButton: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.primary300,
        borderRadius: 20,
    },
    registerButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'Rubik-Regular'
    }
})