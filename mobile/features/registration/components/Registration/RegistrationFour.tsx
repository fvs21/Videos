import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import { router } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useDateOfBirthAtom, useEmailAtom, usePasswordAtom, useUsernameAtom } from '../../store'
import { formatDateOfBirth, validateEmail, validatePassword } from '../../utils'
import { useRegister } from '../../api'
import { RegistrationData } from '../../types'
import PasswordInput from '@/components/PasswordInput'

export default function RegistrationFour() {
    const [password, setPassword] = usePasswordAtom();
    const disabled = !validatePassword(password);

    const { register, isPending, registerDisabled } = useRegister();
    const [username] = useUsernameAtom();
    const [date_of_birth] = useDateOfBirthAtom();
    const [email] = useEmailAtom();

    async function handleSubmit() {
        if (disabled) return;

        const body: RegistrationData = {
            username,
            email,
            date_of_birth: formatDateOfBirth(date_of_birth),
            password
        }
        
        try {
            const request = await register(body);
            router.push("/register/4");
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
                    Create a password
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='default' 
                        style={[styles.label, {marginBottom: 10}]}>
                            The created password must contain at least 8 characters
                    </ThemedText>
                    <PasswordInput 
                        value={password} 
                        setValue={setPassword} 
                        style={styles.registrationInput} 
                        placeholder='Password'
                        textContentType='newPassword'
                        autoCapitalize='none'
                    />
                </View>
                <PrimaryDisabledButton 
                    text='Next' 
                    click={handleSubmit}
                    disabled={disabled}    
                />
            </View>
        </View>
    )
}