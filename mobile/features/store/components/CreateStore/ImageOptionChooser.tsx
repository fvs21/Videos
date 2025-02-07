import BottomSheet from "@/components/BottomSheet";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./CreateStore.style";
import Image from "@/components/svgs/Image";
import { ThemedText } from "@/components/ThemedText";
import Camera from "@/components/svgs/Camera";

type ImageOptionChooserProps = {
    imageOptionModal: boolean;
    setImageOptionModal: (value: boolean) => void;
    onPressGallery: () => void;
    onPressCamera: () => void;
}

export default function ImageOptionChooser({ imageOptionModal, setImageOptionModal, onPressCamera, onPressGallery }: ImageOptionChooserProps) {
    const isDark = useColorScheme() === "dark";
    return (
        <BottomSheet 
            visible={imageOptionModal} 
            handleClose={() => setImageOptionModal(false)} 
            snapPoints={['25%']}
            backgroundStyle={{backgroundColor: isDark ? "#262626" : "#f2f2f2"}}
            handleIndicatorStyle={{backgroundColor: isDark ? "white" : "gray"}}
        >
            <BottomSheetView>
                <TouchableOpacity style={styles.selectImageOption} onPress={onPressGallery}>
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
    )
}