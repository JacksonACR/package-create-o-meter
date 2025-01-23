export interface Package {
  id: string;
  name: string;
  duration: number;
  durationType: "weeks";
  sessionsPerWeek: number;
  price: number;
  paymentType: "one-time" | "recurring";
  createdAt: string;
}