import { ThemedText } from '@/components/ThemedText'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Registration.style'
import AuthenticationInput from '@/components/AuthenticationInput'
import { useNavigation } from 'expo-router'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useState } from 'react'
import { useUser } from '@/store'

export default function RegistrationFive() {
    const [user] = useUser();
    const [verificationCode, setVerificationCode] = useState('');
    const disabled = verificationCode.length !== 6;
    const navigation = useNavigation<any>();

    async function handleSubmit() {
        if (disabled) return;
        
        try {
            // Add your verification logic here
            // await verifyEmail(email, verificationCode);
            //navigation.push('Register', {step: 'success'});
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                </View>
                <View style={styles.verificationHeader}>
                    <ThemedText style={styles.title} weight='300' type='title'>
                        Verify your email
                    </ThemedText>
                    <TouchableOpacity onPress={() => navigation.navigate("more")}>
                        <ThemedText weight='300' type='link' style={styles.verificationHeaderText}>
                            More   
                        </ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='default' 
                        style={[styles.label, {marginBottom: 10}]}>
                            Enter the 6-digit code sent to {"pornelius@gmail.com"}
                    </ThemedText>
                    <AuthenticationInput 
                        value={verificationCode} 
                        setValue={setVerificationCode}
                        onChangeText={setVerificationCode}
                        style={[styles.registrationInput]} 
                        placeholder='Verification code'
                        keyboardType='number-pad'
                        textContentType='oneTimeCode'
                        maxLength={6}
                        autoCapitalize='none'
                    />
                    <TouchableOpacity style={styles.resendCodeBtn} onPress={() => {}}>
                        <Text style={styles.resendCode}>Resend code</Text>
                    </TouchableOpacity>
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