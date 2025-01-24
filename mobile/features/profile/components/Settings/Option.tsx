import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./Settings.style";

type OptionProps = {
    option: string;
    icon?: React.ReactNode;
    click: () => void;
}

export default function Option({option, icon, click}: OptionProps) {
    return (
        <TouchableOpacity style={styles.option} onPress={click}>
            <ThemedText weight="300" type="default" style={[styles.optionText, option === 'Log Out' && styles.logoutText]}>
                {option}
            </ThemedText>
        </TouchableOpacity>
    )
}