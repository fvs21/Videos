import { Text, View } from "react-native";
import { styles } from "./ProductImageSlider.style";

type PaginationProps = {
    current_index: number;
    total: number;
}

export default function Pagination({current_index, total}: PaginationProps) {
    return (
        <View style={styles.paginationContainer}>
            <Text style={styles.paginationCount}>{current_index+1}/{total}</Text>
        </View>
    )
}