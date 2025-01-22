import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import { useState } from 'react'
import AuthenticationInput from '@/components/AuthenticationInput'
import { router } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useEmailAtom } from '../../store'
import { validateEmail } from '../../utils'

export default function RegistrationTwo() {
    const [email, setEmail] = useEmailAtom();

    const disabled = !validateEmail(email);

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    Enter your email
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='defaultSemiBold' 
                        style={styles.label}>
                            Enter a valid email address
                    </ThemedText>
                    <AuthenticationInput 
                        value={email} 
                        setValue={setEmail} 
                        style={styles.registrationInput} 
                        placeholder='Email address'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <PrimaryDisabledButton 
                    text='Next' 
                    click={() => router.push("/register/2")}
                    disabled={disabled}    
                />
            </View>
        </View>
    )
}