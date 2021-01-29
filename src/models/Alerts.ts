import { Document, Schema, Model, model } from 'mongoose';

declare global {
  type AlertPing = 'self' | 'everyone';

  interface IAlert {
    ticker: string;
    price: number;
    currentPrice: number;
    author: string;
    ping: AlertPing;
  }

  interface IAlertModel extends IAlert, Document {}
}

export const AlertSchema: Schema = new Schema({
  ticker: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ping: {
    type: String,
    enum: ['everyone', 'self'],
    default: 'everyone',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

const Alert: Model<IAlertModel> = model<IAlertModel>('Alert', AlertSchema);

export default Alert;
