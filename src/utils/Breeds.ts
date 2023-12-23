import { PawPrints } from "../assets/images";

import {
  Affenpinscher,
  AfghanHound,
  AiredaleTerrier,
  Akita,
  AlaskanKleeKai,
  AlaskanMalamute,
  AmericanBulldog,
  AmericanCockerSpaniel,
  AmericanEskimo,
  AmericanHairlessTerrier,
  AmericanPitBullTerrier,
  AmericanStaffordshireTerrier,
  AmericanWaterSpaniel,
  AnatolianShepherd,
  Aussiedoodle,
  AustralianCattle,
  AustralianKelpie,
  AustralianLabradoodle,
  AustralianShepherd,
  AustralianSilkyTerrier,
  AustralianTerrier,
} from "../assets/images/dogs";

import {
  BassetBleuDeGascogne,
  BassetHound,
  Bassugg,
  BavarianMountainHound,
  Beagador,
  Beagle,
  Beaglier,
  BeardedCollie,
  Beauceron,
  BedlingtonTerrier,
  BedlingtonWhippet,
  BelgianGroenendael,
  BelgianLaekenois,
  BelgianMalinois,
  BelgianTervuren,
  Bergamasco,
  Bernedoodle,
  BerneseMountain,
  BichonYorkie,
  Bichpoo,
  BiewerTerrier,
  BlackandTanCoonhound,
  BlackRussianTerrier,
  Bloodhound,
  BlueLacy,
  BluetickCoonhound,
  Boerboel,
  Bolognese,
  Borador,
  BorderCollie,
  BorderJack,
  BorderTerrier,
  Bordoodle,
  Borzoi,
  BostonTerrier,
  BouvierDesFlandres,
  Boxador,
  Boxer,
  BraccoItaliano,
  BraqueDAuvergne,
  Briard,
  Brittany,
  Bugg,
  Bullmastiff,
  BullPei,
  BullTerrier,
} from "../assets/images/dogs";

import {
  CairnTerrier,
  Canaan,
  CanadianEskimo,
  CaneCorsoItaliano,
  CardiganWelshCorgi,
  CatahoulaLeopard,
  CatalanSheepDog,
  CaucasianShepherd,
  Cavachon,
  CavalierKingCharlesSpaniel,
  Cavapom,
  Cavapoo,
  Cavapoochon,
  CavaTzu,
  CeskyTerrier,
  Cheagle,
  ChesapeakeBayRetriever,
  Chihuahua,
  Chinook,
  Chipoo,
  ChiStaffyBull,
  Chiweenie,
  Chorkie,
  ChowChow,
  ChowShepherd,
  Chug,
  Chusky,
  CirnecoDellEtna,
  ClumberSpaniel,
  Cockachon,
  Cockador,
  Cockapoo,
  CockerSpaniel,
  Cojack,
  Corgi,
  CotonDeTulear,
  CurlyCoatedRetriever,
} from "../assets/images/dogs";

import {
  Dachshund,
  Dalmatian,
  Dameranian,
  DandieDinmontTerrier,
  Deerhound,
  Dobermann,
} from "../assets/images/dogs";
import { GermanShepherd } from "../assets/images/dogs";
import { LabradorRetriever } from "../assets/images/dogs";
import { Pomeranian } from "../assets/images/dogs";
import { Poodle } from "../assets/images/dogs";
import { Pug } from "../assets/images/dogs";
import { ShihTzu } from "../assets/images/dogs";
import { SiberianHusky } from "../assets/images/dogs";

const breeds: Array<{ name: string; icon: string } | string> = [
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
    icon: AmericanPitBullTerrier,
  },
  {
    name: "American Staffordshire Terrier",
    icon: AmericanStaffordshireTerrier,
  },
  {
    name: "American Water Spaniel",
    icon: AmericanWaterSpaniel,
  },
  {
    name: "Anatolian Shepherd",
    icon: AnatolianShepherd,
  },
  {
    name: "Aussiedoodle",
    icon: Aussiedoodle,
  },
  {
    name: "Australian Cattle",
    icon: AustralianCattle,
  },
  {
    name: "Australian Kelpie",
    icon: AustralianKelpie,
  },
  {
    name: "Australian Labradoodle",
    icon: AustralianLabradoodle,
  },
  {
    name: "Australian Shepherd",
    icon: AustralianShepherd,
  },
  {
    name: "Australian Silky Terrier",
    icon: AustralianSilkyTerrier,
  },
  {
    name: "Australian Terrier",
    icon: AustralianTerrier,
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
    icon: BassetBleuDeGascogne,
  },
  {
    name: "Basset Fauve De Bretagne",
    icon: PawPrints,
  },
  {
    name: "Basset Hound",
    icon: BassetHound,
  },
  {
    name: "Bassugg",
    icon: Bassugg,
  },
  {
    name: "Bavarian Mountain Hound",
    icon: BavarianMountainHound,
  },
  {
    name: "Beagador",
    icon: Beagador,
  },
  {
    name: "Beagle",
    icon: Beagle,
  },
  {
    name: "Beaglier",
    icon: Beaglier,
  },
  {
    name: "Bearded Collie",
    icon: BeardedCollie,
  },
  {
    name: "Beauceron",
    icon: Beauceron,
  },
  {
    name: "Bedlington Terrier",
    icon: BedlingtonTerrier,
  },

  {
    name: "Bedlington Whippet",
    icon: BedlingtonWhippet,
  },
  {
    name: "Belgian Groenendael",
    icon: BelgianGroenendael,
  },
  {
    name: "Belgian Laekenois",
    icon: BelgianLaekenois,
  },
  {
    name: "Belgian Malinois",
    icon: BelgianMalinois,
  },
  {
    name: "Belgian Shepherd",
    icon: PawPrints,
  },
  {
    name: "Belgian Tervuren",
    icon: BelgianTervuren,
  },
  {
    name: "Bergamasco",
    icon: Bergamasco,
  },
  {
    name: "Bernedoodle",
    icon: Bernedoodle,
  },
  {
    name: "Bernese Mountain",
    icon: BerneseMountain,
  },
  {
    name: "Bichon Frise",
    icon: PawPrints,
  },
  {
    name: "Bichon Yorkie",
    icon: BichonYorkie,
  },
  {
    name: "Bich-poo",
    icon: Bichpoo,
  },
  {
    name: "Biewer Terrier",
    icon: BiewerTerrier,
  },
  {
    name: "Black and Tan Coonhound",
    icon: BlackandTanCoonhound,
  },
  {
    name: "Black Russian Terrier",
    icon: BlackRussianTerrier,
  },
  {
    name: "Bloodhound",
    icon: Bloodhound,
  },
  {
    name: "Blue Lacy",
    icon: BlueLacy,
  },
  {
    name: "Bluetick Coonhound",
    icon: BluetickCoonhound,
  },
  {
    name: "Boerboel",
    icon: Boerboel,
  },
  {
    name: "Bolognese",
    icon: Bolognese,
  },
  {
    name: "Borador",
    icon: Borador,
  },
  {
    name: "Border Collie",
    icon: BorderCollie,
  },
  {
    name: "Border Jack",
    icon: BorderJack,
  },
  {
    name: "Border Terrier",
    icon: BorderTerrier,
  },
  {
    name: "Bordoodle",
    icon: Bordoodle,
  },
  {
    name: "Borzoi",
    icon: Borzoi,
  },
  {
    name: "Boston Terrier",
    icon: BostonTerrier,
  },
  {
    name: "Bouvier Des Flandres",
    icon: BouvierDesFlandres,
  },
  {
    name: "Boxador",
    icon: Boxador,
  },
  {
    name: "Boxer",
    icon: Boxer,
  },
  {
    name: "Bracco Italiano",
    icon: BraccoItaliano,
  },
  {
    name: "Braque D'Auvergne",
    icon: BraqueDAuvergne,
  },
  {
    name: "Briard",
    icon: Briard,
  },
  {
    name: "Brittany",
    icon: Brittany,
  },
  {
    name: "Bugg",
    icon: Bugg,
  },
  {
    name: "Bullmastiff",
    icon: Bullmastiff,
  },
  {
    name: "Bull Pei",
    icon: BullPei,
  },
  {
    name: "Bull Terrier",
    icon: BullTerrier,
  },
  {
    name: "Cairn Terrier",
    icon: CairnTerrier,
  },
  {
    name: "Canaan",
    icon: Canaan,
  },
  {
    name: "Canadian Eskimo",
    icon: CanadianEskimo,
  },
  {
    name: "Cane Corso Italiano",
    icon: CaneCorsoItaliano,
  },
  {
    name: "Cardigan Welsh Corgi",
    icon: CardiganWelshCorgi,
  },
  {
    name: "Catahoula Leopard",
    icon: CatahoulaLeopard,
  },
  {
    name: "Catalan Sheepdog",
    icon: CatalanSheepDog,
  },
  {
    name: "Caucasian Shepherd",
    icon: CaucasianShepherd,
  },
  {
    name: "Cavachon",
    icon: Cavachon,
  },
  {
    name: "Cavalier King Charles Spaniel",
    icon: CavalierKingCharlesSpaniel,
  },
  {
    name: "Cavapom",
    icon: Cavapom,
  },
  {
    name: "Cavapoo",
    icon: Cavapoo,
  },
  {
    name: "Cavapoochon",
    icon: Cavapoochon,
  },
  {
    name: "Cava Tzu",
    icon: CavaTzu,
  },
  {
    name: "Cesky Terrier",
    icon: CeskyTerrier,
  },
  {
    name: "Cheagle",
    icon: Cheagle,
  },
  {
    name: "Chesapeake Bay Retriever",
    icon: ChesapeakeBayRetriever,
  },
  {
    name: "Chihuahua",
    icon: Chihuahua,
  },
  {
    name: "Chinook",
    icon: Chinook,
  },
  {
    name: "Chipoo",
    icon: Chipoo,
  },
  {
    name: "Chi Staffy Bull",
    icon: ChiStaffyBull,
  },
  {
    name: "Chiweenie",
    icon: Chiweenie,
  },
  {
    name: "Chorkie",
    icon: Chorkie,
  },

  {
    name: "Chow Chow",
    icon: ChowChow,
  },

  {
    name: "Chow Shepherd",
    icon: ChowShepherd,
  },
  {
    name: "Chug",
    icon: Chug,
  },
  {
    name: "Chusky",
    icon: Chusky,
  },
  {
    name: "Cirneco Dell'Etna",
    icon: CirnecoDellEtna,
  },
  {
    name: "Clumber Spaniel",
    icon: ClumberSpaniel,
  },
  {
    name: "Cockachon",
    icon: Cockachon,
  },
  {
    name: "Cockador",
    icon: Cockador,
  },
  {
    name: "Cockapoo",
    icon: Cockapoo,
  },
  {
    name: "Cocker Spaniel",
    icon: CockerSpaniel,
  },
  {
    name: "Cojack",
    icon: Cojack,
  },
  {
    name: "Corgi",
    icon: Corgi,
  },
  {
    name: "Coton De Tulear",
    icon: CotonDeTulear,
  },
  {
    name: "Curly Coated Retriever",
    icon: CurlyCoatedRetriever,
  },
  {
    name: "Dachshund",
    icon: Dachshund,
  },
  {
    name: "Dalmatian",
    icon: Dalmatian,
  },
  {
    name: "Dameranian",
    icon: Dameranian,
  },
  {
    name: "Dandie Dinmont Terrier",
    icon: DandieDinmontTerrier,
  },
  {
    name: "Deerhound",
    icon: Deerhound,
  },
  {
    name: "Dobermann",
    icon: Dobermann,
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
