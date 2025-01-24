import { ThemedText } from '@/components/ThemedText'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './Registration.style'
import AuthenticationInput from '@/components/AuthenticationInput'
import { useNavigation } from '@react-navigation/native'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useState } from 'react'
import { useUser } from '@/store'
import { useResendEmailVerification } from '../../api'
import { useVerifyEmail } from '../../api'

export default function RegistrationFive() {
    const [user, setUser] = useUser();
    const [verificationCode, setVerificationCode] = useState('');
    const disabled = verificationCode.length !== 6;
    const navigation = useNavigation<any>();

    const { 
        verifyEmail, 
        isPending, 
        verifyEmailDisabled 
    } = useVerifyEmail();

    const { 
        resendEmailVerification, 
        isPending: resendEmailVerificationPending, 
        resendEmailVerificationDisabled 
    } = useResendEmailVerification();
    
    async function handleSubmit() {
        if (disabled) return;
        
        try {
            // Add your verification logic here
            await verifyEmail(Number.parseInt(verificationCode));
        } catch(error: any) {
            console.log(error.response.data);
        }
    }

    async function handleResendCode() {
        try {
            const request = await resendEmailVerification();
            console.log(request);
        } catch(error: any) {
            console.log(error.response.data);
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
                            Enter the 6-digit code sent to {user.email}
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
                    <TouchableOpacity style={styles.resendCodeBtn} onPress={handleResendCode} disabled={resendEmailVerificationDisabled}>
                        <Text style={styles.resendCode}>Resend code</Text>
                    </TouchableOpacity>
                    <PrimaryDisabledButton 
                        text='Next' 
                        click={handleSubmit}
                        disabled={disabled || verifyEmailDisabled}    
                    />
                </View>
            </View>
        </View>
    )
}