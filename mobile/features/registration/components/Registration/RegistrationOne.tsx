import { ThemedText } from '@/components/ThemedText'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Registration.style'
import { useState } from 'react'
import AuthenticationInput from '@/components/AuthenticationInput'
import { RegistrationProps } from '../../types'
import { router, useNavigation } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'

export default function RegistrationOne() {
    const [name, setName] = useState<string>("");

    const disabled = name.length == 0;

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    What's your name?
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='defaultSemiBold' 
                        style={styles.label}>
                            Enter your legal name
                    </ThemedText>
                    <AuthenticationInput 
                        value={name} 
                        setValue={setName} 
                        style={styles.registrationInput} 
                        placeholder='Full name'
                    />
                </View>
                <PrimaryDisabledButton 
                    text='Next' 
                    click={() => router.push("/register/1")}
                    disabled={disabled}    
                />
            </View>
        </View>
    )
}