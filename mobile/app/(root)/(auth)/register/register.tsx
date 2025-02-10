import { ThemedText } from '@/components/ThemedText'
import { Text, View } from 'react-native'
import { styles } from './register.style'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import { determineRegistrationStep } from '@/features/registration/utils'

export default function Register({ navigation, route }: any) {
  const [step] = route.params.step;

  return (
    <ThemedSafeAreaView>
      {determineRegistrationStep(Number.parseInt(step))}
    </ThemedSafeAreaView>
  )
}