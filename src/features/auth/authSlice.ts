import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk";
import {auth} from "@/main";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {LoginParamsType} from "@/components/auth/SignIn";


export type AuthState = {
    user: LoginParamsType | null,
    isAuthenticated: boolean,
}

/*type User = {
    email: '',
    password: '',
}*/

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
}

export const signUp = createAppAsyncThunk(
    'auth/signUp',
    async (formData: LoginParamsType) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            setUser(user);
        } catch (error) {
            const errorMessage = error;
            console.log(errorMessage);
        }
    }
)

export const signIn = createAppAsyncThunk(
    'auth/signUp',
    async (formData: LoginParamsType) => {
        try {
            const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setUser(user);
        } catch (error) {
            const errorMessage = error;
            console.log(errorMessage);
        }
    }
);

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;