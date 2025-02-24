export interface Task {
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    refresh_token: string;
  }
  