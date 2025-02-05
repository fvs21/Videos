import { Animated, FlatList, Image, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import GoBackButton from "@/components/GoBackButton";
import { ProductDisplay as PD, Store } from "../../types";
import { ThemedText } from "@/components/ThemedText";
import ProductDisplay from "../ProductDisplay";
import PencilFill from "@/components/svgs/PencilFill";
import { useRef, useState } from "react";
import EditStore from "./EditStore";
import { useGetUserStore } from "../../api";

export default function StoreViewer() {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [editMode, setEditMode] = useState(false);
    const isDark = useColorScheme() === "dark";

    const { data, isLoading } = useGetUserStore();

    if(isLoading)
        return <View></View>   
    

    const toggleEditMode = (value: boolean) => {
        // Start fade out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 60,
            useNativeDriver: true,
        }).start(() => {
            // Change mode after fade out
            setEditMode(value);
            // Start fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 60,
                useNativeDriver: true,
            }).start();
        });
    };
    
    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {editMode ? (
                <EditStore setEditMode={toggleEditMode} />
            ) : (
                <ScrollView 
                    style={styles.storeContainer}
                    contentContainerStyle={{ flexGrow: 1 }}  // added contentContainerStyle
                >
                    <View style={styles.storeHeader}>
                        <GoBackButton />
                        <TouchableOpacity onPress={() => toggleEditMode(true)}>
                            <PencilFill width={20} color={isDark ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.storeBody}>
                        <View style={styles.storeInfoContainer}>
                            <Image source={{ uri: data?.store_picture_url || "https://picsum.photos/200/300" }} style={styles.storeImage} />
                            <View style={styles.storeTextContainer}>
                                <ThemedText type="title" weight="300" style={styles.storeName}>
                                    {data?.name}
                                </ThemedText>
                                <View>
                                    <ThemedText type="default" weight="300">
                                        Owned by
                                    </ThemedText>
                                    <View style={styles.storeOwnerInformation}>
                                        <Image source={{ uri: data?.owner_pfp_url }} style={styles.storeOwnerPfp} />
                                        <ThemedText type="default" weight="300">
                                            {data?.owner_full_name ? data.owner_full_name : data?.owner_username}
                                        </ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.productsContainer}>
                            {data?.products.length === 0 ? (
                                <View style={styles.emptyStore}>
                                    <ThemedText type="default" weight="300">
                                        Empty store
                                    </ThemedText>
                                </View>
                            ) : (
                                <FlatList
                                    data={data?.products}
                                    renderItem={({ item }) => <ProductDisplay product={item} />}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={styles.productsList}
                                    numColumns={2}
                                    columnWrapperStyle={{ width: "100%", justifyContent: "space-between", gap: 20 }}
                                    scrollEnabled={false}
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
        </Animated.View>
    );
}