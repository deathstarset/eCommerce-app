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

export type Order = {
  _id: string;
  status: "Pending" | "Processing" | "Shipped";
  personal_info: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    shipping_address: string;
  };
  items: Product[];
  total_amount: number;
  archived: boolean;
};
