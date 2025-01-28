import { ScrollView, useColorScheme, View } from "react-native";
import Option from "./Option";
import BoxArrowLeft from "@/components/svgs/BoxArrowLeft";
import { styles } from "./Settings.style";
import { Colors } from "@/styles/variables";
import Mailbox from "@/components/svgs/Mailbox";
import Person from "@/components/svgs/Person";
import ShieldLock from "@/components/svgs/ShieldLock";
import Wallet from "@/components/svgs/Wallet";

export default function Settings() {
    const theme = useColorScheme() ?? "light";
    const color = theme === "dark" ? "white" : "black";

    const settingsOptionsCont = [styles.settingsOptionContainer, {borderColor: theme === "dark" ? Colors.dark.border : Colors.light.border}]

    return (
        <ScrollView style={{height: "100%"}}>
            <View style={settingsOptionsCont}>
                <Option 
                    option="Account" 
                    click={() => {}} 
                    icon={<Person width={20} color={color} />}
                />
                <Option
                    option="Security"
                    click={() => {}}
                    icon={<ShieldLock width={20} color={color} />}
                />
                <Option 
                    option="Addresses" 
                    click={() => {}}  
                    icon={<Mailbox width={20} color={color} />}
                />
                <Option
                    option="Payments"
                    click={() => {}}
                    icon={<Wallet width={20} color={color} />}
                    borderBottom={false}
                />
            </View>
            <View style={settingsOptionsCont}>
                <Option 
                    option="Log Out" 
                    click={() => {}} 
                    icon={<BoxArrowLeft width={20} color={"red"} />}
                    borderBottom={false}
                />
            </View>
        </ScrollView>
    )
}