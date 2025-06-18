"use client";

import { NextStep, NextStepProvider, Tour,} from "nextstepjs";

import HomepageContent from "./OnboardingOverlay";

const Homepage = () => {

    const steps: Tour[] = [
        {
            tour: "mainTour",
            steps: [
                {
                    icon: "👋",
                    title: "Semakin aktif, semakin tinggi levelmu!",
                    content:
                        "Kumpulkan XP dari membaca modul dan menjawab kuis untuk naik level",
                    selector: "#streak-progress",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Belajar sambil seru-seruan!",
                    content:
                        "Temukan fakta menarik dan inspiratif seputar literasi media & digital setiap kali kamu membuka aplikasi.",
                    selector: "#fyi",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Mulai belajar dari dasar",
                    content:
                        "Temukan berbagai modul belajar berdasarkan level (Beginner, Intermediate, Advance) yang dirancang untuk membantumu belajar secara bertahap.",
                    selector: "#discover-section",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Lihat semua modul",
                    content:
                        "Akses daftar lengkap modul yang tersedia dan pilih topik yang paling kamu minati.",
                    selector: "#module-list",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Lanjutkan dari yang terakhir",
                    content:
                        "Kembali ke modul yang sebelumnya kamu baca tanpa harus mencari dari awal. Praktis dan efisien!",
                    selector: "#continue-reading",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Siap uji kemampuanmu?",
                    content:
                        "Setelah menyelesaikan modul, ikuti kuis akhir untuk mengukur pemahamanmu dan kumpulkan poin tambahan.",
                    selector: "#final-quiz",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Panduan penggunaan versi web",
                    content:
                        "Pelajari cara menggunakan MilBoard dari situs web dengan mudah dan efektif.",
                    selector: "#guide-website",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Gunakan MilBoard secara offline",
                    content:
                        "Ikuti petunjuk penggunaan untuk produk offline seperti board game atau modul cetak agar pengalaman belajarmu tetap maksimal meski tanpa internet.",
                    selector: "#guide-offlineProduct",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                // {
                //   icon: "👋",
                //   title: "Pindai Challenge Card milikmu",
                //   content: "Gunakan kamera untuk memindai kode QR di kartu tantangan MilBoard dan akses modul terkait.",
                //   selector: "#scan",
                //   side: "top",
                //   showControls: true,
                //   showSkip: true
                // },
            ],
        },
    ];

    return (
        <>
            <NextStepProvider>
                <NextStep steps={steps} onComplete={() => {
                    localStorage.setItem("completedTour", "true");
                }}
                onSkip={() => {
                    localStorage.setItem("completedTour", "true");
                }}>
                    <HomepageContent />
                </NextStep>
            </NextStepProvider>
        </>
    );
};

export default Homepage;
