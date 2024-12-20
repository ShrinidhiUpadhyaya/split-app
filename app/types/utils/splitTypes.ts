import {Avatar} from "@prisma/client";

export type SplitTypes = "Equal" | "Percentage" | "Exact";

export interface SplitPerson {
  id: string;
  name: string;
  avatar: Avatar;
  amount: string;
}
