export declare function registerUser(data: {
    username: string;
    email: string;
    password: string;
}): Promise<any>;
export declare function login(email: string, password: string): Promise<any>;
export declare function fetchUser(token: string): Promise<any>;
