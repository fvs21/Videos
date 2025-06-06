import { Image, SafeAreaView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { styles } from './index.style';
import icon from "@/assets/images/icon.png";
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import AuthenticationInput from '@/components/AuthenticationInput';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '@/api/hooks/auth';
import { flash } from '@/flash-message/flashMessageCreator';

export default function Index() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<any>();

  const { login, isPending, loginDisabled } = useLogin();

  async function handleSubmit() {
    if(loginDisabled) return;

    try {
      await login({ credential, password });
    } catch(error) {
      console.log(error);
      flash("Invalid credentials", 4000, "error")
    }
  }

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
        <AuthenticationInput 
          style={styles.inputs}
          value={credential} 
          setValue={setCredential} 
          placeholder='Username, email or phone number' 
          keyboardType='default' 
        />
        <AuthenticationInput 
          style={styles.inputs}
          value={password} 
          setValue={setPassword} 
          placeholder='Password' 
          keyboardType='default'
          textContentType='password' 
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ThemedText weight='300' type='defaultSemiBold'>Forgot password?</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.push('Register', {step: '0'})}>
          <Text style={styles.registerButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
