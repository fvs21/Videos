import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Registration.style";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import AuthenticationInput from "@/components/AuthenticationInput";
import { useState } from "react";
import GoBackButton from "@/components/GoBackButton";

export default function RegistrationTwo() {
    const [dateOfBirth, setDateOfBirth] = useState("");

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    When's your birthdate?
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='defaultSemiBold' 
                        style={styles.label}>
                            Select your birthday
                    </ThemedText>
                    <AuthenticationInput 
                        value={dateOfBirth} 
                        setValue={setDateOfBirth} 
                        style={styles.registrationInput} 
                        placeholder='Birthdate'
                    />
                </View>
                <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/register/1")}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}