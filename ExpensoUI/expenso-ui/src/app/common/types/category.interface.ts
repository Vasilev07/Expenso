import { Moment } from "moment";

export interface ICategory {
    id: number;
    isExpense: boolean;
    name: string;
    createdAt: Moment;
}