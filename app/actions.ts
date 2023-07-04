'use server';
import z from 'zod';

export async function generateURL(data: FormData) {
  const validUrl = z.string().url({ message: 'Invalid url! Please provide a valid one!' });

  const validation = validUrl.safeParse(data.get('originalUrl'));

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const shortcutUrl = data.get('originalUrl') as string;
  return { url: shortcutUrl };
}
