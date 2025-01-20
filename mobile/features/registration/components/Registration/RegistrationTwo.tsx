import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Registration.style";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import AuthenticationInput from "@/components/AuthenticationInput";
import { useState } from "react";

export default function RegistrationTwo() {
    const [dateOfBirth, setDateOfBirth] = useState("");

    return (
        <View style={styles.registrationStep}>
            <View>
                <ThemedText style={styles.label} weight="300" type="defaultSemiBold">
                    Select your date of birth
                </ThemedText>
                <AuthenticationInput 
                    style={styles.registrationInput}
                    value={dateOfBirth} 
                    setValue={setDateOfBirth} 
                    textContentType="birthdate" 
                />
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/register/2")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}