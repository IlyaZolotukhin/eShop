import {createSlice} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "@/utils/create-app-async-thunk";
import {auth} from "@/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

export type LoginParamsType = {
    email: string,
    password: string,
}

export type AuthState = {
    error: string,
    user: LoginParamsType | null,
    isAuthenticated: boolean,
}

/*type User = {
    email: string;
    password: string;
}*/

const initialState: AuthState = {
    error: '',
    user: null,
    isAuthenticated: false,
}

export const signUp = createAppAsyncThunk(
    'auth/signUp',
    async (formData: LoginParamsType, thunkAPI) => {
        const { dispatch } = thunkAPI
        try {
            const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            dispatch(createUser(user.user));
        } catch (error: any) {
            const errorCode = error.code;
            dispatch(setError(errorCode));
        }
    }
)

export const signIn = createAppAsyncThunk(
    'auth/signIn',
    async (formData: LoginParamsType, thunkAPI) => {
        const { dispatch } = thunkAPI
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)

            dispatch(logIn());
            const user = userCredential.user;
            console.log(user)
        } catch (error: any) {
            const errorCode = error.code;
            dispatch(setError(errorCode));
        }
    }
);

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        createUser(state, action) {
            const user: LoginParamsType = action.payload.user;
            state.user = {
                email: user.email,
                password: user.password
            };
            state.error = '';
        },
        logIn(state) {
            state.isAuthenticated = true;
            state.error = '';
        },
        logOut(state) {
            state.isAuthenticated = false;
            state.error = '';
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { createUser, logIn, logOut, setError } = authSlice.actions;

export default authSlice.reducer;