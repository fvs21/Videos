import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./Edit.style";
import { ThemedText } from "@/components/ThemedText";
import EditableButton from "./EditableButton";
import { useUser } from "@/store";

export default function Edit() {
    const [user] = useUser();
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.profilePictureContainer}>
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' }} style={styles.profilePicture} />
                <TouchableOpacity>
                    <ThemedText weight="300" type="link">
                        Edit profile picture 
                    </ThemedText>
                </TouchableOpacity>
            </View>
            <View style={styles.editSection}>
                <ThemedText weight="300" type="defaultSemiBold" style={styles.editSectionTitle}>
                    About you
                </ThemedText>
                <EditableButton 
                    text="Username" 
                    currentValue="fabriziovanzani" 
                    onPress={() => {}} 
                />
                <EditableButton 
                    text="Name" 
                    currentValue={user.full_name} 
                    placeholder="Enter your name"
                    onPress={() => {}} 
                />
                <EditableButton 
                    text="Bio" 
                    currentValue={""}
                    placeholder="Write something about yourself"
                    onPress={() => {}} 
                />
            </View>
        </ScrollView>
    )
}