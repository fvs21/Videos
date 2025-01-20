import React, { useState } from 'react'
import { determineRegistrationStep } from '../../utils';

export default function RegistrationForm() {
    const [step, setStep] = useState(0);

    return determineRegistrationStep(step, setStep);
}