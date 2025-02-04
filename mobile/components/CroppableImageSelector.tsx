import { hasAndroidPhotosPermission } from "@/utils";
import { useLayoutEffect, useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";

export default function CroppableImageSelector() {
    const [photos, setPhotos] = useState();

    useLayoutEffect(() => {
        async function load() {
            if(Platform.OS === 'android' && !(await hasAndroidPhotosPermission())) {
                return;
            }

        }

        load();
    }, []);

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