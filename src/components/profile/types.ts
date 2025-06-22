// Define language types
export type Language = 'id' | 'en';

// Define props interface for components that accept language
export interface ProfileComponentProps {
  language?: Language;
}

// Define translations for the Leaderboard component
export interface LeaderboardTranslations {
  title: string;
  pointsLabel: string;
  youLabel: string;
  gapIndicator: string;
}

export const leaderboardTranslations: Record<Language, LeaderboardTranslations> = {
  id: {
    title: 'Papan Peringkat',
    pointsLabel: 'poin',
    youLabel: 'Kamu',
    gapIndicator: '•••',
  },
  en: {
    title: 'Leaderboard',
    pointsLabel: 'point',
    youLabel: 'You',
    gapIndicator: '•••',
  }
};

// Define translations for the ProfileHeader component
export interface ProfileHeaderTranslations {
  followersLabel: string;
  followingLabel: string;
  coursesFinishedLabel: string;
  editProfileButton: string;
  pointsLabel: string;
  nameLabel: string;
  birthplaceLabel: string;
  phoneLabel: string;
  genderLabel: string;
  schoolLabel: string;
  emailLabel: string;
  usernameLabel: string;
}

export const profileHeaderTranslations: Record<Language, ProfileHeaderTranslations> = {
  id: {
    followersLabel: 'Pengikut',
    usernameLabel: 'Username',
    followingLabel: 'Mengikuti',
    coursesFinishedLabel: 'Kursus Selesai',
    editProfileButton: 'Edit Profil',
    pointsLabel: 'point',
    nameLabel: 'NAMA',
    birthplaceLabel: 'TEMPAT LAHIR',
    phoneLabel: 'TELEPON',
    genderLabel: 'GENDER',
    schoolLabel: 'SEKOLAH',
    emailLabel: 'EMAIL',
  },
  en: {
    followersLabel: 'Followers',
    usernameLabel: 'Username',
    followingLabel: 'Following',
    coursesFinishedLabel: 'Courses Finished',
    editProfileButton: 'Edit Profile',
    pointsLabel: 'point',
    nameLabel: 'NAME',
    birthplaceLabel: 'BIRTHPLACE',
    phoneLabel: 'PHONE',
    genderLabel: 'GENDER',
    schoolLabel: 'SCHOOL',
    emailLabel: 'EMAIL',
  }
};

// Define translations for the TabBar component
export interface TabBarTranslations {
  achievements: string;
  settings: string;
}

export const tabBarTranslations: Record<Language, TabBarTranslations> = {
  id: {
    achievements: 'Pencapaian',
    settings: 'Pengaturan',
  },
  en: {
    achievements: 'Achievements',
    settings: 'Settings',
  }
};

// Define translations for the AchievementSection component
export interface AchievementSectionTranslations {
  title: string;
  emptyStateMessage: string;
  point: string;
}

export const achievementSectionTranslations: Record<Language, AchievementSectionTranslations> = {
  id: {
    title: 'Pencapaian',
    emptyStateMessage: 'Belum ada pencapaian',
    point: 'poin'
  },
  en: {
    title: 'Achievements',
    emptyStateMessage: 'No achievements yet',
    point: 'point'
  }
};

// Define translations for the SettingSection component
export interface SettingSectionTranslations {
  title: string;
  personalInfo: string;
  changePasswordButton: string;
  additionalInfo: string;
  saveButton: string;
  cancelButton: string;
  successMessage: string;
  errorMessage: string;
  editProfile: string;
  changePassword: string;
  loggingOut: string;
  logout: string;
}

export const settingSectionTranslations: Record<Language, SettingSectionTranslations> = {
  id: {
    title: 'Pengaturan',
    personalInfo: 'Informasi Pribadi',
    changePasswordButton: 'Ubah Kata Sandi',
    additionalInfo: 'Informasi Tambahan',
    saveButton: 'Simpan',
    cancelButton: 'Batal',
    successMessage: 'Perubahan berhasil disimpan',
    errorMessage: 'Gagal menyimpan perubahan',
    editProfile: 'Edit Profil',
    changePassword: 'Ubah Kata Sandi',
    loggingOut: 'Keluar...',
    logout: 'Keluar',
  },
  en: {
    title: 'Settings',
    personalInfo: 'Personal Information',
    changePasswordButton: 'Change Password',
    additionalInfo: 'Additional Information',
    saveButton: 'Save',
    cancelButton: 'Cancel',
    successMessage: 'Changes saved successfully',
    errorMessage: 'Failed to save changes',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    loggingOut: 'Logging out...',
    logout: 'Logout',
  }
};

// Define translations for the AdditionalInformation component
export interface AdditionalInformationTranslations {
  title: string;
  bioLabel: string;
  bioPlaceholder: string;
  websiteLabel: string;
  websitePlaceholder: string;
}

export const additionalInformationTranslations: Record<Language, AdditionalInformationTranslations> = {
  id: {
    title: 'Informasi Tambahan',
    bioLabel: 'Bio',
    bioPlaceholder: 'Ceritakan tentang dirimu...',
    websiteLabel: 'Situs Web',
    websitePlaceholder: 'https://example.com',
  },
  en: {
    title: 'Additional Information',
    bioLabel: 'Bio',
    bioPlaceholder: 'Tell us about yourself...',
    websiteLabel: 'Website',
    websitePlaceholder: 'https://example.com',
  }
};

// Define translations for the EditProfilePopup component
export interface EditProfilePopupTranslations {
  title: string;
  description: string;
  nameLabel: string;
  birthplaceLabel: string;
  birthdateLabel: string;
  phoneLabel: string;
  genderLabel: string;
  selectGenderPlaceholder: string;
  femaleOption: string;
  maleOption: string;
  schoolLabel: string;
  saveButton: string;
  cancelButton: string;
  successMessage: string;
  updatingMessage: string;
}

export const editProfilePopupTranslations: Record<Language, EditProfilePopupTranslations> = {
  id: {
    title: 'Edit Profil',
    description: 'Perbarui informasi profil Anda di bawah ini.',
    nameLabel: 'Nama Lengkap',
    birthplaceLabel: 'Tempat Lahir',
    birthdateLabel: 'Tanggal Lahir',
    phoneLabel: 'Nomor Telepon',
    genderLabel: 'Jenis Kelamin',
    selectGenderPlaceholder: 'Pilih jenis kelamin',
    femaleOption: 'Perempuan',
    maleOption: 'Laki-laki',
    schoolLabel: 'Sekolah',
    saveButton: 'Simpan Perubahan',
    cancelButton: 'Batal',
    successMessage: 'Profil berhasil diperbarui!',
    updatingMessage: 'Memperbarui...',
  },
  en: {
    title: 'Edit Profile',
    description: 'Update your profile information below.',
    nameLabel: 'Full Name',
    birthplaceLabel: 'Birthplace',
    birthdateLabel: 'Date of Birth',
    phoneLabel: 'Phone Number',
    genderLabel: 'Gender',
    selectGenderPlaceholder: 'Select gender',
    femaleOption: 'Female',
    maleOption: 'Male',
    schoolLabel: 'School',
    saveButton: 'Save Changes',
    cancelButton: 'Cancel',
    successMessage: 'Profile updated successfully!',
    updatingMessage: 'Updating...',
  }
};

// Define translations for the ChangePasswordPopup component
export interface ChangePasswordPopupTranslations {
  title: string;
  description: string;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  saveButton: string;
  cancelButton: string;
  passwordMismatchError: string;
  passwordRequirements: string;
  successMessage: string;
  updatingMessage: string;
  minLengthRequirement: string;
  uppercaseRequirement: string;
  numberRequirement: string;
  specialCharRequirement: string;
  passwordsMatchMessage: string;
  unexpectedError: string;
}

export const changePasswordPopupTranslations: Record<Language, ChangePasswordPopupTranslations> = {
  id: {
    title: 'Ubah Kata Sandi',
    description: 'Masukkan kata sandi saat ini dan kata sandi baru untuk memperbarui kredensial Anda.',
    currentPasswordLabel: 'Kata Sandi Saat Ini',
    newPasswordLabel: 'Kata Sandi Baru',
    confirmPasswordLabel: 'Konfirmasi Kata Sandi Baru',
    saveButton: 'Perbarui Kata Sandi',
    cancelButton: 'Batal',
    passwordMismatchError: 'Kata sandi tidak cocok',
    passwordRequirements: 'Kata sandi tidak cukup kuat',
    successMessage: 'Kata sandi berhasil diubah!',
    updatingMessage: 'Memperbarui...',
    minLengthRequirement: 'Minimal 8 karakter',
    uppercaseRequirement: 'Minimal satu huruf besar',
    numberRequirement: 'Minimal satu angka',
    specialCharRequirement: 'Minimal satu karakter khusus',
    passwordsMatchMessage: 'Kata sandi cocok',
    unexpectedError: 'Terjadi kesalahan tak terduga. Silakan coba lagi.',
  },
  en: {
    title: 'Change Password',
    description: 'Enter your current password and new password to update your credentials.',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Confirm New Password',
    saveButton: 'Update Password',
    cancelButton: 'Cancel',
    passwordMismatchError: 'Passwords do not match',
    passwordRequirements: 'Password is not strong enough',
    successMessage: 'Password changed successfully!',
    updatingMessage: 'Updating...',
    minLengthRequirement: 'At least 8 characters',
    uppercaseRequirement: 'At least one uppercase letter',
    numberRequirement: 'At least one number',
    specialCharRequirement: 'At least one special character',
    passwordsMatchMessage: 'Passwords match',
    unexpectedError: 'An unexpected error occurred. Please try again.',
  }
};
