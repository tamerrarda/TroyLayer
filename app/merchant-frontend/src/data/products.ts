export interface Product {
  id: string;
  brand: string;
  name: string;
  price: number;
  delivery: number;
  currency: string;
  images: string[];
  sizes: string[];
  farfetchId: string;
  brandStyleId: string;
  description: string;
  composition: string;
  highlights: string[];
}

export const PRADA_SKIRT: Product = {
  id: "prada-skirt",
  brand: "PRADA",
  name: "embroidered poplin skirt",
  price: 4650,
  delivery: 23,
  currency: "USD",
  images: [
    "https://media.istockphoto.com/id/1747107704/tr/foto%C4%9Fraf/fashion-details-of-black-long-skirt-red-gloves-and-leather-handbag.jpg?s=612x612&w=0&k=20&c=CmXMJJrLP2dHqBby3HPVg8IVWm323LLcTUiigwbf5uk=",
    "https://media.istockphoto.com/id/1308237234/tr/foto%C4%9Fraf/zarif-elbiseler-giyen-kad%C4%B1nlar-sokak-stili-detay%C4%B1.jpg?s=612x612&w=0&k=20&c=1tbK6uQWDhXchdrPfFZQwn3lXfz3NZQwmFCUGXduvn4=",
    "https://media.istockphoto.com/id/1359562499/tr/foto%C4%9Fraf/outdoor-fashion-portrait-of-elegant-woman-wearing-lilac-suit-yellow-sunglasses-holding.jpg?s=612x612&w=0&k=20&c=u6DlvGVU6RhE98mZwg1L_jNtACfjp-LpAeEEyPktdkg=",
    "https://media.istockphoto.com/id/888019382/tr/foto%C4%9Fraf/her-zaman-al%C4%B1%C5%9Fveri%C5%9F-onu-mutlu-ediyor.jpg?s=612x612&w=0&k=20&c=f3jWIPUfQMEirgdnuU-JBLEEgSVCVO4CXfPJiVqvw4E=",
  ],
  sizes: ["34 IT", "36 IT", "38 IT", "40 IT", "42 IT"],
  farfetchId: "35974708",
  brandStyleId: "P178IRSOOO19Z3",
  description:
    "A romantic lightness finds new creative expressions thanks to the precious embroidery on this skirt with lace trim.",
  composition: "Cotton 100%",
  highlights: [
    "full skirt",
    "unlined garment",
    "side zipper closure with hook",
    "inseam pockets",
    "elasticized waistband",
    "lace trim on the hem",
  ],
};

export const TRY_RATE_BASE = 33.78;

export const GRID_PRODUCTS = [
  {
    id: "1",
    brand: "BOTTEGA VENETA",
    name: "Knot leather clutch",
    price: 2850,
    image: "https://media.istockphoto.com/id/1404894296/tr/foto%C4%9Fraf/woman-with-stylish-bag-on-grey-background-closeup.jpg?s=612x612&w=0&k=20&c=YxdlgRG-Ns_Nqeld9L5UdgsgoWiENgMvPhHb9_RqdDM=",
  },
  {
    id: "2",
    brand: "SAINT LAURENT",
    name: "Le 5 à 7 leather shoulder bag",
    price: 1990,
    image: "https://media.istockphoto.com/id/1271796113/tr/foto%C4%9Fraf/kad%C4%B1nlar-l%C3%BCks-otomobilin-yan%C4%B1nda-%C3%A7anta-tutuyor.jpg?s=612x612&w=0&k=20&c=B1WkHJlrkHs3g0UmEUOsy6Deg2O4E3qJtJ2z1iqfZsA=",
  },
  {
    id: "3",
    brand: "GUCCI",
    name: "GG-jacquard knit cardigan",
    price: 1650,
    image: "https://media.istockphoto.com/id/1293366109/tr/foto%C4%9Fraf/bu-ma%C3%A7-benimle-m%C3%BCkemmel.jpg?s=612x612&w=0&k=20&c=QgawvZJXqwyRQA9OIn0QAKlr_gz7XAdWllwbm6OWA9s=",
  },
  {
    id: "4",
    brand: "VALENTINO GARAVANI",
    name: "VLogo-plaque leather belt",
    price: 485,
    image: "https://media.istockphoto.com/id/1338720994/tr/foto%C4%9Fraf/middle-aged-mature-woman-with-blond-hair-wearing-sunglasses-walking-on-city-streets-while.jpg?s=612x612&w=0&k=20&c=_v4OSUbUBCCydeixWqg3hHBijkgxyhM4I6p6EIjW0GU=",
  },
  {
    id: "5",
    brand: "TOTEME",
    name: "Scarf-collar cashmere coat",
    price: 2100,
    image: "https://media.istockphoto.com/id/2155498773/tr/foto%C4%9Fraf/confident-woman-walking-with-red-suitcase-in-modern-urban-setting.jpg?s=612x612&w=0&k=20&c=ZW8UBolfzfT6bXu9fziJuTXcOvwboP2VInu_vA1Irms=",
  },
  {
    id: "6",
    brand: "THE ROW",
    name: "Margaux 10 leather tote bag",
    price: 3950,
    image: "https://media.istockphoto.com/id/487745566/tr/foto%C4%9Fraf/woman-sitting-on-sofa-with-colorful-shoes-and-bags-shopping.jpg?s=612x612&w=0&k=20&c=LkIYIYq1r6kn08O-BpL4Kyibikf2LVxoWsPtBooFPIs=",
  },
  {
    id: "7",
    brand: "LOEWE",
    name: "Puzzle leather shoulder bag",
    price: 2900,
    image: "https://media.istockphoto.com/id/2155498776/tr/foto%C4%9Fraf/woman-walking-with-shopping-bags-on-city-street.jpg?s=612x612&w=0&k=20&c=edxyABjLlKujKxn8aczLTaAjLxKZElESPHXbvAXZoi4=",
  },
  {
    id: "8",
    brand: "JACQUEMUS",
    name: "Le Bambino long leather bag",
    price: 610,
    image: "https://media.istockphoto.com/id/980872396/tr/foto%C4%9Fraf/birlikte-y%C3%BCr%C3%BCy%C3%BC%C5%9F-%C5%9F%C4%B1k-bayan-arkada%C5%9F.jpg?s=612x612&w=0&k=20&c=9ODk-6q2vCPU3eFqd2N_96MkepOYixKmyffpyUJ9KQg=",
  },
];

export const MENSWEAR_GRID = [
  {
    id: "m1",
    brand: "BRUNELLO CUCINELLI",
    name: "Cashmere roll-neck jumper",
    price: 2450,
    image: "https://media.istockphoto.com/id/1201024668/tr/foto%C4%9Fraf/g%C3%BCne%C5%9F-g%C3%B6zl%C3%BC%C4%9F%C3%BC-ve-beyaz-g%C3%B6mlek-giyen-%C5%9F%C4%B1k-adam-%C5%9Fehir-hayat%C4%B1.jpg?s=612x612&w=0&k=20&c=kOHgcByd4_ugJS94x0rylG9PgKdjIHJ1pnbYYxEhPEI=",
  },
  {
    id: "m2",
    brand: "TOM FORD",
    name: "Shelton slim-fit suit",
    price: 5800,
    image: "https://media.istockphoto.com/id/1300966679/tr/foto%C4%9Fraf/g%C3%B6l-arka-plan-%C3%BCzerinde-klasik-tak%C4%B1m-elbiseli-gen%C3%A7-yak%C4%B1%C5%9F%C4%B1kl%C4%B1-adam.jpg?s=612x612&w=0&k=20&c=9nEu1TBN79FH2PENBN91dODKTKaR2suJUcumCTElgbA=",
  },
  {
    id: "m3",
    brand: "ZEGNA",
    name: "Oasi Cashmere cardigan",
    price: 1890,
    image: "https://media.istockphoto.com/id/1201024669/tr/foto%C4%9Fraf/rahat-giyim-yak%C4%B1%C5%9F%C4%B1kl%C4%B1-adam.jpg?s=612x612&w=0&k=20&c=_0Nr4bSDQ8Lzbt3kNovsqqG3H65QJhSsUoxQf7MBVW8=",
  },
  {
    id: "m4",
    brand: "LORO PIANA",
    name: "Storm System® wool coat",
    price: 4200,
    image: "https://media.istockphoto.com/id/519340552/tr/foto%C4%9Fraf/woman-in-sarong-yachting-white-sails-luxury-travel.jpg?s=612x612&w=0&k=20&c=fIDwIjhTE_HF4HNvLaUAvbZv7H0FhrB8Gp1UxWxPnpA=",
  },
];

export const DEPT_TILES = [
  {
    dept: "WOMENSWEAR",
    href: "/womenswear",
    image: "https://media.istockphoto.com/id/1338720994/tr/foto%C4%9Fraf/middle-aged-mature-woman-with-blond-hair-wearing-sunglasses-walking-on-city-streets-while.jpg?s=612x612&w=0&k=20&c=_v4OSUbUBCCydeixWqg3hHBijkgxyhM4I6p6EIjW0GU=",
  },
  {
    dept: "MENSWEAR",
    href: "/menswear",
    image: "https://media.istockphoto.com/id/1300966679/tr/foto%C4%9Fraf/g%C3%B6l-arka-plan-%C3%BCzerinde-klasik-tak%C4%B1m-elbiseli-gen%C3%A7-yak%C4%B1%C5%9F%C4%B1kl%C4%B1-adam.jpg?s=612x612&w=0&k=20&c=9nEu1TBN79FH2PENBN91dODKTKaR2suJUcumCTElgbA=",
  },
  {
    dept: "KIDSWEAR",
    href: "/kidswear",
    image: "https://media.istockphoto.com/id/2155498776/tr/foto%C4%9Fraf/woman-walking-with-shopping-bags-on-city-street.jpg?s=612x612&w=0&k=20&c=edxyABjLlKujKxn8aczLTaAjLxKZElESPHXbvAXZoi4=",
  },
];

export const DEPT_STRIPS = [
  {
    label: "NEW IN",
    image: "https://media.istockphoto.com/id/1308237234/tr/foto%C4%9Fraf/zarif-elbiseler-giyen-kad%C4%B1nlar-sokak-stili-detay%C4%B1.jpg?s=612x612&w=0&k=20&c=1tbK6uQWDhXchdrPfFZQwn3lXfz3NZQwmFCUGXduvn4=",
  },
  {
    label: "CLOTHING",
    image: "https://media.istockphoto.com/id/1359562499/tr/foto%C4%9Fraf/outdoor-fashion-portrait-of-elegant-woman-wearing-lilac-suit-yellow-sunglasses-holding.jpg?s=612x612&w=0&k=20&c=u6DlvGVU6RhE98mZwg1L_jNtACfjp-LpAeEEyPktdkg=",
  },
  {
    label: "BAGS",
    image: "https://media.istockphoto.com/id/1404894296/tr/foto%C4%9Fraf/woman-with-stylish-bag-on-grey-background-closeup.jpg?s=612x612&w=0&k=20&c=YxdlgRG-Ns_Nqeld9L5UdgsgoWiENgMvPhHb9_RqdDM=",
  },
  {
    label: "SHOES",
    image: "https://media.istockphoto.com/id/487745566/tr/foto%C4%9Fraf/woman-sitting-on-sofa-with-colorful-shoes-and-bags-shopping.jpg?s=612x612&w=0&k=20&c=LkIYIYq1r6kn08O-BpL4Kyibikf2LVxoWsPtBooFPIs=",
  },
];

export const MOCK_ADDRESS = {
  firstName: "Erhan",
  lastName: "Türker",
  street: "Biruni Üniversitesi",
  city: "İstanbul",
  state: "İstanbul",
  country: "Turkey",
  phone: "+90 538 123 45 67",
};
