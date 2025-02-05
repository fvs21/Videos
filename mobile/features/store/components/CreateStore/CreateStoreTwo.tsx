import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { Image as Img, Modal, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./CreateStore.style";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { useCreateStoreImage, useCreateStoreName } from "../../store";
import { useState } from "react";
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from "@/components/BottomSheet";
import Camera from "@/components/svgs/Camera";
import Image from "@/components/svgs/Image";
import * as ImagePicker from 'expo-image-picker';
import CroppableImageSelector from "@/components/CroppableImageSelector";
import { useCreateStore } from "../../api";

export default function CreateStoreTwo() {
    const [name] = useCreateStoreName();
    const [image, setImage] = useCreateStoreImage();
    const isDark = useColorScheme() === 'dark';
    const [imageOptionModal, setImageOptionModal] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    const { create, isPending, createStoreDisabled } = useCreateStore();

    const handleSubmit = async () => {
        if(createStoreDisabled) return;

        try {
            const req = await create({
                name,
                image: image?.file || null
            });
            navigation.navigate("ViewStore");
            
        } catch(error) {
            console.log(error);
        }
    }

    const pickImage = async () => {
        setImageOptionModal(false);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if(!result.canceled) {
            setImage(result.assets[0]);
        }
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
                        <Img source={{uri: image.uri}} style={styles.selectedImageView} />
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
                    <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
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
                    <TouchableOpacity style={styles.selectImageOption} onPress={pickImage}>
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