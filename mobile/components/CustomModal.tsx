import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";

type CustomModalProps = {
    children: React.ReactNode;
    style?: Object | Object[];
    visible: boolean;
    handleClose?: () => void;
}

export default function CustomModal({children, style, visible, handleClose}: CustomModalProps) {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if(visible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);

    return (
        <FullWindowOverlay>
            <GestureHandlerRootView style={{flex: 1, justifyContent: "center"}}>
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            ref={bottomSheetRef} 
                            index={1} 
                            snapPoints={['60%','90%']} 
                            onDismiss={() => bottomSheetRef.current?.dismiss()}
                        >
                            <TouchableWithoutFeedback onPress={() => {
                                bottomSheetRef.current?.dismiss();
                                handleClose && handleClose();
                            }}>
                                {children}
                            </TouchableWithoutFeedback>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </GestureHandlerRootView>
        </FullWindowOverlay>
    )
}