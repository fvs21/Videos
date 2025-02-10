import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity, View, useColorScheme } from "react-native";
import { styles } from "./Settings.style";
import { Colors } from "@/styles/variables";

type OptionProps = {
    option: string;
    icon?: React.ReactNode;
    click: () => void;
    borderBottom?: boolean;
}

export default function Option({option, icon, click, borderBottom = true}: OptionProps) {
    const theme = useColorScheme() ?? "light";
    const borderColor = theme === "dark" ? Colors.dark.border : Colors.light.border;

    return (
        <TouchableOpacity style={[styles.option, borderBottom && {borderBottomWidth: 0, borderBottomColor: borderColor}]} onPress={click}>
            <View style={styles.optionIcon}>
                {icon}
            </View>
            <ThemedText weight="300" type="default" style={[styles.optionText, option === 'Log Out' && styles.logoutText]}>
                {option}
            </ThemedText>
        </TouchableOpacity>
    )
}