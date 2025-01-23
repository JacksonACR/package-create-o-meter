export interface Package {
  id: string;
  name: string;
  duration: number;
  durationType: "weeks" | "months";
  sessionsPerWeek: number;
  createdAt: string;
}