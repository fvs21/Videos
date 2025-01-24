import { View, TouchableOpacity, useColorScheme, Image, ScrollView, Text } from 'react-native';
import { useUser } from '@/store';
import { styles } from './profile.style';
import { ThemedText } from '@/components/ThemedText';
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView';
import PersonFill from '@/components/svgs/PersonFill';
import ProfileViewer from '@/features/profile/components/ProfileViewer';

export default function Profile() {
    const [user] = useUser();
    const theme = useColorScheme() ?? 'light';
    const isDark = theme === 'dark';


    const handleOptions = () => {
        //router.push('/options');
    };

    if (!user) return null;

    return (
        <ThemedSafeAreaView>
            <ProfileViewer user={user} />
        </ThemedSafeAreaView>
    );
}