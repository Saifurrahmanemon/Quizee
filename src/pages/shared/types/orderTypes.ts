import { BaseEntity } from 'types';

export type IOrder = {
	email?: string | null;
	quizId?: string;
	quizName?: string;
	retakes?: number;
	lastScore?: string;
	paid?: boolean;
	price?: number;
	status?: string;
	transactionId?: string;
} & BaseEntity;
