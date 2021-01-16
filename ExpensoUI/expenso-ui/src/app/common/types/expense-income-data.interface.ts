import { Moment } from "moment";
import { ICategory } from "./category.interface";

export interface IExpenseIncomeData {
    id: number;
    createdAt: Moment;
    categoryId: number;
    category: ICategory;
    amount: number;
}