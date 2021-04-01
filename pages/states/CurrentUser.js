import { atom } from 'recoil';

export const CurrentUserState = atom({
    key: 'currentUser',
    default: undefined,
})

export default CurrentUserState;