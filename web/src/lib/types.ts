export type BookingType = {
  package: string; // Supports either ObjectId or a string representation
  name: string;
  email: string;
  phone: string;
  travelers: number;
  specialRequests?: string; // Optional if not required in schema validation
  totalPrice: number;
};

export type PackageType = {
  title: string; // Unique as per the schema
  description: string;
  price: number;
  availableDates: string[]; // Array of strings
  image: string;
};
