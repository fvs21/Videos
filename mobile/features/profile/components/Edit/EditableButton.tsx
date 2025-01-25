import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./Edit.style";

type EditableButtonProps = {
    text: string;
    currentValue: string;
    onPress: () => void;
    placeholder?: string;
}

export default function EditableButton({ text, currentValue, onPress, placeholder }: EditableButtonProps) {
    return (
        <TouchableOpacity style={styles.editableButton} onPress={onPress}>
            <View style={styles.editableTagContainer}>
                <ThemedText weight="300" type="default">
                    {text}
                </ThemedText>
            </View>
            <View>
                {!currentValue ? 
                    <ThemedText weight="300" type="default" style={styles.editablePlaceholder}>
                        {placeholder}
                    </ThemedText>
                : (
                    <ThemedText weight="300" type="default">
                        {currentValue}
                    </ThemedText>
                )}
            </View>
        </TouchableOpacity>
    )
}