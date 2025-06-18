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
    description1: "Millab Indonesia adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere sollicitudin nunc. Vestibulum vel pretium erat. Aenean euismod finibus leo, quis semper dolor. Nulla vulputate nulla eget orci lobortis, vitae egestas erat sodales. Sed accumsan commodo pulvinar. Nunc et eros nec ante condimentum posuere.",
    description2: "Suspendisse ac risus at ante finibus feugiat quis vel massa. Quisque venenatis, felis ac suscipit viverra, nisi sem aliquam enim, ac scelerisque lorem nulla ac mi. Sed et ante eu orci tincidunt lobortis. Morbi consequat, urna vel tempor porta, metus felis mattis leo, faucibus viverra justo arcu ut ligula. Donec rhoncus accumsan nunc.",
    logoAlt: "Mill Lab Logo",
    imageAlt: "MIL Lab Logo",
  },
  en: {
    title: "MIL Lab Indonesia",
    description1: "Millab Indonesia is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere sollicitudin nunc. Vestibulum vel pretium erat. Aenean euismod finibus leo, quis semper dolor. Nulla vulputate nulla eget orci lobortis, vitae egestas erat sodales. Sed accumsan commodo pulvinar. Nunc et eros nec ante condimentum posuere.",
    description2: "Suspendisse ac risus at ante finibus feugiat quis vel massa. Quisque venenatis, felis ac suscipit viverra, nisi sem aliquam enim, ac scelerisque lorem nulla ac mi. Sed et ante eu orci tincidunt lobortis. Morbi consequat, urna vel tempor porta, metus felis mattis leo, faucibus viverra justo arcu ut ligula. Donec rhoncus accumsan nunc.",
    logoAlt: "Mill Lab Logo",
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
    title: "Tim Kami",
    teamMembers: [
      {
        imageUrl: "/member/rafi.png",
        name: "Rafi Aurelian",
        role: "President",
        description: "Rafi yang berlatar belakang Hubungan Internasional adalah pendiri organisasi kepemudaan Bring Changes dan firma ekuitas Globalpoint Capital, dengan memiliki ketertarikan pada pendidikan, pemberdayaan pemuda, serta bisnis dan investasi."
      },
      {
        imageUrl: "/member/salma.png",
        name: "Salma Noorfitria Ningrum",
        role: "Vice President",
        description: "Salma berlatar belakang Ilmu Administrasi Negara dengan fokus pada komunikasi publik, pemberdayaan pemuda, dan pembangunan yang inklusif. Ia memimpin organisasi Dreamity Indonesia dan MIL Lab Indonesia untuk mendorong akses seni serta literasi digital bagi generasi muda rentan."
      },
      {
        imageUrl: "/member/dien.png",
        name: "Dien Fitriani Azzahra",
        role: "Director of IT Development",
        description: "Dien berlatar belakang Sistem Informasi dan memiliki pengalaman memimpin berbagai proyek IT, terutama di bidang pendidikan dan kesehatan. Ia sangat tertarik pada isu-isu keberlanjutan seperti Sustainable Development Goals (SDGs) dan peran teknologi dalam mewujudkannya."
      },
      {
        imageUrl: "/member/faishal.png",
        name: "Muhammad Faishal Nelwan",
        role: "Software Developer",
        description: "Faishal berlatar belakang Ilmu Komputer dengan pengalaman akademis sebagai asisten dosen dan praktis menjurai berbagai kompetisi serta implementasi proyek, terus mengaplikasikan inovasi teknologi terkini untuk kesejahteraan masyarakat."
      },
      {
        imageUrl: "/member/dwiky.png",
        name: "Dwiky Ahmad Megananta",
        role: "Software Developer",
        description: "Dwiky adalah software engineer dengan latar belakang Ilmu Komputer yang berfokus menjawab iden seperti BEM UI, Makarapreneur, dan Lucas Djaja dalam mewujudkan inovasi digital melalui pengembangan aplikasi untuk menyelesaikan berbagai isu."
      },
      {
        imageUrl: "https://randomuser.me/api/portraits/women/79.jpg",
        name: "Medeline Irene Tanjung",
        role: "Finance and Creative",
        description: "Irene memiliki keahlian dalam manajemen keuangan dan kreativitas desain. Dengan latar belakang ekonomi, ia menggabungkan pemikiran analitis dengan pendekatan kreatif untuk menciptakan solusi yang inovatif bagi klien."
      }
    ]
  },
  en: {
    title: "Our Team",
    teamMembers: [
      {
        imageUrl: "/member/rafi.png",
        name: "Rafi Aurelian",
        role: "President",
        description: "Rafi, with a background in International Relations, is the founder of the youth organization Bring Changes and equity firm Globalpoint Capital, with interests in education, youth empowerment, business and investment."
      },
      {
        imageUrl: "/member/salma.png",
        name: "Salma Noorfitria Ningrum",
        role: "Vice President",
        description: "Salma has a background in Public Administration focusing on public communication, youth empowerment, and inclusive development. She leads Dreamity Indonesia and MIL Lab Indonesia to promote art access and digital literacy for vulnerable young generations."
      },
      {
        imageUrl: "/member/dien.png",
        name: "Dien Fitriani Azzahra",
        role: "Director of IT Development",
        description: "Dien has a background in Information Systems and experience leading various IT projects, especially in education and healthcare. She is deeply interested in sustainability issues such as SDGs and technology's role in achieving them."
      },
      {
        imageUrl: "/member/faishal.png",
        name: "Muhammad Faishal Nelwan",
        role: "Software Developer",
        description: "Faishal has a Computer Science background with academic experience as a teaching assistant and practical experience winning various competitions and implementing projects, continuously applying the latest technological innovations for social welfare."
      },
      {
        imageUrl: "/member/dwiky.png",
        name: "Dwiky Ahmad Megananta",
        role: "Software Developer",
        description: "Dwiky is a software engineer with a Computer Science background who focuses on addressing ideas from organizations like BEM UI, Makarapreneur, and Lucas Djaja by creating digital innovations through application development to solve various issues."
      },
      {
        imageUrl: "https://randomuser.me/api/portraits/women/79.jpg",
        name: "Medeline Irene Tanjung",
        role: "Finance and Creative",
        description: "Irene has expertise in financial management and creative design. With an economics background, she combines analytical thinking with creative approaches to develop innovative solutions for clients."
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
    title: "Penghargaan & Pengakuan",
    description: "Beberapa penghargaan dan pengakuan yang telah kami terima atas dedikasi dan hasil kerja kami selama bertahun-tahun."
  },
  en: {
    title: "Awards & Recognition",
    description: "Some of the awards and recognition we've received for our dedication and work output over the years."
  }
};
