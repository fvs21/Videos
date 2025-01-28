import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    profilePictureContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: "50%"
    },
    editSection: {
        display: 'flex',
        flexDirection: 'column',
    },
    editSectionTitle: {
        marginTop: 20,
        paddingHorizontal: 18,
        paddingBottom: 12,
        fontSize: 18
    },
    editableButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    editableTagContainer: {
        width: "32%"
    },
    editablePlaceholder: {
        color: "gray"
    },
    privateInfoNote: {
        paddingHorizontal: 18,
        paddingBottom: 8,
        fontSize: 14,
        color: "gray"
    }
})