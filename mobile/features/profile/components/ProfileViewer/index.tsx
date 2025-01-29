import { Image, ScrollView, TouchableOpacity, View, useColorScheme } from "react-native";
import { styles } from "./ProfileViewer.style";
import { ThemedText } from "@/components/ThemedText";
import { User } from "@/types/globals";
import PersonFill from "@/components/svgs/PersonFill";
import { useUser } from "@/store";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Shop from "@/components/svgs/Shop";

export default function ProfileViewer({user} : {user: User}) {
    const theme = useColorScheme() ?? 'light';
    const isDark = theme === 'dark';

    const navigation = useNavigation<any>();

    const [currentUser] = useUser();
    const isCurrentUsersAccount = currentUser.username === user.username;

    return (
        <React.Fragment>
            <View style={styles.fixedHeader}>
                <ThemedText weight="300" type="defaultSemiBold" style={styles.headerUsername}>
                    {user.username}
                </ThemedText>
                <View style={styles.topButtons}>
                    <TouchableOpacity style={styles.optionsButton}>
                        <Shop width={20} color={isDark ? 'white' : 'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionsButton} onPress={() => navigation.navigate('Configuration')}>
                        <ThemedText weight="300" type="defaultSemiBold" style={styles.headerUsername}>
                            •••
                        </ThemedText>
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.profileSection}>
                    <View style={styles.photoContainer}>
                        {true ? (
                            <Image 
                                source={{ uri: user.pfp_url }} 
                                style={styles.photo}
                            />
                        ) : (
                            <View style={{ padding: 20, borderWidth: 1, borderColor: 'red' }}>
                                <PersonFill width={40} color={isDark ? 'white' : 'black'} />
                            </View>
                        )}
                    </View>
                    <View style={styles.userInfo}>
                        <ThemedText weight="300" type="defaultSemiBold" style={styles.fullName}>Fabrizio Vanzani</ThemedText>
                    </View>
                    {isCurrentUsersAccount &&
                        <View style={styles.editProfileButtonContainer}>
                            <TouchableOpacity style={[styles.editProfileButton, isDark ? styles.editProfileButtonDark : styles.editProfileButtonLight]} onPress={() => navigation.navigate('EditProfile')}>
                                <ThemedText weight="300" type="defaultSemiBold" style={styles.editProfileButtonText}>
                                    Edit Profile
                                </ThemedText>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <View style={styles.statsRow}>
                    <TouchableOpacity style={styles.statItem}>
                        <ThemedText weight="300" type="defaultSemiBold" style={styles.statValue}>
                            0
                        </ThemedText>
                        <ThemedText weight="300" type="default" style={styles.statLabel}>
                            Posts
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                        <ThemedText weight="300" type="defaultSemiBold" style={styles.statValue}>
                            0
                        </ThemedText>
                        <ThemedText weight="300" type="default" style={styles.statLabel}>
                            Followers
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statItem}>
                        <ThemedText weight="300" type="defaultSemiBold" style={styles.statValue}>
                            0
                        </ThemedText>
                        <ThemedText weight="300" type="default" style={styles.statLabel}>
                            Following
                        </ThemedText>
                    </TouchableOpacity>
                </View>
                <ThemedText weight="300" type="defaultSemiBold" style={styles.sectionTitle}>
                    Posts
                </ThemedText>
            </ScrollView>
        </React.Fragment>
    )
}