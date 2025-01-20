import RegistrationOne from "../components/Registration/RegistrationOne";
import RegistrationTwo from "../components/Registration/RegistrationTwo";

export function determineRegistrationStep(step: number) {
    switch(step) {
        case 0:
            return <RegistrationOne />
        case 1:
            return <RegistrationTwo />
    }
}