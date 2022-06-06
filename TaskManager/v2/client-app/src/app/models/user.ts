export interface User {
    username: string;
    token: string;
}

export interface UserFormValues {
    fullName?: string;
    username?: string;
    password: string;
}

// For receiving an Http request response FROM the Web API
export interface UserRegistrationResponse {
    statusCode: number;
    success: boolean;
    messages: string[];
    data: UserData;
}

// For receiving an Http request response FROM the Web API
// (notice that we don't receive the password)
export interface UserData {
    user_id: string;
    fullname: string;
    username: string;
}

export interface UserLoginValues {
    username?: string;
    password: string;
}

export interface UserLoginResponse {
    statusCode: number;
    success: boolean;
    messages: string[];
    data: SessionData;
}

export interface SessionData {
    session_id: number;
    access_token: string;
    access_token_expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
}
