import { useState } from "react";
import { determineCreateStoreStep } from "../../utils";

export default function CreateStoreMain() {
    const [step, setStep] = useState<number>(0);

    return determineCreateStoreStep(step, setStep);
}