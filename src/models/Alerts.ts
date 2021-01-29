import Discord from 'discord.js';
import { DiscordAPIError } from 'discord.js';
import { Document, Schema, Model, model } from 'mongoose';

declare global {
  interface IAlert {
    ticker: string;
    price: number;
    author: string;
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
  author: {
    type: String,
    required: true,
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
