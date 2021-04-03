import User from '../types/any';
import { atom } from 'recoil';

export const CurrentUserState = atom< undefined | null | User>({
    key: 'CurrentUser',
    default: undefined,
})

export default CurrentUserState;