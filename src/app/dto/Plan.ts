import { Feature } from "./Feature";

export interface Plan {
  icon: string;
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  features: Feature[];
  cta: string;
  featured: boolean;
}
