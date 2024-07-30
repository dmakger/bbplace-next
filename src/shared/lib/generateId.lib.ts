import { customAlphabet } from "nanoid";

// Генерация числовых ID длиной 10 символов
const nanoid = customAlphabet('1234567890', 10)

/**
 * @returns `id` в числовом формате 
 */
export const generateId = () => {
  return parseInt(nanoid(), 10);
}