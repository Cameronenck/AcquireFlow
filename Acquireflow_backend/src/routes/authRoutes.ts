import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @route   GET /api/auth/test-email
 * @desc    Test email connection
 * @access  Public
 */
router.get('/test-email', AuthController.testEmailConnection);

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', AuthController.register);

/**
 * @route   POST /api/auth/register/firebase
 * @desc    Register user via Firebase Admin SDK
 * @access  Public
 */
router.post('/register/firebase', AuthController.registerWithFirebase);

/**
 * @route   POST /api/auth/login
 * @desc    Login user with email and password
 * @access  Public
 */
router.post('/login', AuthController.login);

/**
 * @route   POST /api/auth/login/firebase
 * @desc    Login user with Firebase ID token
 * @access  Public
 */
router.post('/login/firebase', AuthController.loginWithFirebase);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', AuthController.refreshToken);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post('/forgot-password', AuthController.requestPasswordReset);

/**
 * @route   POST /api/auth/verify-reset-token
 * @desc    Verify reset token
 * @access  Public
 */
router.post('/verify-reset-token', AuthController.verifyResetToken);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', AuthController.resetPassword);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authMiddleware, AuthController.logout);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post('/change-password', authMiddleware, AuthController.changePassword);

/**
 * @route   POST /api/auth/update-password
 * @desc    Update user password with old, new, and confirm password
 * @access  Private
 */
router.post('/update-password', authMiddleware, AuthController.updatePassword);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authMiddleware, AuthController.getProfile);

/**
 * @route   GET /api/auth/login-activity
 * @desc    Get recent login activity for authenticated user
 * @access  Private
 */
router.get('/login-activity', authMiddleware, AuthController.getLoginActivity);

/**
 * @route   POST /api/auth/2fa/setup
 * @desc    Setup 2FA for user
 * @access  Private
 */
router.post('/2fa/setup', authMiddleware, AuthController.setup2FA);

/**
 * @route   POST /api/auth/2fa/verify-setup
 * @desc    Verify 2FA setup OTP
 * @access  Private
 */
router.post('/2fa/verify-setup', authMiddleware, AuthController.verify2FASetup);

/**
 * @route   POST /api/auth/2fa/verify-login
 * @desc    Verify 2FA OTP for login
 * @access  Public
 */
router.post('/2fa/verify-login', AuthController.verify2FALogin);

/**
 * @route   GET /api/auth/2fa/status
 * @desc    Get 2FA status
 * @access  Private
 */
router.get('/2fa/status', authMiddleware, AuthController.get2FAStatus);

/**
 * @route   POST /api/auth/2fa/disable
 * @desc    Disable 2FA
 * @access  Private
 */
router.post('/2fa/disable', authMiddleware, AuthController.disable2FA);

/**
 * @route   POST /api/auth/2fa/send-disable-otp
 * @desc    Send disable 2FA OTP
 * @access  Private
 */
router.post('/2fa/send-disable-otp', authMiddleware, AuthController.sendDisable2FAOTP);

/**
 * @route   POST /api/auth/2fa/regenerate-backup-codes
 * @desc    Regenerate backup codes
 * @access  Private
 */


export default router;
