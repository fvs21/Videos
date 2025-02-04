import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { Image as Img, Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./CreateStore.style";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { useCreateStoreImage } from "../../store";
import { useEffect, useRef, useState } from "react";
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from "@/components/BottomSheet";
import Camera from "@/components/svgs/Camera";
import Image from "@/components/svgs/Image";

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
                        <Img source={{uri: URL.createObjectURL(image)}} style={styles.selectedImageView} />
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
            <BottomSheet 
                visible={imageOptionModal} 
                handleClose={() => setImageOptionModal(false)} 
                snapPoints={['25%']}
                backgroundStyle={{backgroundColor: isDark ? "#262626" : "#f2f2f2"}}
                handleIndicatorStyle={{backgroundColor: isDark ? "white" : "gray"}}
            >
                <BottomSheetView>
                    <TouchableOpacity style={styles.selectImageOption} onPress={() => {}}>
                        <View style={styles.selectImageOptionIcon}>
                            <Image width={24} color={isDark ? "white" : "black"} />
                        </View>
                        <ThemedText type="default" weight="300">
                            Choose from gallery
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.selectImageOption} onPress={() => {}}>
                        <View style={styles.selectImageOptionIcon}>
                            <Camera width={24} color={isDark ? "white" : "black"} />
                        </View>
                        <ThemedText type="default" weight="300">
                            Take a photo
                        </ThemedText>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </ThemedSafeAreaView>
    )
}