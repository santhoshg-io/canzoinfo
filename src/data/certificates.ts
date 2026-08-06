export interface Certificate {
  id: string;
  name: string;
  college: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  status: "Active" | "Completed" | "Verified";
  photoUrl: string;
  award?: string;
}

export const certificates: Record<string, Certificate> = {
  "cz-ip-fpd-011": {
    id: "cz-ip-fpd-011",
    name: "Santhosh G",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329845/Screenshot_20260501_091216_1.jpg_zp3noj.jpg",
    award: "Technical Excellence & Leadership Award",
  },
  "cz-ip-fpd-012": {
    id: "cz-ip-fpd-012",
    name: "Prabu S",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329846/E720525AM034_-_Prabu_S.jpg_inwaa6.jpg",
    award: "Excellence in Professionalism Award",
  },
  "cz-ip-fpd-013": {
    id: "cz-ip-fpd-013",
    name: "Ganesh V",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329843/E720524AM006_-_Ganesh_1.jpg_mrbqpi.jpg",
    award: "Outstanding Project Leadership Award",
  },
  "cz-ip-fpd-014": {
    id: "cz-ip-fpd-014",
    name: "Kayalvizhi S",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329844/My_photo_-_Kayalvizhi.jpg_m5zurr.jpg",
  },
  "cz-ip-fpd-015": {
    id: "cz-ip-fpd-015",
    name: "Maheshwaran S",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329846/IMG_20260420_160548_-_Maheshwaran._S_y2agoc.png",
  },
  "cz-ip-fpd-016": {
    id: "cz-ip-fpd-016",
    name: "Sriram R",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "30 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329846/E720524AM029_-_Sriram_R_nefbww.png",
  },
  "cz-ip-fpd-017": {
    id: "cz-ip-fpd-017",
    name: "Vidya Sri K",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "25 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329843/IMG-20260722-WA0002_-_Vidya_Sri_K.jpg_h1wfau.jpg",
  },
  "cz-ip-fpd-018": {
    id: "cz-ip-fpd-018",
    name: "Purushothaman B",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "25 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785329844/puruphoto_-_Purushothaman_B.jpg_wysmgz.jpg",
  },
  "cz-ip-fpd-019": {
    id: "cz-ip-fpd-019",
    name: "Monisha M",
    college: "EASA College of Engineering and Technology",
    role: "Full Stack and Product Development Intern",
    duration: "20 Working Days",
    startDate: "June 8, 2026",
    endDate: "July 20, 2026",
    issueDate: "July 31, 2026",
    status: "Completed",
    photoUrl: "https://res.cloudinary.com/odxzrb9z/image/upload/v1785331007/IMG_20260729_183353_-_Monisha_M.jpg_p8fuup.jpg",
  },
};
