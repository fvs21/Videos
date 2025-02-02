import { Animated, FlatList, Image, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import GoBackButton from "@/components/GoBackButton";
import { ProductDisplay as PD, Store } from "../../types";
import { ThemedText } from "@/components/ThemedText";
import ProductDisplay from "../ProductDisplay";
import PencilFill from "@/components/svgs/PencilFill";
import { useRef, useState } from "react";
import StoreSetup from "./StoreSetup";

export default function StoreViewer() {
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
            product_image: "https://img.kwcdn.com/product/fancy/market/5107d6f0859767b6350d6e1bfce05e0b_20xV8yDwi9xvh.jpg?imageView2/2/w/800/q/70/format/webp"
        },
        {
            id: "2",
            name: "Product 2",
            price: 200,
            product_image: "https://img.kwcdn.com/product/fancy/a34a45ca-56f5-4c9e-9636-a0d3ac11808f.jpg?imageView2/2/w/800/q/70/format/webp"
        },
        {
            id: "3",
            name: "Product 3",
            price: 300,
            product_image: "https://img.kwcdn.com/product/fancy/4e131408-f81f-40a4-ae23-815be0836ea4.jpg?imageView2/2/w/800/q/70/format/webp"
        },
        {
            id: "4",
            name: "Product 4",
            price: 400,
            product_image: "https://img.kwcdn.com/product/fancy/ce1454c4-92c1-4e85-8269-b8245053b09f.jpg?imageView2/2/w/800/q/70/format/webp"
        },
        {
            id: "5",
            name: "Product 5",
            price: 500,
            product_image: "https://img.kwcdn.com/product/fancy/eea1b227-b3f3-4b43-874c-1391e586c0e5.jpg?imageView2/2/w/800/q/70/format/webp"
        },
        {
            id: "6",
            name: "Product 6",
            price: 600,
            product_image: "https://picsum.photos/200/300"
        }
    ]

    const isDark = useColorScheme() === "dark";

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