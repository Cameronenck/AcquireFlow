export interface LoginActivity {
  id: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
  ipAddress: string;
  loginAt: string;
  isActive: boolean;
  sessionId: string;
}

export interface LoginActivityResponse {
  success: boolean;
  message: string;
  data: LoginActivity[];
}
