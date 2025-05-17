import { faker } from "@faker-js/faker";
import { Gender } from "@prisma/client";

export type GhanaianName = {
  firstName: string;
  lastName: string;
    otherNames: string;
    gender: Gender;
};

export const generateNames = (count:number): GhanaianName[] => {
    const northCount = Math.floor(count * 0.6)
   const southCount = count - northCount
    
    return [...SEED_NAMES,...generateFakeNames("NORTH", northCount), ...generateFakeNames("SOUTH", southCount)]
}

const generateFakeNames = (type: "SOUTH" | "NORTH", count: number): GhanaianName[] => {
    console.log (`Generating ${count} ${type} names...`)
    const names = []
    
    for (let i = 0; i < count; i++) {
        const gender = faker.helpers.arrayElement([Gender.male, Gender.female])
        let firstNames: string[];
        let lastNames: string[];
        

        if (type === "NORTH") {
            firstNames = northernFirstNames[gender];
            lastNames = northernFirstNames[gender];
        } else {
            firstNames = southernFirstNames[gender];
            lastNames = southernLastNames[gender];
        }
        const name: GhanaianName = {
            firstName: faker.helpers.arrayElement(firstNames),
            lastName: faker.helpers.arrayElement(lastNames),
            otherNames: faker.person.firstName(),
            gender
        }
        names.push(name)
    }
    console.log (`Done generating ${count} ${type} names...`)
    return names;
}

export const SEED_NAMES:GhanaianName[] = [
  {
    "firstName": "Abugri",
    "lastName": "Ndebugre",
        "otherNames": "Ayinbono",
    gender: "male"
  },
  {
    "firstName": "Zita",
    "lastName": "Sung-Baa",
      "otherNames": "Naab",
    gender: "female"
  },
  {
    "firstName": "Amina",
    "lastName": "Yelzuome",
      "otherNames": "Pognaa",
    gender: "female"
  },
  {
    "firstName": "Sugri",
    "lastName": "Mahama",
      "otherNames": "Wuni",
    gender: "male"
  },
  {
    "firstName": "Patience",
    "lastName": "Osei",
      "otherNames": "Nyamekye",
    gender: "female"
  },
  {
    "firstName": "Kwame",
    "lastName": "Agyemang",
      "otherNames": "Baffour",
    gender: "male"
  },
  {
    "firstName": "Adwoa",
    "lastName": "Mensah",
      "otherNames": "Yaa",
    gender: "female"
  },
  {
    "firstName": "Enyonam",
    "lastName": "Togba",
      "otherNames": "Ama",
    gender: "female"
  },
  {
    "firstName": "Selorm",
    "lastName": "Adzaho",
      "otherNames": "Kofi",
    gender: "male"
  },
  {
    "firstName": "Naa",
    "lastName": "Okai",
      "otherNames": "Shika",
    gender: "male"
  }
]



  const northernFirstNames= {
    "male": [
      "Atongo",
      "Naporo",
      "Nsoh",
      "Batinga",
      "Ndebugri",
      "Kombian",
      "Yelzoya",
      "Kundari",
      "Tibil",
      "Anyorikeya",
      "Zantale",
      "Bugbila",
      "Dabuo",
      "Kansoni",
      "Nyaaba"
    ],
    "female": [
      "Pagnaa",
      "Kukua",
      "Balima",
      "Nyariga",
      "Ayamga",
      "Teni",
      "Zinariya",
      "Tigri",
      "Winzia",
      "Bineyeni",
      "Gbanbia",
      "Yenyeya",
      "Sulega",
      "Taniwaa",
      "Asandem"
    ]
  }
  const southernFirstNames = {
    "male": [
      "Kwame",
      "Kofi",
      "Kojo",
      "Yaw",
      "Kwabena",
      "Kwaku",
      "Kwadwo",
      "Akwasi",
      "Ekow",
      "Fiifi",
      "Kwasi",
      "Panyin",
      "Yawson",
      "Bediako",
      "Kwamina"
    ],
    "female": [
      "Ama",
      "Akua",
      "Afia",
      "Abena",
      "Esi",
      "Adwoa",
      "Yaa",
      "Afua",
      "Araba",
      "Mansa",
      "Serwaa",
      "Adjoa",
      "Akosua",
      "Baaba",
      "Enyonam"
    ]
  }
  
    const northernLastNames = {
    "male": [
      "Ayamga",
      "Batinga",
      "Kundari",
      "Tibil",
      "Ndebugri",
      "Nsoh",
      "Zangina",
      "Yelzoya",
      "Anyorikeya",
      "Tampuri",
      "Kansoni",
      "Bugbila",
      "Naporo",
      "Baluri",
      "Atongoma"
    ],
    "female": [
      "Ayamga",
      "Batinga",
      "Kundari",
      "Tibil",
      "Ndebugri",
      "Nsoh",
      "Zangina",
      "Yelzoya",
      "Anyorikeya",
      "Tampuri",
      "Kansoni",
      "Bugbila",
      "Naporo",
      "Baluri",
      "Atongoma"
    ]
  }
  
    const southernLastNames = {
    "male": [
      "Mensah",
      "Osei",
      "Boateng",
      "Asare",
      "Owusu",
      "Appiah",
      "Ankrah",
      "Tetteh",
      "Darko",
      "Addo",
      "Sarpong",
      "Antwi",
      "Gyasi",
      "Bonsu",
      "Bediako"
    ],
    "female": [
      "Mensah",
      "Osei",
      "Boateng",
      "Asare",
      "Owusu",
      "Appiah",
      "Ankrah",
      "Tetteh",
      "Darko",
      "Addo",
      "Sarpong",
      "Antwi",
      "Gyasi",
      "Bonsu",
      "Bediako"
    ]
  }


