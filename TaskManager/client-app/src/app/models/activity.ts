export interface Response {
    statusCode: number;
    success: boolean;
    messages: string[];
    data: Data;
}

export interface Data {
    rows_returned: number;
    tasks: Task[];
}

export interface Task {
    id: number,
    title: string,
    description: string,
    deadline: string,
    completed: string
}