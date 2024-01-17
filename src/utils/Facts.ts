const entries = [
  "Dogs detect scents at one part per trillion with extraordinary smell.",
  "Dog hearing is four times more acute, detecting high-frequency sounds.",
  'Basenji, the "barkless dog," produces a yodel-like sound instead of barking.',
  "Chihuahua, world's smallest breed, named after Mexican state.",
  'Dogs have three eyelids; a "haw" keeps their eyes moist.',
  "Greyhounds, the fastest breed, can reach 45 miles per hour.",
  "Dogs regulate temperature by panting; sweat glands are in paw pads.",
  "Labrador Retriever, the most popular breed in the United States.",
  "Saluki, the world's oldest breed, an ancient Egyptian hunting dog.",
  "Dogs have a unique fingerprint in their nose prints.",
  "Poodle comes in three sizes with a hypoallergenic coat option.",
  "Akita, a loyal Japanese breed originally for hunting bears.",
  'Airedale Terriers, the largest terrier breed, known as "King of Terriers."',
  "Beagle's keen sense of smell employed in airports for detection.",
  "Shiba Inu, small Japanese breed with a spirited, cat-like personality.",
  "Australian Shepherd, not from Australia, developed in the United States.",
  "Newfoundland known for webbed feet and excellent swimming abilities.",
  "Bichon Frise, small, fluffy dog with a cheerful disposition.",
  "Corgi, herding breed with short legs and a long body.",
  "Boxer, medium to large-sized breed, strong jaw, and muscular build.",
  "Great Dane, world's tallest dog, with some reaching over 3 feet.",
  "Pug, a small breed with a wrinkled face and curled tail.",
  "Scottish Terrier, a favorite of President F. D. Roosevelt.",
  "Whippet, sleek and athletic breed, one of the fastest accelerators.",
  "Collie gained fame through Lassie, known for intelligence and loyalty.",
  "Bulldog's appearance includes a pushed-in nose and loose, saggy skin.",
  "Cavalier King Charles Spaniel, a small toy breed with affection.",
  'Rhodesian Ridgeback, named for the distinctive "ridge" along its back.',
  "Shih Tzu, known for a long, flowing coat and friendly demeanor.",
  "Jack Russell Terrier, high-energy breed, originally for fox hunting.",
];

const Get = () => {
  const randomIndex = Math.floor(Math.random() * entries.length);
  return entries[randomIndex];
};
export default { Get, entries };
