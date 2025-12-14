import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export interface MFASetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface MFAVerification {
  isValid: boolean;
  backupCodeUsed?: boolean;
}

/**
 * Generate MFA setup for a user
 */
export async function generateMFASetup(userEmail: string): Promise<MFASetup> {
  const secret = authenticator.generateSecret();
  const serviceName = 'OMGsystems';
  const otpAuthUrl = authenticator.keyuri(userEmail, serviceName, secret);
  
  const qrCodeUrl = await QRCode.toDataURL(otpAuthUrl);
  
  // Generate backup codes
  const backupCodes = Array.from({ length: 10 }, () => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  
  return {
    secret,
    qrCodeUrl,
    backupCodes,
  };
}

/**
 * Verify MFA token
 */
export function verifyMFAToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    return false;
  }
}

/**
 * Verify backup code
 */
export function verifyBackupCode(code: string, backupCodes: any): boolean {
  if (typeof backupCodes === 'string') {
    try {
      backupCodes = JSON.parse(backupCodes);
    } catch {
      return false;
    }
  }
  if (!Array.isArray(backupCodes)) {
    return false;
  }
  return backupCodes.includes(code.toUpperCase());
}

/**
 * Generate new backup codes
 */
export function generateBackupCodes(): string[] {
  return Array.from({ length: 10 }, () => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
}
