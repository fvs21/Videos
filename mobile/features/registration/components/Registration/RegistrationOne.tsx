import { ThemedText } from '@/components/ThemedText'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Registration.style'
import { useState } from 'react'
import AuthenticationInput from '@/components/AuthenticationInput'
import { RegistrationProps } from '../../types'
import { router } from 'expo-router'

export default function RegistrationOne() {
    const [name, setName] = useState<string>("");

    return (
        <View style={styles.registrationStep}>
            <View>
                <ThemedText 
                    weight='300' 
                    type='defaultSemiBold' 
                    style={styles.label}>
                        What's your name?
                </ThemedText>
                <AuthenticationInput 
                    value={name} 
                    setValue={setName} 
                    style={styles.registrationInput} 
                    placeholder='Full name'
                />
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={() => router.push("/register/1")}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}