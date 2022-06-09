import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { history } from '../..';

export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            console.log('trying to log in as existing user')
            console.log(creds);
            const userLoginResponse = await agent.Account.login(creds);
            console.log(`So far so good without exceptions (after logging in - created a new session with id ${userLoginResponse.data.session_id})`)
            console.log(`access token: ${userLoginResponse.data.access_token}`);
            store.commonStore.setToken(userLoginResponse.data.access_token);
            const user = {
                username: creds.username,
                token: userLoginResponse.data.access_token
            } as User;
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        console.log("logging out")
        store.activityStore.clearActivities(); // Added by Ebbe
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            console.log('trying to register new user')
            console.log(creds);
            const user = await agent.Account.register(creds);
            console.log('So far so good without exceptions (1)')
            // store.commonStore.setToken(user.token); // Todo: man får ikke et token tilbage fra php apiet
            // runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}
