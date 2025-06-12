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
    imageAlt: "MIL Lab Assistant",
  },
  en: {
    title: "MIL Lab Indonesia",
    description1: "Millab Indonesia is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere sollicitudin nunc. Vestibulum vel pretium erat. Aenean euismod finibus leo, quis semper dolor. Nulla vulputate nulla eget orci lobortis, vitae egestas erat sodales. Sed accumsan commodo pulvinar. Nunc et eros nec ante condimentum posuere.",
    description2: "Suspendisse ac risus at ante finibus feugiat quis vel massa. Quisque venenatis, felis ac suscipit viverra, nisi sem aliquam enim, ac scelerisque lorem nulla ac mi. Sed et ante eu orci tincidunt lobortis. Morbi consequat, urna vel tempor porta, metus felis mattis leo, faucibus viverra justo arcu ut ligula. Donec rhoncus accumsan nunc.",
    logoAlt: "Mill Lab Logo",
    imageAlt: "MIL Lab Assistant",
  }
};

// Define Our Team Section translations structure
export type TeamSectionTranslationsType = {
  [key: string]: {
    title: string;
    description: string;
    teamMembers: Array<{
      name: string;
      role: string;
    }>;
  };
};

// Our Team Section translations
export const teamSectionTranslations: TeamSectionTranslationsType = {
  id: {
    title: "Tim Kami",
    description: "Tim hebat kami terdiri dari para profesional yang berdedikasi dan berpengalaman yang bekerja bersama untuk mencapai misi kami dan memberikan solusi terbaik.",
    teamMembers: [
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
      { name: 'Nama Anggota', role: 'Jabatan' },
    ]
  },
  en: {
    title: "Our Team",
    description: "Our great team consists of dedicated and experienced professionals who work together to achieve our mission and deliver the best solutions.",
    teamMembers: [
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
      { name: 'Member Name', role: 'Role' },
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
