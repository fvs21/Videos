import { default as BS, BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";

type CustomModalProps = {
    children: React.ReactNode;
    style?: Object | Object[];
    visible: boolean;
    handleClose: () => void;
    snapPoints: (number | `${number}%`)[];
    [key: string]: any;
}

export default function BottomSheet({children, style, visible, handleClose, snapPoints, ...props}: CustomModalProps) {
    const bottomSheetRef = useRef<BS>(null);

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
                <BS
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                    onClose={handleClose}
                    {...props}
                >
                    {children}
                </BS>
            </GestureHandlerRootView>
        </FullWindowOverlay>
    )
}