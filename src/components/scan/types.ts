// Define language types
export type Language = 'id' | 'en';

// Define section props with language
export interface SectionProps {
  language?: Language;
}

// Define translations for ScanPage
export type ScanPageTranslationsType = {
  [key: string]: {
    title: string;
    subtitle: string;
    steps: {
      tapStartCamera: string;
      allowAccess: string;
      positionDevice: string;
      holdSteady: string;
    };
    howToUse: string;
  };
};

// Define translations for ScanPage component
export const scanPageTranslations: ScanPageTranslationsType = {
  id: {
    title: "Scan QR Code",
    subtitle: "Arahkan kamera Anda ke QR code untuk mengakses konten.",
    steps: {
      tapStartCamera: "Ketuk Mulai Kamera",
      allowAccess: "Izinkan akses kamera saat diminta",
      positionDevice: "Posisikan perangkat Anda sehingga QR code terlihat di bingkai",
      holdSteady: "Tahan dengan stabil dan tunggu hingga pemindaian selesai"
    },
    howToUse: "Cara menggunakan halaman scan?"
  },
  en: {
    title: "Scan QR Code",
    subtitle: "Point your camera at a QR code to access content.",
    steps: {
      tapStartCamera: "Tap Start Camera",
      allowAccess: "Allow camera access when prompted",
      positionDevice: "Position your device so the QR code is visible in the frame",
      holdSteady: "Hold steady and wait for the scan to complete"
    },
    howToUse: "How to use scan page?"
  }
};

// Define translations for button texts
export type ButtonTranslationsType = {
  [key: string]: {
    startCamera: string;
    tryAgain: string;
  };
};

export const buttonTranslations: ButtonTranslationsType = {
  id: {
    startCamera: "Mulai Kamera",
    tryAgain: "Coba Lagi"
  },
  en: {
    startCamera: "Start Camera",
    tryAgain: "Try Again"
  }
};

// Define translations for error messages
export type ErrorTranslationsType = {
  [key: string]: {
    cameraError: string;
  };
};

export const errorTranslations: ErrorTranslationsType = {
  id: {
    cameraError: "Gagal mengakses kamera. Silakan periksa izin atau coba browser lain."
  },
  en: {
    cameraError: "Failed to access camera. Please check permissions or try a different browser."
  }
};
