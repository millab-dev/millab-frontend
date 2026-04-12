// Define SectionProps for language support
export interface SectionProps {
  language?: 'id' | 'en';
}

// Define AboutUs page translations
export type AboutUsTranslationType = {
  [key: string]: {
    pageTitle: string;
  };
};

// AboutUs page translations
export const aboutUsTranslations: AboutUsTranslationType = {
  id: {
    pageTitle: "Tentang Kami",
  },
  en: {
    pageTitle: "About Us",
  }
};

// Define Gemalar Indonesia section translations structure
export type MillabSectionTranslationsType = {
  [key: string]: {
    title: string;
    description1: string;
    description2: string;
    logoAlt: string;
    imageAlt: string;
  };
};

// Gemalar Indonesia section translations
export const millabSectionTranslations: MillabSectionTranslationsType = {
  id: {
    title: "Gemalar Indonesia",
    description1: "<b>Gemalar Indonesia</b> (formerly MIL Lab Indonesia) adalah ruang belajar yang dipimpin oleh anak muda dan didirikan pada tahun 2024 sebagai wadah bagi generasi muda untuk belajar, berkolaborasi, dan bertumbuh menjadi generasi yang cerdas serta kritis dalam menghadapi dunia digital.",
    description2: "Sebagai identitas baru dengan visi yang lebih luas, <b>Gemalar Indonesia</b> berkomitmen menumbuhkan nalar kritis, literasi digital, dan pertumbuhan kolektif di kalangan anak muda. Kami percaya bahwa keberanian untuk berpikir, bertanya, dan bertindak adalah bagian penting dari proses belajar yang bermakna.<br /><br />Semangat misi kami, <b>Ge-Ma-Lar</b>, mencerminkan visi untuk menumbuhkan generasi yang menikmati proses belajar dan berpikir kritis, lalu menyebarkannya untuk menginspirasi komunitas yang lebih luas. Melalui visi ini, kami ingin membangun ruang kolaboratif, inklusif, dan kreatif yang dipimpin anak muda, tempat literasi digital mendorong aksi nyata, refleksi, dan dampak sosial.",
    logoAlt: "Gemalar Indonesia Logo",
    imageAlt: "Gemalar Indonesia Logo",
  },
  en: {
    title: "Gemalar Indonesia",
    description1: "<b>Gemalar Indonesia</b> (formerly MIL Lab Indonesia) is a youth-led learning space founded in 2024 as a platform for young people to learn, collaborate, and grow into a smart and critical generation in navigating the digital world.",
    description2: "As a renewed identity with a broader vision, <b>Gemalar Indonesia</b> is committed to fostering critical thinking, digital literacy, and collective growth among youth. We believe that the courage to think, question, and take action is an essential part of meaningful learning.<br /><br />The spirit of our mission, <b>Ge-Ma-Lar</b>, reflects our vision to cultivate a generation that enjoys the process of learning and critical thinking, and amplifies it to inspire wider communities. Through this vision, we aim to create a collaborative, inclusive, and creative youth-led space where digital literacy leads to meaningful action, reflection, and social impact.",
    logoAlt: "Gemalar Indonesia Logo",
    imageAlt: "Gemalar Indonesia Logo",
  }
};

// Define Our Team Section translations structure
export type TeamSectionTranslationsType = {
  [key: string]: {
    title: string;
    teamMembers: Array<{
      imageUrl: string;
      name: string;
      role: string;
      description: string;
    }>;
  };
};

// Our Team Section translations
export const teamSectionTranslations: TeamSectionTranslationsType = {
  id: {
    title: "Tim Gemalar Indonesia",
    teamMembers: [
      {
        imageUrl: "/member/rafi.png",
        name: "Rafi Aurelian",
        role: "Co-Founder & President",
        description: "Rafi yang berlatar belakang Hubungan Internasional adalah pendiri organisasi kepemudaan Bring Changes dan firma ekuitas Globalpoint Capital, dengan memiliki ketertarikan pada pendidikan, pemberdayaan pemuda, serta bisnis dan investasi."
      },
      {
        imageUrl: "/member/salma.png",
        name: "Salma Noorfitria Ningrum",
        role: "Co-Founder & Vice President",
        description: "Salma berlatar belakang Ilmu Administrasi Negara dengan fokus pada komunikasi publik, pemberdayaan pemuda, dan pembangunan yang inklusif. Ia memimpin organisasi Dreamity Indonesia dan Gemalar Indonesia untuk mendorong akses seni serta literasi digital bagi generasi muda rentan."
      },
      {
        imageUrl: "/member/dien.png",
        name: "Dien Fitriani Azzahra",
        role: "Co-Founder & Project Manager",
        description: "Dien berlatar belakang Sistem Informasi dan memiliki pengalaman memimpin berbagai proyek IT, terutama di bidang pendidikan dan kesehatan. Ia sangat tertarik pada isu-isu keberlanjutan seperti Sustainable Development Goals (SDGs) dan peran teknologi dalam mewujudkannya."
      },
      {
        imageUrl: "/member/faishal.png",
        name: "Muhammad Faishal Nelwan",
        role: "Co-Founder & Full Stack Developer",
        description: "Faishal adalah software engineer berlatar belakang Ilmu Komputer dengan pengalaman akademis sebagai asisten dosen dan praktis menjurai berbagai kompetisi serta implementasi proyek, terus mengaplikasikan inovasi teknologi terkini untuk kesejahteraan masyarakat."
      },
      {
        imageUrl: "/member/dwiky.png",
        name: "Dwiky Ahmad Megananta",
        role: "Co-Founder & Full Stack Developer",
        description: "Dwiky adalah software engineer dengan latar belakang Ilmu Komputer yang berfokus menjawab iden seperti BEM UI, Makarapreneur, dan Lucas Djaja dalam mewujudkan inovasi digital melalui pengembangan aplikasi untuk menyelesaikan berbagai isu."
      },
      {
        imageUrl: "/member/irene.png",
        name: "Medeline Irene Tanjung",
        role: "Finance and Creative",
        description: "Medeline memiliki latar belakang Ilmu Kesejahteraan Sosial, dengan berbagai pengalaman dan pencapaian di bidang pengembangan masyarakat, ESG, dan pembangunan berkelanjutan."
      }
    ]
  },
  en: {
    title: "Gemalar Indonesia Team",
    teamMembers: [
      {
        imageUrl: "/member/rafi.png",
        name: "Rafi Aurelian",
        role: "Co-Founder & President",
        description: "Rafi, with a background in International Relations, is the founder of the youth organization Bring Changes and equity firm Globalpoint Capital, with interests in education, youth empowerment, business and investment."
      },
      {
        imageUrl: "/member/salma.png",
        name: "Salma Noorfitria Ningrum",
        role: "Co-Founder & Vice President",
        description: "Salma has a background in Public Administration focusing on public communication, youth empowerment, and inclusive development. She leads Dreamity Indonesia and Gemalar Indonesia to promote art access and digital literacy for vulnerable young generations."
      },
      {
        imageUrl: "/member/dien.png",
        name: "Dien Fitriani Azzahra",
        role: "Co-Founder & Project Manager",
        description: "Dien has a background in Information Systems and experience leading various IT projects, especially in education and healthcare. She is deeply interested in sustainability issues such as SDGs and technology's role in achieving them."
      },
      {
        imageUrl: "/member/faishal.png",
        name: "Muhammad Faishal Nelwan",
        role: "Co-Founder & Full Stack Developer",
        description: "Faishal has a Computer Science background with academic experience as a teaching assistant and practical experience winning various competitions and implementing projects, continuously applying the latest technological innovations for social welfare."
      },
      {
        imageUrl: "/member/dwiky.png",
        name: "Dwiky Ahmad Megananta",
        role: "Co-Founder & Full Stack Developer",
        description: "Dwiky is a software engineer with a Computer Science background who focuses on addressing ideas from organizations like BEM UI, Makarapreneur, and Lucas Djaja by creating digital innovations through application development to solve various issues."
      },
      {
        imageUrl: "/member/irene.png",
        name: "Medeline Irene Tanjung",
        role: "Finance and Creative",
        description: "Medeline has a background in Social Welfare Science, with various experiences and achievements in community development, ESG, and sustainable development."
      }
    ]
  }
};

// Define What We've Made Section translations structure
export type ProjectSectionTranslationsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};

// What We've Made Section translations
export const projectSectionTranslations: ProjectSectionTranslationsType = {
  id: {
    title: "Apa yang Telah Kami Buat",
    description: "Berikut adalah beberapa proyek terbaik yang telah kami kembangkan. Kami bangga dengan karya dan dampak yang telah kami hasilkan melalui solusi inovatif kami."
  },
  en: {
    title: "What We've Made",
    description: "Here are some of our best projects that we've developed. We take pride in our work and the impact we've made through our innovative solutions."
  }
};

// Define Award Section translations structure
export type AwardSectionTranslationsType = {
  [key: string]: {
    title: string;
    description: string;
  };
};

// Award Section translations
export const awardSectionTranslations: AwardSectionTranslationsType = {
  id: {
    title: "Rekognisi Gemalar Indonesia",
    description: "Gemalar Indonesia dengan bangga meraih kemenangan dalam UNESCO Youth Hackathon 2024 melalui inovasi kami, Gemar Board, yang dipresentasikan di Amman, Yordania. Sebagai organisasi, Gemalar Indonesia turut berkontribusi dalam sesi panel pada The 10th International Conference on Global Citizenship Education di Seoul, Korea Selatan, dan telah memperoleh peliputan dari lebih dari 40 media nasional dan internasional."
  },
  en: {
    title: "Gemalar Indonesia Recognition",
    description: "Gemalar Indonesia proudly won the UNESCO Youth Hackathon 2024 with our innovation, Gemar Board, presented in Amman, Jordan. As an organization, Gemalar Indonesia also contributed to a panel session at The 10th International Conference on Global Citizenship Education in Seoul, South Korea, and has received coverage from more than 40 national and international media outlets."
  }
};

// Define Connect With Us Section translations structure
export type ConnectWithUsSectionTranslationsType = {
  [key: string]: {
    title: string;
    contactInfo: {
      instagram: string;
      linkedin: string;
      email: string;
    };
    labels: {
      instagram: string;
      linkedin: string;
      email: string;
    };
  };
};

// Connect With Us Section translations
export const connectWithUsSectionTranslations: ConnectWithUsSectionTranslationsType = {
  id: {
    title: "Terhubung dengan Kami",
    contactInfo: {
      instagram: "@millabindonesia",
      linkedin: "Gemalar Indonesia",
      email: "millabindonesia@gmail.com"
    },
    labels: {
      instagram: "Instagram",
      linkedin: "LinkedIn",
      email: "Email"
    }
  },
  en: {
    title: "Connect with Us",
    contactInfo: {
      instagram: "@millabindonesia",
      linkedin: "Gemalar Indonesia",
      email: "millabindonesia@gmail.com"
    },
    labels: {
      instagram: "Instagram",
      linkedin: "LinkedIn",
      email: "Email"
    }
  }
};

// Define Video Section translations structure
export type VideoSectionTranslationsType = {
  [key: string]: {
    title: string;
    description: string;
    videoTitle: string;
  };
};

// Video Section translations
export const videoSectionTranslations: VideoSectionTranslationsType = {
  id: {
    title: "Kenali Gemar Board Lebih Dekat",
    description: "Video singkat tentang Gemar Board, produk unggulan kami dalam meningkatkan literasi digital untuk generasi muda Indonesia.",
    videoTitle: "Gemar Board - Solusi Inovatif untuk Literasi Media dan Informasi"
  },
  en: {
    title: "Get to Know Gemar Board",
    description: "A brief video about Gemar Board, our flagship product in advancing digital literacy for Indonesian youth.",
    videoTitle: "Gemar Board - Innovative Solution for Media and Information Literacy"
  }
};

// Define Sponsor Section translations structure
export type SponsorSectionTranslationsType = {
  [key: string]: {
    title: string;
  };
};

// Sponsor Section translations
export const sponsorSectionTranslations: SponsorSectionTranslationsType = {
  id: {
    title: "Didukung oleh",
  },
  en: {
    title: "Supported by",
  }
};
