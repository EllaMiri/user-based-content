import {useState} from "react";

export default function useFormValidation() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const addPostform = event.currentTarget;
        if (addPostform.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
}}

