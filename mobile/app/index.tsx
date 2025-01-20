import { Image, SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { styles } from './index.style';
import icon from "@/assets/images/icon.png";
import ThemedTextInput from '@/components/ThemedTextInput';
import { useState } from 'react';
import { Link, router } from 'expo-router';

export default function Index() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');


  return (
    <SafeAreaView style={[styles.indexContainer, isDark ? styles.darkMain : styles.lightMain]}>
      <View style={styles.heading}>
        <Image source={icon} style={{ width: 140, height: 140 }} />
      </View>
      <View style={styles.body}>
        <ThemedTextInput 
          className={styles.inputs}
          value={credential} 
          setValue={setCredential} 
          placeholder='Username, email or phone number' 
          keyboardType='default' 
        />
        <ThemedTextInput 
          className={styles.inputs}
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
          Forgot password?
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
