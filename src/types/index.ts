export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
  condition: "New" | "Used";
};
