import { StyleSheet, Text, TextInput, TextInputProps, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/styles/variables";

type LabeledInputProps = TextInputProps & {
    value: any;
    setValue: (value: any) => void;
    label: string;
    placeholder?: string;
    style: Object | Array<Object>;
}

export default function LabeledInput({value, setValue, label, placeholder, style, ...props}: LabeledInputProps) {
    const isDark = useColorScheme() === "dark";

    return (
        <View style={{gap: 8}}>
            <ThemedText weight="300" type="defaultSemiBold" style={styles.label}>
                {label}
            </ThemedText>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={[style, styles.input, isDark ? styles.inputDark : styles.inputLight]}
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
    },
    inputDark: {
        borderColor: Colors.dark.border
    },
    inputLight: {
        borderColor: Colors.light.border
    },
    label: {
        fontSize: 14,
    }
})