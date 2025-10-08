export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  department?: string;
}

export interface Student extends User {
  enrollment_year: number;
  current_year: number;
}

export interface Alumni extends User {
  graduation_year: number;
  current_company: string;
  current_position: string;
  location: string;
  linkedin_url: string;
  phone: string;
}

export interface DepartmentPost {
  id: string;
  title: string;
  content: string;
  post_type: 'event' | 'message' | 'announcement';
  department: string;
  created_by: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, userType: 'student' | 'alumni' | 'department') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
