
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongoDBURL = mongodb+srv://vasu:vasu@book-store-mern.ijsy4ja.mongodb.net/books-collection?retryWrites=true&w=majority&appName=Book-store-MERN;
