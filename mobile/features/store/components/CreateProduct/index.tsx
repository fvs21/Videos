import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./CreateProduct.style";
import { Colors } from "@/styles/variables";
import { useState } from "react";
import Images from "@/components/svgs/Images";
import ThemedTextInput from "@/components/ThemedTextInput";
import LabeledInput from "@/components/LabeledInput";

export default function CreateProduct() {
    const isDark = useColorScheme() === "dark";

    const [images, setImages] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    
    return (
        <ScrollView 
            style={styles.createProductContainer}
            automaticallyAdjustKeyboardInsets
        >
            <View style={[styles.addImagesContainer, { 
                borderColor: isDark ? Colors.dark.border : Colors.light.border
             }]}>
                {images.length === 0 ? (
                    <TouchableOpacity style={styles.addImagesIcon}>
                        <Images width={30} color={isDark ? Colors.dark.inputTextColor : Colors.light.inputTextColor} />
                        <Text style={{ 
                            color: isDark ? Colors.dark.inputTextColor : Colors.light.inputTextColor, 
                            fontFamily: "Rubik-Regular",
                            fontSize: 16
                        }}>
                            Add Images
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View>

                    </View>
                )}
            </View>
            <View style={styles.inputFieldContainer}>
                <LabeledInput 
                    value={name} 
                    setValue={setName} 
                    placeholder="Product Name" 
                    style={styles.inputField} 
                    label="Name" 
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <LabeledInput
                    value={price}
                    setValue={setPrice}
                    placeholder="$"
                    label="Price"
                    style={styles.inputField}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <LabeledInput
                    value={description}
                    setValue={setDescription}
                    placeholder="Description"
                    label="Description"
                    style={styles.inputField}
                    multiline
                    numberOfLines={4}
                />
            </View>
        </ScrollView>
    )
}