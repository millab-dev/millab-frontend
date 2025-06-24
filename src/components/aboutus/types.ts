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

// Define Millab Section translations structure
export type MillabSectionTranslationsType = {
  [key: string]: {
    title: string;
    description1: string;
    description2: string;
    logoAlt: string;
    imageAlt: string;
  };
};

// Millab Section translations
export const millabSectionTranslations: MillabSectionTranslationsType = {
  id: {
    title: "MIL Lab Indonesia",
    description1: "<b>MIL Lab</b> atau <b>Media and Information Literacy Lab</b> adalah ruang belajar yang dipimpin oleh pemuda, dibangun pada tahun 2024 sebagai tempat bagi setiap anak muda untuk berekspresi, bertumbuh, dan mengikuti generasi yang cerdas dan kreatif mengembangkan dunia! Kami percaya bahwa kesempatan untuk mencerdaskan dan membuat kesetaraan adalah bobot penting dari proses pembelajaran yang bermakna. Sebagai laboratorium ide dari pusat kolaborasi, <b>MIL Lab</b> mendorong pendidikan literasi media yang partisipatif dan inovatif untuk melawan disinformasi, kekerasan digital, dan bias informasi. Di sinilah perjalanan menuju masa depan yang lebih cerdas dan melek media dimulai bersama.",
    description2: "Dipandu oleh nilai-nilai inti kami yang terangkum dalam akronim <b>MIL</b>, kami secara aktif <b>Memotivasi Perubahan</b> dengan menyatukan masyarakat untuk mengkoordinasikan aksi dan menginspirasi kesadaran. Kami berkomitmen pada <b>Inklusivitas</b> dengan menciptakan lingkungan yang aman dan suportif di mana setiap individu memiliki kesempatan yang setara untuk berkembang. Seluruh upaya kami digerakkan oleh <b>Lentera Ilmu</b>, semangat untuk menumbuhkan rasa ingin tahu, merayakan eksplorasi intelektual, dan membangun pengetahuan bersama.",
    logoAlt: "MIL Lab Logo",
    imageAlt: "MIL Lab Logo",
  },
  en: {
    title: "MIL Lab Indonesia",
    description1: "<b>MIL Lab</b> or <b>Media and Information Literacy Lab</b> is a youth-led learning space, established in 2024 as a place for every young person to express, grow, and join a smart and creative generation developing the world! We believe that opportunities for education and creating equality are essential weights in meaningful learning processes. As an idea laboratory and collaboration hub, <b>MIL Lab</b> promotes participatory and innovative media literacy education to combat disinformation, digital violence, and information bias. This is where the journey toward a smarter and more media-literate future begins together.",
    description2: "Guided by our core values summarized in the acronym <b>MIL</b>, we actively <b>Motivate Change</b> by bringing communities together to coordinate action and inspire awareness. We are committed to <b>Inclusivity</b> by creating a safe and supportive environment where every individual has equal opportunity to develop. All our efforts are driven by the <b>Light of Knowledge</b> (<b>Lentera Ilmu</b>), a spirit to nurture curiosity, celebrate intellectual exploration, and build knowledge together.",
    logoAlt: "MIL Lab Logo",
    imageAlt: "MIL Lab Logo",
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
    title: "Tim MIL Lab Indonesia",
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
        description: "Salma berlatar belakang Ilmu Administrasi Negara dengan fokus pada komunikasi publik, pemberdayaan pemuda, dan pembangunan yang inklusif. Ia memimpin organisasi Dreamity Indonesia dan MIL Lab Indonesia untuk mendorong akses seni serta literasi digital bagi generasi muda rentan."
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
    title: "MIL Lab Indonesia Team",
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
        description: "Salma has a background in Public Administration focusing on public communication, youth empowerment, and inclusive development. She leads Dreamity Indonesia and MIL Lab Indonesia to promote art access and digital literacy for vulnerable young generations."
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
    title: "Rekognisi MIL Lab Indonesia",
    description: "MIL Lab Indonesia dengan bangga meraih kemenangan dalam UNESCO Youth Hackathon 2024 melalui inovasi kami, 'MILBoard', dan telah mendapatkan peliputan lebih dari 40 media nasional dan internasional."
  },
  en: {
    title: "MIL Lab Indonesia Recognition",
    description: "MIL Lab Indonesia proudly won the UNESCO Youth Hackathon 2024 with our innovation, 'MILBoard', and has received coverage from more than 40 national and international media outlets."
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
      linkedin: "MIL Lab Indonesia",
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
      linkedin: "MIL Lab Indonesia",
      email: "millabindonesia@gmail.com"
    },
    labels: {
      instagram: "Instagram",
      linkedin: "LinkedIn",
      email: "Email"
    }
  }
};
