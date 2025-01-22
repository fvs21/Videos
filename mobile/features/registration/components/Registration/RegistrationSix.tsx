import { ThemedText } from '@/components/ThemedText'
import { View } from 'react-native'
import { styles } from './Registration.style'
import AuthenticationInput from '@/components/AuthenticationInput'
import { router } from 'expo-router'
import GoBackButton from '@/components/GoBackButton'
import PrimaryDisabledButton from '@/components/PrimaryDisabledButton'
import { useFullNameAtom } from '../../store'

export default function RegistrationFive() {
    const [name, setName] = useFullNameAtom();

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
                        textContentType='name'
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