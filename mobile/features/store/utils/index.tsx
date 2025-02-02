import CreateStoreOne from "../components/CreateStore/CreateStoreOne";

export function determineCreateStoreStep(step: number, setStep: (step: number) => void) {
    switch(step) {
        case 0:
            return <CreateStoreOne step={step} setStep={setStep}/>
    }
}