import { Image, SafeAreaView, Text, useColorScheme, View } from 'react-native';
import { styles } from './index.style';
import icon from "@/assets/images/icon.png";
import ThemedTextInput from '@/components/ThemedTextInput';
import { useState } from 'react';

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
      </View>
    </SafeAreaView>
  )
}
