import { atom } from 'recoil';

export const CurrentUserState = atom({
    key: 'CurrentUser',
    default: undefined,
})

export default CurrentUserState;