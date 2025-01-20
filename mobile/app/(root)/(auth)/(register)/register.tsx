import { ThemedText } from '@/components/ThemedText'
import React from 'react'
import { View } from 'react-native'
import { styles } from './register.style'
import ThemedTextInput from '@/components/ThemedTextInput'
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView'
import RegistrationForm from '@/features/registration/components/Registration/RegistrationForm'

export default function Register() {
  return (
    <ThemedSafeAreaView>
      <View style={styles.header}>
        <ThemedText style={styles.title} weight='300' type='title'>
          Sign Up
        </ThemedText>
      </View>
      <View style={styles.body}>
        <RegistrationForm />
      </View>
    </ThemedSafeAreaView>
  )
}