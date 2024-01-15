type LandmarkData = {
  name: string;
  schedule?: {
    Monday?: string;
    Tuesday?: string;
    Wednesday?: string;
    Thursday?: string;
    Friday?: string;
    Saturday?: string;
    Sunday?: string;
    All?: string;
  };
  address: string;
  contact?: string;
  coords: { x: number; y: number };
};

const entries = {
  "Cayco Animal Clinic": {
    name: "Cayco Animal Clinic",
    schedule: { All: "9 AM - 5 PM" },
    address: "434 Cayco St, Sampaloc, Manila, 1008 Metro Manila",
    contact: "09420517675",
    coords: { x: 14.603857380447206, y: 120.99634697040814 },
  },
  "Estacion Animales Clinica Veterinaria Otis": {
    name: "Estacion Animales Clinica Veterinaria Otis",
    schedule: { All: "9 AM - 9 PM" },
    address:
      "G/Ground Floor, Topmark Building, 1763 M Guazon Street, 664-A Paco, Manila, 1007 Metro Manila",
    contact: "3707437",
    coords: { x: 14.589735567790884, y: 120.99725524434228 },
  },
  "Your Vets Animal Clinic": {
    name: "Your Vets Animal Clinic",
    address: "2009 Gerardo Tuazon St, Sampaloc, Manila, 1008 Metro Manila",
    coords: { x: 14.609230126595762, y: 121.0037478516361 },
  },
  "WT Animal Wellness & Veterinary Clinic": {
    name: "WT Animal Wellness & Veterinary Clinic",
    schedule: { All: "9 AM - 6 PM" },
    address: "1971 Gerardo Tuazon St, Sampaloc, Manila, 1008 Metro Manila",
    contact: "09360592621",
    coords: { x: 14.608410476522158, y: 121.00359104108378 },
  },
  "Pets Avenue Animal Wellness Center -Altura": {
    name: "Pets Avenue Animal Wellness Center -Altura",
    schedule: { All: "9 AM - 6 PM" },
    address:
      "3574, 1006 Buenos Aires Street, Sampaloc, Manila, 1006 Metro Manila",
    contact: "09568521191",
    coords: { x: 14.602711739977856, y: 121.00966720051792 },
  },
  "Santa Ana Animal Health Clinic": {
    name: "Santa Ana Animal Health Clinic",
    schedule: {
      Monday: "9 AM - 6 PM",
      Tuesday: "9 AM - 6 PM",
      Wednesday: "9 AM - 6 PM",
      Thursday: "9 AM - 6 PM",
      Friday: "9 AM - 6 PM",
      Saturday: "9 AM - 6 PM",
      Sunday: "9 AM - 4 PM",
    },
    address:
      "CFA Building, 2259 Calderon, Santa Ana, Manila, 1009 Metro Manila",
    contact: "0282417224",
    coords: { x: 14.581559092847748, y: 121.01327002367871 },
  },
  "Canine Veterinary Clinic": {
    name: "Canine Veterinary Clinic",
    schedule: {
      Monday: "8:30 AM - 5 PM",
      Tuesday: "8:30 AM - 5 PM",
      Wednesday: "8:30 AM - 5 PM",
      Thursday: "8:30 AM - 5 PM",
      Friday: "8:30 AM - 5 PM",
      Saturday: "8:30 AM - 5 PM",
      Sunday: "8:30 AM - 11 AM",
    },
    address: "11-A Araneta Ave, Quezon City, 1113 Metro Manila",
    contact: "0287165257",
    coords: { x: 14.606637220739035, y: 121.01753150905142 },
  },
  "Wags & Purrs Veterinary Clinic": {
    name: "Wags & Purrs Veterinary Clinic",
    schedule: { All: "9 AM - 6 PM" },
    address:
      "2nd floor, One Square Bldg, 3340 V. Mapa Ext, Santa Mesa, Manila, 1016 Metro Manila",
    contact: "09763414439",
    coords: { x: 14.596594244150051, y: 121.01894296899027 },
  },
  "My Pet Doctor": {
    name: "My Pet Doctor",
    schedule: {
      Monday: "9 AM - 5 PM",
      Tuesday: "9 AM - 5 PM",
      Wednesday: "Closed",
      Thursday: "9 AM - 5 PM",
      Friday: "9 AM - 5 PM",
      Saturday: "9 AM - 5 PM",
      Sunday: "9 AM - 5 PM",
    },
    address: "59, 1500 N. Domingo, San Juan, Metro Manila",
    contact: "0279437368",
    coords: { x: 14.604739349525676, y: 121.02234691713905 },
  },
  "Bark and Meow Pet Shop and Veterinary Clinic": {
    name: "Bark and Meow Pet Shop and Veterinary Clinic",
    schedule: { All: "Open 24 hours" },
    address: "J24G+WJH, triple a bldg, N. Domingo, San Juan, Metro Manila",
    contact: "09219271069",
    coords: { x: 14.607389280795996, y: 121.02659791406019 },
  },
  "The Pet Project Vet Clinic": {
    name: "The Pet Project Vet Clinic",
    schedule: { All: "10 AM - 6 PM" },
    address: "16 Regidor, San Juan, 1500 Metro Manila",
    contact: "0275085838",
    coords: { x: 14.602834150390638, y: 121.02724007868645 },
  },
  "MandaVets Animal Clinic": {
    name: "MandaVets Animal Clinic",
    schedule: {
      Monday: "8:30 AM - 4:30 PM",
      Tuesday: "8:30 AM - 4:30 PM",
      Wednesday: "8:30 AM - 4:30 PM",
      Thursday: "8:30 AM - 4:30 PM",
      Friday: "8:30 AM - 4:30 PM",
      Saturday: "8:30 AM - 4:30 PM",
      Sunday: "Closed",
    },
    address:
      "Unit No. 4A, Ground Floor, Gomega 1 Condominium, 353 P. Martinez, Mandaluyong, 1550 Metro Manila",
    contact: "09954676499",
    coords: { x: 14.592465834234185, y: 121.02723879717554 },
  },
  "Immanuel Animal Clinic Pet Supplies & Grooming Center": {
    name: "Immanuel Animal Clinic Pet Supplies & Grooming Center",
    address: "196 Rt. Rev. G. Aglipay, Mandaluyong, Metro Manila",
    contact: "09311318670",
    coords: { x: 14.587527863155252, y: 121.02466758740886 },
  },
};

export type { LandmarkData };
export default { entries };
