import { ScrollView } from "react-native";
import Option from "./Option";

export default function Settings() {
    return (
        <ScrollView style={{height: "100%"}}>
            <Option option="Log Out" click={() => {}} />
        </ScrollView>
    )
}