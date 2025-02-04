import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { Button, Image, Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./CreateStore.style";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { useCreateStoreImage } from "../../store";
import { checkValidImageType } from "../../utils";
import { useRef, useState } from "react";
import BottomSheet, { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";
import CustomModal from "@/components/CustomModal";

export default function CreateStoreTwo() {
    const [image, setImage] = useCreateStoreImage();
    const isDark = useColorScheme() === 'dark';
    const [imageOptionModal, setImageOptionModal] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    const handleSubmit = async () => {

    }

    return (
        <ThemedSafeAreaView>
            <View style={styles.header}>
                <GoBackButton />
                <View style={styles.title}>
                    <ThemedText type="title" weight="300">
                        Select your store image
                    </ThemedText>
                    <ThemedText type="subtitle" weight="300">
                        (optional)
                    </ThemedText>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.storeImageContainer}>
                    {image ? 
                        <Image source={{uri: URL.createObjectURL(image)}} style={styles.selectedImageView} />
                    :
                        <View style={[styles.notSelectedImageView, isDark ? {backgroundColor: "#262626"} : {backgroundColor: "#f2f2f2"}]}>
                        </View>
                    }
                    <View style={styles.changeImageContainer}>
                        <TouchableOpacity onPress={() => setImageOptionModal(true)}>
                            <Text style={styles.changeImageText}>
                                Select image
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.push("SetupStore", {step: '1'})}>
                        <Text style={{color: "white", fontSize: 16, fontFamily: "Rubik-Regular"}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CustomModal visible={imageOptionModal} handleClose={() => setImageOptionModal(false)}>
                <BottomSheetView>
                    <Text>Test</Text>
                </BottomSheetView>
            </CustomModal>
        </ThemedSafeAreaView>
    )
}