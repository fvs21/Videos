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

    const settingsOptionsCont = [styles.settingsOptionContainer, {
        borderBottomWidth: 6,
        borderColor: theme === "dark" ? Colors.dark.inputColor : "#f2f2f2"
    }]

    return (
        <ScrollView style={{height: "100%", backgroundColor: theme === "dark" ? Colors.dark.background : Colors.light.background}}>
            <View style={settingsOptionsCont}>
                <Option 
                    option="Account" 
                    click={() => {}} 
                    icon={<Person width={22} color={color} />}
                />
                <Option
                    option="Security"
                    click={() => {}}
                    icon={<ShieldLock width={22} color={color} />}
                />
                <Option 
                    option="Addresses" 
                    click={() => {}}  
                    icon={<Mailbox width={22} color={color} />}
                />
                <Option
                    option="Payments"
                    click={() => {}}
                    icon={<Wallet width={22} color={color} />}
                    borderBottom={false}
                />
            </View>
            <View>
                <Option 
                    option="Log Out" 
                    click={() => {}} 
                    icon={<BoxArrowLeft width={22} color={"red"} />}
                    borderBottom={false}
                />
            </View>
        </ScrollView>
    )
}