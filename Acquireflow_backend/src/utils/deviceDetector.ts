export interface DeviceInfo {
  browser: string;
  os: string;
  device: string;
  userAgent: string;
}

export function detectDeviceInfo(userAgent: string): DeviceInfo {
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Unknown';

  // Detect browser
  if (userAgent.includes('Chrome')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge';
  } else if (userAgent.includes('Opera')) {
    browser = 'Opera';
  }

  // Detect OS
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac OS X')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('iOS')) {
    os = 'iOS';
  }

  // Detect device type
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    device = 'Mobile';
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    device = 'Tablet';
  } else {
    device = 'Desktop';
  }

  return {
    browser,
    os,
    device,
    userAgent,
  };
}
