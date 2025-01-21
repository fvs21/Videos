import { ThemedText } from '@/components/ThemedText'
import { Text, View } from 'react-native'
import { styles } from './register.style'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { useLocalSearchParams } from 'expo-router'
import { determineRegistrationStep } from '@/features/registration/utils'

export default function Register() {
  const { step } = useLocalSearchParams() as any;

  return (
    <ThemedSafeAreaView>
      {determineRegistrationStep(Number.parseInt(step))}
    </ThemedSafeAreaView>
  )
}