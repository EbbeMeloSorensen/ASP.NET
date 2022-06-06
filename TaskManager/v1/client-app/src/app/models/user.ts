// For receiving an Http request response FROM the Web API
export interface UserResponse {
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

// For sending an Http request TO the Web API
// (notice that we send the password)
export interface User {
    fullname: string;
    username: string;
    password: string;
}