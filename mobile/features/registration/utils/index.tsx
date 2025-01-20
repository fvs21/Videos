import RegistrationOne from "../components/Registration/RegistrationOne";

export function determineRegistrationStep(step: number, setStep: (num: number) => void) {
    switch(step) {
        case 0:
            return <RegistrationOne />
    }
}