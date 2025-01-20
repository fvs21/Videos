import { Image, SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { styles } from './index.style';
import icon from "@/assets/images/icon.png";
import ThemedTextInput from '@/components/ThemedTextInput';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function Index() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.indexContainer, isDark ? styles.darkMain : styles.lightMain]}>
      <View style={styles.heading}>
        <Image source={icon} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.welcome}>
        <ThemedText type='title' weight='300' style={styles.welcomeMessage}>
          Join to buy or sell anything
        </ThemedText>
      </View>
      <View style={styles.body}>
        <ThemedTextInput 
          style={styles.inputs}
          value={credential} 
          setValue={setCredential} 
          placeholder='Username, email or phone number' 
          keyboardType='default' 
        />
        <ThemedTextInput 
          style={styles.inputs}
          value={password} 
          setValue={setPassword} 
          placeholder='Password' 
          keyboardType='default'
          textContentType='password' 
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <Link href={'/forgot-password'} style={styles.forgotButton}>
          <ThemedText weight='300' type='defaultSemiBold'>Forgot password?</ThemedText>
        </Link>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
          <Text style={styles.registerButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
