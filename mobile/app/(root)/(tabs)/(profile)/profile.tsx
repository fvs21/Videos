import { useUser } from '@/store';
import ThemedSafeAreaView from '@/components/ThemedSafeAreaView';
import ProfileViewer from '@/features/profile/components/ProfileViewer';

export default function Profile() {
    const [user] = useUser();
    
    return (
        <ThemedSafeAreaView>
            <ProfileViewer user={user} />
        </ThemedSafeAreaView>
    );
}