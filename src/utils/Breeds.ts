import { PawPrints } from "../assets/images";
import { Affenpinscher } from "../assets/images/dogs";
import { AfghanHound } from "../assets/images/dogs";
import { AiredaleTerrier } from "../assets/images/dogs";
import { Akita } from "../assets/images/dogs";
import { AlaskanKleeKai } from "../assets/images/dogs";
import { AlaskanMalamute } from "../assets/images/dogs";
import { AmericanBulldog } from "../assets/images/dogs";
import { AmericanCockerSpaniel } from "../assets/images/dogs";
import { AmericanEskimo } from "../assets/images/dogs";
import { AmericanHairlessTerrier } from "../assets/images/dogs";
import { Beagle } from "../assets/images/dogs";
import { Chihuahua } from "../assets/images/dogs";
import { ChowChow } from "../assets/images/dogs";
import { GermanShepherd } from "../assets/images/dogs";
import { LabradorRetriever } from "../assets/images/dogs";
import { Pomeranian } from "../assets/images/dogs";
import { Poodle } from "../assets/images/dogs";
import { Pug } from "../assets/images/dogs";
import { ShihTzu } from "../assets/images/dogs";
import { SiberianHusky } from "../assets/images/dogs";

type Breed = {
  name: string;
  icon: string;
};

const breeds: Array<Breed> = [
  {
    name: "Affenpinscher",
    icon: Affenpinscher,
  },
  {
    name: "Afghan Hound",
    icon: AfghanHound,
  },
  {
    name: "Airedale Terrier",
    icon: AiredaleTerrier,
  },
  {
    name: "Akita",
    icon: Akita,
  },
  {
    name: "Alaskan Klee Kai",
    icon: AlaskanKleeKai,
  },
  {
    name: "Alaskan Malamute",
    icon: AlaskanMalamute,
  },
  {
    name: "American Bulldog",
    icon: AmericanBulldog,
  },
  {
    name: "American Cocker Spaniel",
    icon: AmericanCockerSpaniel,
  },
  {
    name: "American Eskimo",
    icon: AmericanEskimo,
  },
  {
    name: "American Hairless Terrier",
    icon: AmericanHairlessTerrier,
  },
  {
    name: "American Leopard Hound",
    icon: PawPrints,
  },
  {
    name: "American Pit Bull Terrier",
    icon: PawPrints,
  },
  {
    name: "American Staffordshire Terrier",
    icon: PawPrints,
  },
  {
    name: "American Water Spaniel",
    icon: PawPrints,
  },
  {
    name: "Anatolian Shepherd",
    icon: PawPrints,
  },
  {
    name: "Aussiedoodle",
    icon: PawPrints,
  },
  {
    name: "Australian Cattle",
    icon: PawPrints,
  },
  {
    name: "Australian Kelpie",
    icon: PawPrints,
  },
  {
    name: "Australian Labradoodle",
    icon: PawPrints,
  },
  {
    name: "Australian Shepherd",
    icon: PawPrints,
  },
  {
    name: "Australian Silky Terrier",
    icon: PawPrints,
  },
  {
    name: "Australian Terrier",
    icon: PawPrints,
  },
  {
    name: "Australian Working Kelpie",
    icon: PawPrints,
  },
  {
    name: "Azawakh",
    icon: PawPrints,
  },
  {
    name: "Basenji",
    icon: PawPrints,
  },
  {
    name: "Bassador",
    icon: PawPrints,
  },
  {
    name: "Basset Bleu De Gascogne",
    icon: PawPrints,
  },
  {
    name: "Basset Fauve De Bretagne",
    icon: PawPrints,
  },
  {
    name: "Basset Hound",
    icon: PawPrints,
  },
  {
    name: "Bassugg",
    icon: PawPrints,
  },
  {
    name: "Bavarian Mountain Hound",
    icon: PawPrints,
  },
  {
    name: "Beagador",
    icon: PawPrints,
  },
  {
    name: "Beagle",
    icon: Beagle,
  },
  {
    name: "Beaglier",
    icon: PawPrints,
  },
  {
    name: "Bearded Collie",
    icon: PawPrints,
  },
  {
    name: "Beauceron",
    icon: PawPrints,
  },
  {
    name: "Bedlington Terrier",
    icon: PawPrints,
  },

  {
    name: "Bedlington Whippet",
    icon: PawPrints,
  },
  {
    name: "Belgian Groenendael",
    icon: PawPrints,
  },
  {
    name: "Belgian Laekenois",
    icon: PawPrints,
  },
  {
    name: "Belgian Malinois",
    icon: PawPrints,
  },
  {
    name: "Belgian Shepherd",
    icon: PawPrints,
  },
  {
    name: "Belgian Tervuren",
    icon: PawPrints,
  },
  {
    name: "Bergamasco",
    icon: PawPrints,
  },
  {
    name: "Bernedoodle",
    icon: PawPrints,
  },
  {
    name: "Bernese Mountain",
    icon: PawPrints,
  },
  {
    name: "Bichon Frise",
    icon: PawPrints,
  },
  {
    name: "Bichon Yorkie",
    icon: PawPrints,
  },
  {
    name: "Bich-poo",
    icon: PawPrints,
  },
  {
    name: "Biewer Terrier",
    icon: PawPrints,
  },
  {
    name: "Black and Tan Coonhound",
    icon: PawPrints,
  },
  {
    name: "Black Russian Terrier",
    icon: PawPrints,
  },
  {
    name: "Bloodhound",
    icon: PawPrints,
  },
  {
    name: "Blue Lacy",
    icon: PawPrints,
  },
  {
    name: "Bluetick Coonhound",
    icon: PawPrints,
  },
  {
    name: "Boerboel",
    icon: PawPrints,
  },
  {
    name: "Bolognese",
    icon: PawPrints,
  },
  {
    name: "Borador",
    icon: PawPrints,
  },
  {
    name: "Border Collie",
    icon: PawPrints,
  },
  {
    name: "Border Jack",
    icon: PawPrints,
  },
  {
    name: "Border Terrier",
    icon: PawPrints,
  },
  {
    name: "Bordoodle",
    icon: PawPrints,
  },
  {
    name: "Borzoi",
    icon: PawPrints,
  },
  {
    name: "Boston Terrier",
    icon: PawPrints,
  },
  {
    name: "Bouvier Des Flandres",
    icon: PawPrints,
  },
  {
    name: "Boxador",
    icon: PawPrints,
  },
  {
    name: "Boxer",
    icon: PawPrints,
  },
  {
    name: "Bracco Italiano",
    icon: PawPrints,
  },
  {
    name: "Braque D'Auvergne",
    icon: PawPrints,
  },
  {
    name: "Briard",
    icon: PawPrints,
  },
  {
    name: "Brittany",
    icon: PawPrints,
  },
  {
    name: "Bugg",
    icon: PawPrints,
  },
  {
    name: "Bullmastiff",
    icon: PawPrints,
  },
  {
    name: "Bull Pei",
    icon: PawPrints,
  },
  {
    name: "Bull Terrier",
    icon: PawPrints,
  },
  {
    name: "Cairn Terrier",
    icon: PawPrints,
  },
  {
    name: "Canaan",
    icon: PawPrints,
  },
  {
    name: "Canadian Eskimo",
    icon: PawPrints,
  },
  {
    name: "Cane Corso Italiano",
    icon: PawPrints,
  },
  {
    name: "Cardigan Welsh Corgi",
    icon: PawPrints,
  },
  {
    name: "Catahoula Leopard",
    icon: PawPrints,
  },
  {
    name: "Catalan Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Caucasian Shepherd",
    icon: PawPrints,
  },
  {
    name: "Cavachon",
    icon: PawPrints,
  },
  {
    name: "Cavalier King Charles Spaniel",
    icon: PawPrints,
  },
  {
    name: "Cavapom",
    icon: PawPrints,
  },
  {
    name: "Cavapoo",
    icon: PawPrints,
  },
  {
    name: "Cavapoochon",
    icon: PawPrints,
  },
  {
    name: "Cava Tzu",
    icon: PawPrints,
  },
  {
    name: "Cesky Terrier",
    icon: PawPrints,
  },
  {
    name: "Cheagle",
    icon: PawPrints,
  },
  {
    name: "Chesapeake Bay Retriever",
    icon: PawPrints,
  },
  {
    name: "Chihuahua",
    icon: Chihuahua,
  },
  {
    name: "Chinook",
    icon: PawPrints,
  },
  {
    name: "Chipoo",
    icon: PawPrints,
  },

  {
    name: "Chi Staffy Bull",
    icon: PawPrints,
  },
  {
    name: "Chiweenie",
    icon: PawPrints,
  },
  {
    name: "Chorkie",
    icon: PawPrints,
  },

  {
    name: "Chow Chow",
    icon: ChowChow,
  },

  {
    name: "Chow Shepherd",
    icon: PawPrints,
  },
  {
    name: "Chug",
    icon: PawPrints,
  },
  {
    name: "Chusky",
    icon: PawPrints,
  },
  {
    name: "Cirneco Dell'Etna",
    icon: PawPrints,
  },
  {
    name: "Clumber Spaniel",
    icon: PawPrints,
  },
  {
    name: "Cockachon",
    icon: PawPrints,
  },
  {
    name: "Cockador",
    icon: PawPrints,
  },
  {
    name: "Cockapoo",
    icon: PawPrints,
  },
  {
    name: "Cocker Spaniel",
    icon: PawPrints,
  },
  {
    name: "Cojack",
    icon: PawPrints,
  },
  {
    name: "Corgi",
    icon: PawPrints,
  },
  {
    name: "Coton De Tulear",
    icon: PawPrints,
  },
  {
    name: "Curly Coated Retriever",
    icon: PawPrints,
  },
  {
    name: "Dachshund",
    icon: PawPrints,
  },

  {
    name: "Dameranian",
    icon: PawPrints,
  },
  {
    name: "Dandie Dinmont Terrier",
    icon: PawPrints,
  },
  {
    name: "Deerhound",
    icon: PawPrints,
  },
  {
    name: "Dobermann",
    icon: PawPrints,
  },
  {
    name: "Dogue de Bordeaux",
    icon: PawPrints,
  },
  {
    name: "Dorkie",
    icon: PawPrints,
  },
  {
    name: "Doxiepoo",
    icon: PawPrints,
  },
  {
    name: "Dutch Shepherd",
    icon: PawPrints,
  },
  {
    name: "English Bulldog",
    icon: PawPrints,
  },
  {
    name: "English Coonhound",
    icon: PawPrints,
  },
  {
    name: "English Setter",
    icon: PawPrints,
  },
  {
    name: "English Toy Terrier",
    icon: PawPrints,
  },
  {
    name: "Entlebucher Mountain",
    icon: PawPrints,
  },
  {
    name: "Estrela Mountain",
    icon: PawPrints,
  },
  {
    name: "Eurasier",
    icon: PawPrints,
  },
  {
    name: "Field Spaniel",
    icon: PawPrints,
  },
  {
    name: "Finnish Lapphund",
    icon: PawPrints,
  },
  {
    name: "Finnish Spitz",
    icon: PawPrints,
  },
  {
    name: "Flat-Coated Retriever",
    icon: PawPrints,
  },
  {
    name: "Foxhound",
    icon: PawPrints,
  },
  {
    name: "Fox Terrier",
    icon: PawPrints,
  },
  {
    name: "French Bulldog",
    icon: PawPrints,
  },
  {
    name: "French Bull Jack",
    icon: PawPrints,
  },
  {
    name: "Frenchie Staff",
    icon: PawPrints,
  },
  {
    name: "French Pin",
    icon: PawPrints,
  },
  {
    name: "Frug",
    icon: PawPrints,
  },
  {
    name: "Gerberian Shepsky",
    icon: PawPrints,
  },
  {
    name: "German Longhaired Pointer",
    icon: PawPrints,
  },
  {
    name: "German Pinscher",
    icon: PawPrints,
  },
  {
    name: "German Shepherd",
    icon: GermanShepherd,
  },

  {
    name: "German Shorthaired Pointer",
    icon: PawPrints,
  },
  {
    name: "German Spitz",
    icon: PawPrints,
  },
  {
    name: "German Wirehaired Pointer",
    icon: PawPrints,
  },
  {
    name: "Giant Schnauzer",
    icon: PawPrints,
  },
  {
    name: "Glen Of Imaal Terrier",
    icon: PawPrints,
  },
  {
    name: "Goberian",
    icon: PawPrints,
  },
  {
    name: "Goldendoodle",
    icon: PawPrints,
  },
  {
    name: "Golden Dox",
    icon: PawPrints,
  },
  {
    name: "Golden Labrador",
    icon: PawPrints,
  },
  {
    name: "Golden Retriever",
    icon: PawPrints,
  },
  {
    name: "Golden Shepherd",
    icon: PawPrints,
  },
  {
    name: "Gordon Setter",
    icon: PawPrints,
  },
  {
    name: "Grand Basset Griffon Vendeen",
    icon: PawPrints,
  },
  {
    name: "Grand Bleu De Gascogne",
    icon: PawPrints,
  },
  {
    name: "Great Dane",
    icon: PawPrints,
  },
  {
    name: "Great Pyrenees",
    icon: PawPrints,
  },
  {
    name: "Greater Swiss Mountain",
    icon: PawPrints,
  },
  {
    name: "Greek Harehound",
    icon: PawPrints,
  },
  {
    name: "Greenland",
    icon: PawPrints,
  },
  {
    name: "Greyhound",
    icon: PawPrints,
  },
  {
    name: "Griffon Bruxellois",
    icon: PawPrints,
  },
  {
    name: "Griffon Fauve De Bretagne",
    icon: PawPrints,
  },
  {
    name: "Hairless Chinese Crested",
    icon: PawPrints,
  },
  {
    name: "Hamiltonstovare",
    icon: PawPrints,
  },
  {
    name: "Harrier",
    icon: PawPrints,
  },
  {
    name: "Havanese",
    icon: PawPrints,
  },
  {
    name: "Horgi",
    icon: PawPrints,
  },
  {
    name: "Hovawart",
    icon: PawPrints,
  },
  {
    name: "Hungarian Kuvasz",
    icon: PawPrints,
  },
  {
    name: "Hungarian Puli",
    icon: PawPrints,
  },
  {
    name: "Hungarian Pumi",
    icon: PawPrints,
  },
  {
    name: "Hungarian Vizsla",
    icon: PawPrints,
  },
  {
    name: "Ibizan Hound",
    icon: PawPrints,
  },
  {
    name: "Icelandic Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Irish Doodle",
    icon: PawPrints,
  },
  {
    name: "Irish Red & White Setter",
    icon: PawPrints,
  },
  {
    name: "Irish Setter",
    icon: PawPrints,
  },
  {
    name: "Irish Terrier",
    icon: PawPrints,
  },
  {
    name: "Irish Water Spaniel",
    icon: PawPrints,
  },
  {
    name: "Irish Wolfhound",
    icon: PawPrints,
  },
  {
    name: "Italian Greyhound",
    icon: PawPrints,
  },
  {
    name: "Italian Spinone",
    icon: PawPrints,
  },
  {
    name: "Jack-A-Bee",
    icon: PawPrints,
  },
  {
    name: "Jackahuahua",
    icon: PawPrints,
  },
  {
    name: "Jack-A-Poo",
    icon: PawPrints,
  },
  {
    name: "Jack Russell Terrier",
    icon: PawPrints,
  },
  {
    name: "Jackshund",
    icon: PawPrints,
  },
  {
    name: "Jacktzu",
    icon: PawPrints,
  },
  {
    name: "Japanese Akita",
    icon: PawPrints,
  },
  {
    name: "Japanese Chin",
    icon: PawPrints,
  },
  {
    name: "Japanese Shiba",
    icon: PawPrints,
  },
  {
    name: "Japanese Spitz",
    icon: PawPrints,
  },
  {
    name: "Johnson American Bulldog",
    icon: PawPrints,
  },
  {
    name: "Jug",
    icon: PawPrints,
  },
  {
    name: "Keeshond",
    icon: PawPrints,
  },
  {
    name: "Kerry Blue Terrier",
    icon: PawPrints,
  },
  {
    name: "King Charles Spaniel",
    icon: PawPrints,
  },
  {
    name: "Kokoni",
    icon: PawPrints,
  },
  {
    name: "Komondor",
    icon: PawPrints,
  },
  {
    name: "Kooikerhondje",
    icon: PawPrints,
  },
  {
    name: "Korean Jindo",
    icon: PawPrints,
  },
  {
    name: "Korthals Griffon",
    icon: PawPrints,
  },
  {
    name: "Labradoodle",
    icon: PawPrints,
  },
  {
    name: "Labrador Retriever",
    icon: LabradorRetriever,
  },

  {
    name: "Lachon",
    icon: PawPrints,
  },
  {
    name: "Lagotto Romagnolo",
    icon: PawPrints,
  },
  {
    name: "Lakeland Terrier",
    icon: PawPrints,
  },
  {
    name: "Lancashire Heeler",
    icon: PawPrints,
  },
  {
    name: "Large Munsterlander",
    icon: PawPrints,
  },
  {
    name: "Leonberger",
    icon: PawPrints,
  },
  {
    name: "Lhasa Apso",
    icon: PawPrints,
  },
  {
    name: "Lhasapoo",
    icon: PawPrints,
  },
  {
    name: "Lhatese",
    icon: PawPrints,
  },
  {
    name: "Löwchen",
    icon: PawPrints,
  },
  {
    name: "Lurcher",
    icon: PawPrints,
  },
  {
    name: "Mal-Shi",
    icon: PawPrints,
  },
  {
    name: "Maltese",
    icon: PawPrints,
  },
  {
    name: "Maltichon",
    icon: PawPrints,
  },
  {
    name: "Maltipom",
    icon: PawPrints,
  },
  {
    name: "Malti-Poo",
    icon: PawPrints,
  },
  {
    name: "Manchester Terrier",
    icon: PawPrints,
  },
  {
    name: "Maremma Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Mastiff",
    icon: PawPrints,
  },
  {
    name: "Mexican Hairless",
    icon: PawPrints,
  },
  {
    name: "Miniature Bull Terrier",
    icon: PawPrints,
  },
  {
    name: "Miniature Pinscher",
    icon: PawPrints,
  },
  {
    name: "Miniature Poodle",
    icon: PawPrints,
  },
  {
    name: "Miniature Schnauzer",
    icon: PawPrints,
  },
  {
    name: "Miniature Schnoxie",
    icon: PawPrints,
  },
  {
    name: "Mixed Breed",
    icon: PawPrints,
  },
  {
    name: "Morkie",
    icon: PawPrints,
  },
  {
    name: "Neapolitan Mastiff",
    icon: PawPrints,
  },
  {
    name: "Newfoundland",
    icon: PawPrints,
  },
  {
    name: "New Zealand Huntaway",
    icon: PawPrints,
  },
  {
    name: "Norfolk Terrier",
    icon: PawPrints,
  },
  {
    name: "Northern Inuit",
    icon: PawPrints,
  },
  {
    name: "Norwegian Buhund",
    icon: PawPrints,
  },
  {
    name: "Norwegian Elkhound",
    icon: PawPrints,
  },
  {
    name: "Norwich Terrier",
    icon: PawPrints,
  },
  {
    name: "Nova Scotia Duck Tolling Retriever",
    icon: PawPrints,
  },
  {
    name: "Old English Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Otterhound",
    icon: PawPrints,
  },
  {
    name: "Papillon",
    icon: PawPrints,
  },
  {
    name: "Parson Russell Terrier",
    icon: PawPrints,
  },
  {
    name: "Patterdale Terrier",
    icon: PawPrints,
  },
  {
    name: "Peek-a-poo",
    icon: PawPrints,
  },
  {
    name: "Pekingese",
    icon: PawPrints,
  },
  {
    name: "Pembroke Welsh Corgi",
    icon: PawPrints,
  },
  {
    name: "Petit Basset Griffon Vendeen",
    icon: PawPrints,
  },
  {
    name: "Pharaoh Hound",
    icon: PawPrints,
  },
  {
    name: "Picardy Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Pitsky",
    icon: PawPrints,
  },
  {
    name: "Plott Hound",
    icon: PawPrints,
  },
  {
    name: "Pointer",
    icon: PawPrints,
  },
  {
    name: "Polish Lowland Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Pomapoo",
    icon: PawPrints,
  },
  {
    name: "Pomchi",
    icon: PawPrints,
  },
  {
    name: "Pomeranian",
    icon: Pomeranian,
  },
  {
    name: "Pomsky",
    icon: Pomeranian,
  },
  {
    name: "Poodle",
    icon: Poodle,
  },

  {
    name: "Portuguese Podengo",
    icon: PawPrints,
  },
  {
    name: "Portuguese Pointer",
    icon: PawPrints,
  },
  {
    name: "Portuguese Water",
    icon: PawPrints,
  },
  {
    name: "Powderpuff Chinese Crested",
    icon: PawPrints,
  },

  {
    name: "Pug",
    icon: Pug,
  },
  {
    name: "Pugalier",
    icon: PawPrints,
  },
  {
    name: "Pugapoo",
    icon: PawPrints,
  },
  {
    name: "Puggle",
    icon: PawPrints,
  },
  {
    name: "Pugzu",
    icon: PawPrints,
  },
  {
    name: "Pyrenean Mastiff",
    icon: PawPrints,
  },
  {
    name: "Pyrenean Shepherd",
    icon: PawPrints,
  },
  {
    name: "Rat Terrier",
    icon: PawPrints,
  },
  {
    name: "Redbone Coonhound",
    icon: PawPrints,
  },
  {
    name: "Rescue",
    icon: PawPrints,
  },
  {
    name: "Rhodesian Ridgeback",
    icon: PawPrints,
  },
  {
    name: "Rottweiler",
    icon: PawPrints,
  },
  {
    name: "Rough Collie",
    icon: PawPrints,
  },
  {
    name: "Russian Toy",
    icon: PawPrints,
  },
  {
    name: "Saluki",
    icon: PawPrints,
  },
  {
    name: "Samoyed",
    icon: PawPrints,
  },
  {
    name: "Schipperke",
    icon: PawPrints,
  },
  {
    name: "Schnauzer",
    icon: PawPrints,
  },
  {
    name: "Schnoodle",
    icon: PawPrints,
  },
  {
    name: "Scottish Terrier",
    icon: PawPrints,
  },
  {
    name: "Sealyham Terrier",
    icon: PawPrints,
  },
  {
    name: "Segugio Italiano",
    icon: PawPrints,
  },
  {
    name: "Shar Pei",
    icon: PawPrints,
  },
  {
    name: "Sheepadoodle",
    icon: PawPrints,
  },
  {
    name: "Shetland Sheepdog",
    icon: PawPrints,
  },
  {
    name: "Shih-poo",
    icon: PawPrints,
  },

  {
    name: "Shih Tzu",
    icon: ShihTzu,
  },

  {
    name: "Shollie",
    icon: PawPrints,
  },
  {
    name: "Shorkie",
    icon: PawPrints,
  },
  {
    name: "Siberian Cocker",
    icon: PawPrints,
  },
  {
    name: "Siberian Husky",
    icon: SiberianHusky,
  },

  {
    name: "Skye Terrier",
    icon: PawPrints,
  },
  {
    name: "Sloughi",
    icon: PawPrints,
  },
  {
    name: "Slovakian Rough Haired Pointer",
    icon: PawPrints,
  },
  {
    name: "Small Munsterlander",
    icon: PawPrints,
  },
  {
    name: "Smooth Collie",
    icon: PawPrints,
  },
  {
    name: "Soft Coated Wheaten Terrier",
    icon: PawPrints,
  },
  {
    name: "Spanish Water",
    icon: PawPrints,
  },
  {
    name: "Sporting Lucas Terrier",
    icon: PawPrints,
  },
  {
    name: "Springador",
    icon: PawPrints,
  },
  {
    name: "Springer Spaniel",
    icon: PawPrints,
  },
  {
    name: "Sprocker",
    icon: PawPrints,
  },
  {
    name: "Sprollie",
    icon: PawPrints,
  },
  {
    name: "Sproodle",
    icon: PawPrints,
  },
  {
    name: "Stabyhoun",
    icon: PawPrints,
  },
  {
    name: "Staffador",
    icon: PawPrints,
  },
  {
    name: "Staffordshire Bull Terrier",
    icon: PawPrints,
  },
  {
    name: "Staffy Jack",
    icon: PawPrints,
  },
  {
    name: "St. Bernard",
    icon: PawPrints,
  },
  {
    name: "Sussex Spaniel",
    icon: PawPrints,
  },
  {
    name: "Swedish Lapphund",
    icon: PawPrints,
  },
  {
    name: "Swedish Vallhund",
    icon: PawPrints,
  },
  {
    name: "Tamaskan",
    icon: PawPrints,
  },
  {
    name: "Terri-Poo",
    icon: PawPrints,
  },
  {
    name: "Tibetan Mastiff",
    icon: PawPrints,
  },
  {
    name: "Tibetan Spaniel",
    icon: PawPrints,
  },
  {
    name: "Tibetan Terrier",
    icon: PawPrints,
  },
  {
    name: "Toy Fox Terrier",
    icon: PawPrints,
  },
  {
    name: "Toy Poodle",
    icon: PawPrints,
  },
  {
    name: "Trailhound",
    icon: PawPrints,
  },
  {
    name: "Treeing Walker Coonhound",
    icon: PawPrints,
  },
  {
    name: "Turkish Kangal",
    icon: PawPrints,
  },
  {
    name: "Weimaraner",
    icon: PawPrints,
  },
  {
    name: "Welsh Springer Spaniel",
    icon: PawPrints,
  },
  {
    name: "Welsh Terrier",
    icon: PawPrints,
  },
  {
    name: "West Highland White Terrier",
    icon: PawPrints,
  },
  {
    name: "Westiepoo",
    icon: PawPrints,
  },
  {
    name: "Whippet",
    icon: PawPrints,
  },
  {
    name: "White Swiss Shepherd",
    icon: PawPrints,
  },
  {
    name: "Working Cocker Spaniel",
    icon: PawPrints,
  },
  {
    name: "Yorkie Russell",
    icon: PawPrints,
  },
  {
    name: "Yorkipoo",
    icon: PawPrints,
  },
  {
    name: "Yorkshire Terrier",
    icon: PawPrints,
  },
  {
    name: "Zuchon",
    icon: PawPrints,
  },
];

export default breeds;
