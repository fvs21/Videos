import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import { router } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useUsernameAtom } from '../../store'
import { validateUsername } from '../../utils'
import { useEffect, useState } from 'react'
import { useCheckUsernameAvailability } from '../../api'
import ValidatedInput from '@/components/ValidatedInput'

export default function RegistrationTwo() {
    const [username, setUsername] = useUsernameAtom();
    const [isUsernameValid, setIsUsernameValid] = useState(validateUsername(username));
    const [error, setError] = useState<string>("");

    const { checkUsernameAvailability, isPending } = useCheckUsernameAvailability();

    async function checkUsername() {
        if(username.length < 3) 
            return;

        try {
            await checkUsernameAvailability(username);
            setIsUsernameValid(true);
        } catch {
            setError("Username already taken");
            setIsUsernameValid(false);
        }
    }

    function changeUsername(value: string) {
        setUsername(value);
        
        const valid = validateUsername(value);
        setIsUsernameValid(valid);
        if(!valid)
            setError("Invalid username");
        else
            setError("");
    }

    useEffect(() => {
        const timeout = setTimeout(() => checkUsername(), 1000);
        return () => clearTimeout(timeout);
    }, [username]);

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    Create your username
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='defaultSemiBold' 
                        style={styles.label}>
                            Enter a username
                    </ThemedText>
                    <ValidatedInput 
                        value={username} 
                        setValue={changeUsername} 
                        style={styles.registrationInput} 
                        placeholder='Username'
                        textContentType='username'
                        autoCapitalize='none'
                        valid={isUsernameValid || username.length === 0}
                        error={error}
                    />
                </View>
                <PrimaryDisabledButton 
                    text='Next' 
                    click={() => router.push("/register/2")}
                    disabled={!isUsernameValid || isPending}    
                />
            </View>
        </View>
    )
}