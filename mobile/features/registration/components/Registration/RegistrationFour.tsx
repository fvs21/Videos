import { ThemedText } from '@/components/ThemedText'
import { Platform, View } from 'react-native'
import { styles } from './Registration.style'
import AuthenticationInput from '@/components/AuthenticationInput'
import { router } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useEmailAtom } from '../../store'
import { useState } from 'react'
import { usePreventRemove } from '@react-navigation/native'

export default function RegistrationFour() {
    const [email] = useEmailAtom();
    const [verificationCode, setVerificationCode] = useState('');
    const disabled = verificationCode.length !== 6;

    usePreventRemove(true, ({ data }) => {
        
    })

    async function handleSubmit() {
        if (disabled) return;
        
        try {
            // Add your verification logic here
            // await verifyEmail(email, verificationCode);
            router.push("/register/success");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    Verify your email
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='default' 
                        style={[styles.label, {marginBottom: 10}]}>
                            Enter the 6-digit code sent to {email}
                    </ThemedText>
                    <AuthenticationInput 
                        value={verificationCode} 
                        setValue={setVerificationCode}
                        onChangeText={setVerificationCode}
                        style={[styles.registrationInput, {marginBottom: 30}]} 
                        placeholder='Verification code'
                        keyboardType='number-pad'
                        textContentType='oneTimeCode'
                        maxLength={6}
                        autoCapitalize='none'
                    />
                    <PrimaryDisabledButton 
                        text='Next' 
                        click={handleSubmit}
                        disabled={disabled}    
                    />
                </View>
            </View>
        </View>
    )
}