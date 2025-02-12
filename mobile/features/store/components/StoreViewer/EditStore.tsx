import PencilFill from "@/components/svgs/PencilFill";
import { FlatList, Image, Modal, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { styles } from "./StoreViewer.style";
import { ThemedText } from "@/components/ThemedText";
import ProductDisplay from "../ProductDisplay";
import CheckCircle from "@/components/svgs/CheckCircle";
import PlusLg from "@/components/svgs/PlusLg";
import { Fragment, useState } from "react";
import GoBackButton from "@/components/GoBackButton";
import { Colors } from "@/styles/variables";
import { useGetUserStore } from "../../api";
import { useNavigation } from "@react-navigation/native";

export default function EditStore({setEditMode}: {setEditMode: (value: boolean) => void}) {
    const isDark = useColorScheme() === "dark";

    const { data, isLoading } = useGetUserStore();

    const navigator = useNavigation<any>();

    if(isLoading)
        return <View></View>
    
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
                            <Image source={{ uri: data?.store_picture_url || "https://picsum.photos/200/300" }} style={styles.storeImage} />
                            <View style={styles.editableStoreImageOverlay}>
                                <PencilFill width={20} color={"white"}/>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.storeTextContainer}>
                            <TouchableOpacity style={[styles.editableStoreName, {borderColor: isDark ? Colors.dark.border : Colors.light.border}]}>
                                <ThemedText type="title" weight="300" style={styles.storeName}>
                                    {data?.name}
                                </ThemedText>
                            </TouchableOpacity>
                            <View>
                                <ThemedText type="default" weight="300">
                                    Owned by
                                </ThemedText>
                                <View style={styles.storeOwnerInformation}>
                                    <Image source={{ uri: data?.owner_pfp_url }} style={styles.storeOwnerPfp} />
                                    <ThemedText type="default" weight="300">
                                        {data?.owner_full_name || data?.owner_username}
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.productsContainer}>
                    <FlatList
                        data={data?.products}
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
                <TouchableOpacity style={styles.addProductButton} onPress={() => navigator.navigate("CreateProduct")}>
                    <PlusLg width={24} color="black" />
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}