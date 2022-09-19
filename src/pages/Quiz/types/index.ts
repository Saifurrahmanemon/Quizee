export interface IOrder {
	email?: string | null | undefined;
	quizId?: string | undefined;
	quizName?: string | undefined;
	retakes?: number;
	price?: number | undefined;
	status?: string | undefined;
	transactionId?: string | undefined;
}
