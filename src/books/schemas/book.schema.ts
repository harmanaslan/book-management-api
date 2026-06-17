import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  year: number;

  @Prop({
    required: true,
    trim: true,
  })
  genre: string;

  @Prop({
    required: true,
    trim: true,
  })
  createdBy: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
