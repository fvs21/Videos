import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { determineCreateStoreStep } from "@/features/store/utils";

export default function Setup({navigation, route}: any) {
    const [step] = route.params.step;

    return (
        <ThemedSafeAreaView>
            {determineCreateStoreStep(Number.parseInt(step))}
        </ThemedSafeAreaView>
    )
}