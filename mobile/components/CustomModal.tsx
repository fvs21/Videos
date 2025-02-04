import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";

type CustomModalProps = {
    children: React.ReactNode;
    style?: Object | Object[];
    visible: boolean;
    handleClose: () => void;
}

export default function CustomModal({children, style, visible, handleClose}: CustomModalProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const renderBackdrop = useCallback((props: any) => 
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />, []);

    useEffect(() => {
        if(visible) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [visible]);

    return (
        <FullWindowOverlay>
            <GestureHandlerRootView style={{flex: 1, justifyContent: "center"}}>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={['40%']}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                    onClose={handleClose}
                >
                    <BottomSheetView>
                        <Text>Test</Text>
                    </BottomSheetView>
                </BottomSheet>
            </GestureHandlerRootView>
        </FullWindowOverlay>
    )
}