import { View } from "react-native";
import { styles } from "./Registration.style";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import AuthenticationInput from "@/components/AuthenticationInput";
import { useState } from "react";
import GoBackButton from "@/components/GoBackButton";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { validateAge } from "../../utils";
import PrimaryDisabledButton from "@/components/PrimaryDisabledButton";
import { useDateOfBirthAtom } from "../../store";
import { useNavigation } from "expo-router";

export default function RegistrationOne() {
    const [dateOfBirth, setDateOfBirth] = useDateOfBirthAtom();
    const [displayedDate, setDisplayedDate] = useState(dateOfBirth.toDateString());
    const [validAge, setValidAge] = useState(validateAge(dateOfBirth.toDateString()));
    const navigation = useNavigation<any>();

    function changeDate(event: DateTimePickerEvent, selectedDate: Date | undefined) {
        if(selectedDate === undefined) return;

        setDisplayedDate(selectedDate.toDateString());
        setDateOfBirth(selectedDate);
        setValidAge(validateAge(selectedDate.toDateString()));
    }

    function nextStep() {
        if(!validAge) {
            console.log("Not valid");
            return;
        }   

        navigation.push('Register', {step: '1'});
    }

    return (
        <View style={styles.registrationStep}>
            <View style={styles.header}>
                <View style={{paddingBottom: 20}}>
                    <GoBackButton />
                </View>
                <ThemedText style={styles.title} weight='300' type='title'>
                    When's your birthdate?
                </ThemedText>
            </View>
            <View style={styles.registrationBody}>
                <View>
                    <ThemedText 
                        weight='300' 
                        type='defaultSemiBold' 
                        style={styles.label}>
                            Select your birthdate
                    </ThemedText>
                    <AuthenticationInput
                        value={displayedDate}
                        setValue={() => {}}
                        style={styles.registrationInput}
                        editable={false}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateOfBirth || new Date()}
                        onChange={changeDate}
                        mode="date"
                        display="spinner"
                    />
                </View>
                <PrimaryDisabledButton  
                    text="Next"
                    click={nextStep}
                    disabled={!validAge}
                />
            </View>
        </View>
    )
}