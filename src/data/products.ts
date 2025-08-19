import { Product } from "../types";

const products: Product[] = [
  {
    id: "1",
    name: "Photo Frames",
    title: "Photo Frames",
    description: "A beautiful photo frame.",
    imageUrl: "/images/products/photoframe.jpeg",
    categoryId: "photoframes",
  },
  {
    id: "2",
    name: "Gift Hampers",
    title: "Gift Hampers",
    description: "A delightful gift hamper.",
    imageUrl: "/images/hamper.jpg",
    categoryId: "hampers",
  },
  {
    id: "3",
    name: "Customized Mug",
    title: "Customized Mug",
    description: "A personalized mug for your loved ones.",
    imageUrl: "/images/products/mug.jpeg",
    categoryId: "birthdayitems",
  },
  {
    id: "4",
    name: "Hats / Caps",
    title: "Hats / Caps",
    description: "A special gift set for vacation.",
    imageUrl: "/images/products/hats.jpeg",
    categoryId: "anniversaryitems",
  },
  {
    id: "5",
    name: "Keychains",
    title: "Keychains",
    description: "A beautiful lantern for festive occasions.",
    imageUrl: "/images/products/keychain.jpeg",
    categoryId: "festiveitems",
  },
  {
    id: "6",
    name: "Wallets",
    title: "Wallets",
    description: "A stylish Wallets for your loved ones.",
    imageUrl: "/images/products/wallets.jpeg",
    categoryId: "leditems",
  },
  // {
  //   id: "7",
  //   name: "",
  //   title: "",
  //   description: "A versatile gift card for any occasion.",
  //   price: 1000,
  //   imageUrl: "/images/products/giftcard.jpeg",
  //   categoryId: "giftcards"
  // }
];

export default products;
