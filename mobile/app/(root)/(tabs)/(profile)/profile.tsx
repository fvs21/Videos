import { View, TouchableOpacity, useColorScheme, Image, ScrollView, Text } from 'react-native';
import { useUser } from '@/store';
import { styles } from './profile.style';
import { ThemedText } from '@/components/ThemedText';
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView';
import PersonFill from '@/components/svgs/PersonFill';
import ProfileViewer from '@/features/profile/components/ProfileViewer';

export default function Profile() {
    const [user] = useUser();
    
    return (
        <ThemedSafeAreaView>
            <ProfileViewer user={user} />
        </ThemedSafeAreaView>
    );
}