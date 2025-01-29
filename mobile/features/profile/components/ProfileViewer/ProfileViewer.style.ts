import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/styles/variables";

const { width } = Dimensions.get('window');
const PHOTO_SIZE = 80;
const POST_WIDTH = (width - 40 - 2) / 3; // 40 for container padding, 2 for gaps

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 15,
        gap: 5,
    },
    photoContainer: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: PHOTO_SIZE / 2,
        backgroundColor: Colors.light.background,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 22,
        fontFamily: 'Rubik-SemiBold',
        marginBottom: 4,
    },
    fullName: {
        fontSize: 16,
        fontFamily: 'Rubik-SemiBold',
        marginTop: 12,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'Rubik-Medium',
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'Rubik-Regular',
        opacity: 0.7,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Rubik-Medium',
        marginBottom: 15,
    },
    editProfileButtonContainer: {
        marginTop: 10,
    },
    editProfileButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
    },
    editProfileButtonLight: {
        borderColor: Colors.light.border,
    },
    editProfileButtonDark: {
        borderColor: Colors.dark.border,
    },
    editProfileButtonText: {
        fontSize: 15,
        fontFamily: 'Rubik-Medium',
    },
    fixedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerUsername: {
        fontSize: 22,
        fontFamily: 'Rubik-Medium',
    },
    optionsButton: {
        padding: 8,
    },
    topButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
}); 