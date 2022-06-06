export interface TaskResponse {
    statusCode: number;
    success: boolean;
    messages: string[];
    data: TaskData;
}

export interface TaskData {
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