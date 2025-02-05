import { hasAndroidPhotosPermission } from "@/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';

type CroppableImageSelectorProps = {
    image: ImagePicker.ImagePickerAsset;
    setImage: (image: ImagePicker.ImagePickerAsset) => void;
}

export default function CroppableImageSelector({ image, setImage }: CroppableImageSelectorProps) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageViewerContainer}> 
                
            </View>
            <View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    imageViewerContainer: {
        width: "100%",
        aspectRatio: "1 / 1",
    },
    imageViewer: {
        width: "100%",
        height: "100%"
    }
})