// Define language types
export type Language = 'id' | 'en';

// Define login form translations
export interface LoginFormTranslations {
  title: string;
  welcome: string;
  email: string;
  password: string;
  signIn: string;
  loading: string;
  orContinueWith: string;
  continueWithGoogle: string;
  signingWithGoogle: string;
  dontHaveAccount: string;
  signUp: string;
}

// Define signup form translations
export interface SignupFormTranslations {
  title: string;
  welcome: string;
  name: string;
  username: string;
  password: string;
  gender: string;
  female: string;
  male: string;
  birthplace: string;
  birthdate: string;
  socialization: string;
  email: string;
  phone: string;
  signUp: string;
  creating: string;
  orContinueWith: string;
  continueWithGoogle: string;
  signingWithGoogle: string;
  alreadyHaveAccount: string;
  signIn: string;
}

// Define complete profile form translations
export interface CompleteProfileFormTranslations {
  title: string;
  welcome: string;
  name: string;
  username: string;
  gender: string;
  female: string;
  male: string;
  birthplace: string;
  birthdate: string;
  socialization: string;
  phone: string;
  completeProfile: string;
  completing: string;
  redirecting: string;
}

// Define available translations
export const loginTranslations: Record<Language, LoginFormTranslations> = {
  id: {
    title: 'Masuk',
    welcome: 'Selamat datang di MILBoard, silakan masukkan\ndata login Anda untuk melanjutkan belajar.',
    email: 'Email',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    loading: 'Memuat...',
    orContinueWith: 'Atau lanjutkan dengan',
    continueWithGoogle: 'Lanjutkan dengan Google',
    signingWithGoogle: 'Masuk dengan Google...',
    dontHaveAccount: 'Belum memiliki akun?',
    signUp: 'Daftar'
  },
  en: {
    title: 'Sign In',
    welcome: 'Welcome to MILBoard, please enter\nyour login details to continue learning.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    loading: 'Loading...',
    orContinueWith: 'Or continue with',
    continueWithGoogle: 'Continue with Google',
    signingWithGoogle: 'Signing in with Google...',
    dontHaveAccount: 'Don\'t have an account?',
    signUp: 'Sign Up'
  }
}

// Signup form translations
export const signupTranslations: Record<Language, SignupFormTranslations> = {
  id: {
    title: 'Daftar',
    welcome: 'Selamat datang di MILBoard, silakan isi formulir pendaftaran untuk bergabung.',
    name: 'Nama Lengkap',
    username: 'Username',
    password: 'Kata Sandi',
    gender: 'Jenis Kelamin',
    female: 'Perempuan',
    male: 'Laki-laki',
    birthplace: 'Tempat Lahir',
    birthdate: 'Tanggal Lahir',
    socialization: 'Lokasi Sosialisasi',
    email: 'Email',
    phone: 'No. Telepon (Opsional)',
    signUp: 'Daftar',
    creating: 'Membuat Akun...',
    orContinueWith: 'Atau lanjutkan dengan',
    continueWithGoogle: 'Lanjutkan dengan Google',
    signingWithGoogle: 'Masuk dengan Google...',
    alreadyHaveAccount: 'Sudah memiliki akun?',
    signIn: 'Masuk'
  },
  en: {
    title: 'Sign Up',
    welcome: 'Welcome to MILBoard, please fill out the registration form to join.',
    name: 'Full Name',
    username: 'Username',
    password: 'Password',
    gender: 'Gender',
    female: 'Female',
    male: 'Male',
    birthplace: 'Birthplace',
    birthdate: 'Birthdate',
    socialization: 'Socialization Location',
    email: 'Email',
    phone: 'Phone Number (Optional)',
    signUp: 'Sign Up',
    creating: 'Creating Account...',
    orContinueWith: 'Or continue with',
    continueWithGoogle: 'Continue with Google',
    signingWithGoogle: 'Signing in with Google...',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In'
  }
}

// Complete Profile form translations
export const completeProfileTranslations: Record<Language, CompleteProfileFormTranslations> = {
  id: {
    title: 'Lengkapi Profil Anda',
    welcome: 'Silakan lengkapi informasi profil Anda untuk melanjutkan menggunakan MILBoard.',
    name: 'Nama Lengkap',
    username: 'Username',
    gender: 'Jenis Kelamin',
    female: 'Perempuan',
    male: 'Laki-laki',
    birthplace: 'Tempat Lahir',
    birthdate: 'Tanggal Lahir',
    socialization: 'Lokasi Sekolah/Sosialisasi',
    phone: 'No. Telepon (Opsional)',
    completeProfile: 'Lengkapi Profil',
    completing: 'Melengkapi Profil...',
    redirecting: 'Mengalihkan...'
  },
  en: {
    title: 'Complete Your Profile',
    welcome: 'Please complete your profile information to continue using MILBoard.',
    name: 'Full Name',
    username: 'Username',
    gender: 'Gender',
    female: 'Female',
    male: 'Male',
    birthplace: 'Birthplace',
    birthdate: 'Birthdate',
    socialization: 'School/Socialization Location',
    phone: 'Phone Number (Optional)',
    completeProfile: 'Complete Profile',
    completing: 'Completing Profile...',
    redirecting: 'Redirecting...'
  }
}
