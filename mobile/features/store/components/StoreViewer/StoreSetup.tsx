import PencilFill from "@/components/svgs/PencilFill";
import { FlatList, Image, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import GoBackButton from "@/components/GoBackButton";
import { ThemedText } from "@/components/ThemedText";
import { Store } from "../../types";
import ProductDisplay from "../ProductDisplay";
import { ProductDisplay as PD } from "../../types";
import CheckCircle from "@/components/svgs/CheckCircle";
import PlusLg from "@/components/svgs/PlusLg";
import { Fragment } from "react";

export default function StoreSetup({setEditMode}: {setEditMode: (value: boolean) => void}) {
    const isDark = useColorScheme() === "dark";

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
        },
        {
            id: "4",
            name: "Product 4",
            price: 400,
            product_image: "https://picsum.photos/200/300"
        },
        {
            id: "5",
            name: "Product 5",
            price: 500,
            product_image: "https://picsum.photos/200/300"
        },
        {
            id: "6",
            name: "Product 6",
            price: 600,
            product_image: "https://picsum.photos/200/300"
        }
    ]
    
    return (
        <Fragment>
            <ScrollView style={styles.storeContainer}>
                <View style={styles.storeHeader}>
                    <GoBackButton />
                    <TouchableOpacity onPress={() => setEditMode(false)}>
                        <CheckCircle width={23} color={isDark ? "white" : "black"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.storeBody}>
                    <View style={styles.storeInfoContainer}>
                        <TouchableOpacity style={styles.editableStoreImage}>
                            <Image source={{ uri: store.store_image }} style={styles.storeImage} />
                            <View style={styles.editableStoreImageOverlay}>
                                <PencilFill width={20} color={isDark ? "white" : "black"}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.storeTextContainer}>
                            <View style={styles.editableStoreName}>
                                <ThemedText type="title" weight="300" style={styles.storeName}>
                                    {store.name}
                                </ThemedText>
                                <TouchableOpacity>
                                    <PencilFill width={20} color={isDark ? "white" : "black"} />
                                </TouchableOpacity>
                            </View>
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
            <View style={styles.editableStoreFooter}>
                <TouchableOpacity style={styles.addProductButton}>
                    <PlusLg width={24} color="black" />
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}