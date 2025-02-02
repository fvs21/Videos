import PencilFill from "@/components/svgs/PencilFill";
import { FlatList, Image, Modal, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import { ThemedText } from "@/components/ThemedText";
import { Store } from "../../types";
import ProductDisplay from "../ProductDisplay";
import { ProductDisplay as PD } from "../../types";
import CheckCircle from "@/components/svgs/CheckCircle";
import PlusLg from "@/components/svgs/PlusLg";
import { Fragment, useState } from "react";
import GoBackButton from "@/components/GoBackButton";
import XLg from "@/components/svgs/XLg";
import { Colors } from "@/styles/variables";

export default function StoreSetup({setEditMode}: {setEditMode: (value: boolean) => void}) {
    const isDark = useColorScheme() === "dark";

    const [createProductModal, setCreateProductModal] = useState(false);

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
    
    return (
        <Fragment>
            <ScrollView style={styles.storeContainer}>
                <View style={styles.storeHeader}>
                    <View>
                        <GoBackButton />
                    </View>
                    <TouchableOpacity onPress={() => setEditMode(false)}>
                        <CheckCircle width={23} color={isDark ? "white" : "black"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.storeBody}>
                    <View style={styles.storeInfoContainer}>
                        <TouchableOpacity style={styles.editableStoreImage}>
                            <Image source={{ uri: store.store_image }} style={styles.storeImage} />
                            <View style={styles.editableStoreImageOverlay}>
                                <PencilFill width={20} color={"white"}/>
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
                <TouchableOpacity style={styles.addProductButton} onPress={() => setCreateProductModal(true)}>
                    <PlusLg width={24} color="black" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={createProductModal}
                presentationStyle="pageSheet"
                onRequestClose={() => setCreateProductModal(false)}
            >
                <View style={{flex: 1, backgroundColor: isDark ? Colors.dark.background : Colors.light.background}}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setCreateProductModal(false)}>
                            <XLg width={24} color={isDark ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Fragment>
    )
}