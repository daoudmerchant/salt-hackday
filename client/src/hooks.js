import { useEffect, useState } from "react";

export const useUserDetails = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return [
        { username, password },
        e => setUsername(e.target.value),
        e => setPassword(e.target.value)
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

const setKey = (key, bool) => prev => ({...prev, [key]: bool})

export const useNewUser = (validation) => {
    const [user, updateUsername, updatePassword] = useUserDetails();
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const emptyValidation = {...Object.fromEntries(Object.keys(validation).map(key => [key, false])), matching: false}
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
            console.log("UPPERCASE: ", passwordHasUppercase);
            passwordHasUppercase
                ? setValid(setKey("uppercase", true))
                : setValid(setKey("uppercase", false))
        }
        if (validation.min > 0) {
            const passwordIsMinLength = user.password.length >= validation.min;
            passwordIsMinLength
                ? setValid(setKey("min", true))
                : setValid(setKey("min", false))
        }
    }, [JSON.stringify(user)])
    useEffect(() => {
        console.log("RUNNING")
        if (!user.password || !confirmedPassword) {
            return;
        }
        if (user.password !== confirmedPassword) {
            return setValid(setKey("matching", false));
        }
        console.log("Matches!")
        setValid(setKey("matching", true))
    }, [JSON.stringify(user), confirmedPassword])
    return [
        {...user, confirmedPassword},
        updateUsername,
        updatePassword,
        e => setConfirmedPassword(e.target.value),
        valid
    ]
}