import { Colors } from '@/styles/variables';
import React from 'react'
import { StyleSheet, TextInput, useColorScheme } from 'react-native';

type ThemedTextInputProps = {
    value: string;
    setValue: (value: string) => void;
    className?: Object | Array<Object>;
    placeholder: string;
    keyboardType: TextInput['props']['keyboardType'];
    textContentType?: TextInput['props']['textContentType'];
}

export default function ThemedTextInput({ value, setValue, className, placeholder, keyboardType, textContentType }: ThemedTextInputProps) {
    const theme = useColorScheme() ?? 'light';
    const isDark = theme === 'dark';

    return (
        <TextInput 
            keyboardType={keyboardType} 
            value={value} 
            onChangeText={setValue} 
            style={[isDark ? styles.themedInputDark : styles.themedInputLight, className]} 
            placeholder={placeholder} 
            textContentType={textContentType}
            secureTextEntry={textContentType === 'password'}
            placeholderTextColor={isDark ? Colors.dark.inputTextColor : Colors.light.inputTextColor}
        />
    )
}

const styles = StyleSheet.create({
    themedInputLight: {
        backgroundColor: Colors.light.inputColor,
        color: 'black',
        fontFamily: 'Rubik-Regular',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    themedInputDark: {
        backgroundColor: Colors.dark.inputColor,
        color: 'white',
        fontFamily: 'Rubik-Regular',
        borderWidth: 1,
        borderColor: Colors.dark.border
    }
})