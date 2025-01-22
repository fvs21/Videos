import dayjs from "dayjs";
import RegistrationOne from "../components/Registration/RegistrationOne";
import RegistrationTwo from "../components/Registration/RegistrationTwo";
import RegistrationThree from "../components/Registration/RegistrationThree";
import RegistrationFour from "../components/Registration/RegistrationFour";
import RegistrationFive from "../components/Registration/RegistrationFive";
export function determineRegistrationStep(step: number) {
    switch(step) {
        case 0:
            return <RegistrationOne />
        case 1:
            return <RegistrationTwo />
        case 2: 
            return <RegistrationThree />
        case 3:
            return <RegistrationFour />
        case 4:
            return <RegistrationFive />
    }
}

export function validateAge(date: string): boolean {
    const dateOfBirth = dayjs(date);
    return dayjs().diff(dateOfBirth, "year") >= 13;
}

export function validatePassword(password: string): boolean {
    return password.length >= 8;
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatDateOfBirth(date: Date): string {
    return dayjs(date).format("YYYY-MM-DD");
} 

export function validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 16;
}