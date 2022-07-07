import { useEffect, useState } from "react";

export const useFormField = (initial = '') => {
    const [val, setVal] = useState(initial);
    return [
        val,
        e => setVal(e.target.value)
    ]
}

export const useUserDetails = () => {
    const [username, updateUsername] = useFormField();
    const [password, updatePassword] = useFormField();

    return [
        { username, password },
        updateUsername,
        updatePassword
    ]
}

/*

Validation:

{
    special: boolean,
    number: boolean,
    uppercase: boolean,
    min: number
}

*/

const setKey = (key, bool) => prev => ({...prev, [key]: [bool, prev[key][1]]})

export const useNewUser = (validation) => {
    const [user, updateUsername, updatePassword] = useUserDetails();
    const [confirmedPassword, updateConfirmedPassword] = useFormField();
    const emptyValidation = {...Object.fromEntries(Object.keys(validation).map(key => [key, [false, validation[key][1]]])), matching: [false, "Passwords match"]}
    const [valid, setValid] = useState(emptyValidation);
    useEffect(() => {
        if (validation.special) {
            const passwordHasSpecial = user.password && /[^\da-zA-Z]/.test(user.password);
            passwordHasSpecial
                ? setValid(setKey("special", true))
                : setValid(setKey("special", false))
        }
        if (validation.number) {
            const passwordHasNumber = user.password && /\d/.test(user.password);
            passwordHasNumber
                ? setValid(setKey("number", true))
                : setValid(setKey("number", false))
        }
        if (validation.uppercase) {
            const passwordHasUppercase = user.password && /[A-Z]/.test(user.password);
            passwordHasUppercase
                ? setValid(setKey("uppercase", true))
                : setValid(setKey("uppercase", false))
        }
        if (validation.min[0] > 0) {
            const passwordIsMinLength = user.password.length >= validation.min[0];
            passwordIsMinLength
                ? setValid(setKey("min", true))
                : setValid(setKey("min", false))
        }
    }, [JSON.stringify(user)])
    useEffect(() => {
        if (!user.password || !confirmedPassword) {
            return;
        }
        if (user.password !== confirmedPassword) {
            return setValid(setKey("matching", false));
        }
        setValid(setKey("matching", true))
    }, [JSON.stringify(user), confirmedPassword])
    return [
        {...user, confirmedPassword},
        updateUsername,
        updatePassword,
        updateConfirmedPassword,
        valid
    ]
}

export const useEditableKeys = array => {
    const [object, setObject] = useState(Object.fromEntries(array.map(key => [key, ''])));
    const updateObject = (key, val) => {
        setObject(prev => ({...prev, [key]: val}))
    }
    return [object, updateObject];
}