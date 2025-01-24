import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import { useState } from 'react'
import { useNavigation } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useEmailAtom } from '../../store'
import { validateEmail } from '../../utils'
import ValidatedInput from '@/components/ValidatedInput'

export default function RegistrationThree() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useEmailAtom();
    const [error, setError] = useState<string>("");
    const isEmailValid = validateEmail(email);

    function handleEmailChange(value: string) {
        setEmail(value);
        if (!validateEmail(value)) {
            setError("Please enter a valid email address");
        } else {
            setError("");
        }
    }

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
                    <ValidatedInput 
                        value={email} 
                        setValue={handleEmailChange}
                        style={styles.registrationInput} 
                        placeholder='Email address'
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        valid={isEmailValid || email.length === 0}
                        error={error}
                    />
                </View>
                <PrimaryDisabledButton 
                    text='Next' 
                    click={() => navigation.push('Register', {step: '3'})}
                    disabled={!isEmailValid}    
                />
            </View>
        </View>
    )
}