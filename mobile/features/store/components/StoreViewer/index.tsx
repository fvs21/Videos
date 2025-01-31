import { Animated, FlatList, Image, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import GoBackButton from "@/components/GoBackButton";
import { ProductDisplay as PD, Store } from "../../types";
import { ThemedText } from "@/components/ThemedText";
import ProductDisplay from "../ProductDisplay";
import PencilFill from "@/components/svgs/PencilFill";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import StoreSetup from "./StoreSetup";

export default function StoreViewer() {
    const navigation = useNavigation<any>();
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [editMode, setEditMode] = useState(false);
    
    const store: Store = {
        id: "1",
        name: "Cock n' Balls",
        store_image: "https://picsum.photos/200/300",
        owner_username: "testuser",
        owner_name: "fabriziovanzani",
        owner_pfp_url: "https://picsum.photos/200/300"
    }

    const products: PD[] = [
        {
            id: "1",
            name: "Product 1 fdsanfjkdlsanfjdsaln dbsahjdb sahdbsahufkbdsah",
            price: 100,
            product_image: "https://picsum.photos/200/300"
        },
        {
            id: "2",
            name: "Product 2",
            price: 200,
            product_image: "https://picsum.photos/200/300"
        },
        {
            id: "3",
            name: "Product 3",
            price: 300,
            product_image: "https://picsum.photos/200/300"
        }
    ]

    const isDark = useColorScheme() === "dark";

    const toggleEditMode = (value: boolean) => {
        // Start fade out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            // Change mode after fade out
            setEditMode(value);
            // Start fade in
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();
        });
    };
    
    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {editMode ? (
                <StoreSetup setEditMode={toggleEditMode} />
            ) : (
                <ScrollView style={styles.storeContainer}>
                    <View style={styles.storeHeader}>
                        <GoBackButton />
                        <TouchableOpacity onPress={() => toggleEditMode(true)}>
                            <PencilFill width={20} color={isDark ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.storeBody}>
                        <View style={styles.storeInfoContainer}>
                            <Image source={{ uri: store.store_image }} style={styles.storeImage} />
                            <View style={styles.storeTextContainer}>
                                <ThemedText type="title" weight="300" style={styles.storeName}>
                                    {store.name}
                                </ThemedText>
                                <View>
                                    <ThemedText type="default" weight="300">
                                        Owned by
                                    </ThemedText>
                                    <View style={styles.storeOwnerInformation}>
                                        <Image source={{ uri: store.owner_pfp_url }} style={styles.storeOwnerPfp} />
                                        <ThemedText type="default" weight="300">
                                            {store.owner_name}
                                        </ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.productsContainer}>
                        <FlatList
                            data={products}
                            renderItem={({ item }) => <ProductDisplay product={item} />}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.productsList}
                            numColumns={2}
                            columnWrapperStyle={{ width: "100%", justifyContent: "space-between", gap: 20 }}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            )}
        </Animated.View>
    );
}