import React from 'react'
import { SafeAreaView, Text, useColorScheme, View } from 'react-native'
import { styles } from './index.style'

export default function Index() {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={[styles.indexContainer, isDark ? styles.darkMain : styles.lightMain]}>
        <Text style={{color: isDark ? "white" : "black"}}>Index</Text>
    </SafeAreaView>
  )
}
