import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import { useState } from 'react'
import AuthenticationInput from '@/components/AuthenticationInput'

export default function RegistrationOne() {
    const [name, setName] = useState<string>("");

    return (
        <View>
            <ThemedText 
                weight='300' 
                type='defaultSemiBold' 
                style={styles.nameLabel}>
                    What's your name?
            </ThemedText>
            <AuthenticationInput 
                value={name} 
                setValue={setName} 
                style={styles.registrationInput} 
                placeholder='Full name'
            />
        </View>
    )
}