'use server';
import z from 'zod';
import { customAlphabet, urlAlphabet } from 'nanoid';
import { kv } from '@vercel/kv';

const validUrl = z.string().url({ message: 'Invalid url! Please provide a valid one!' });

export async function generateURL(data: FormData, origin: string) {
  const validation = validUrl.safeParse(data.get('originalUrl'));
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const nanoid = customAlphabet(urlAlphabet, 9);
  const shortcutUrl = nanoid();

  try {
    await kv.hset(shortcutUrl, { originalUrl: data.get('originalUrl') });
    return { url: `${origin}/${shortcutUrl}` };
  } catch (error) {
    console.log(error);
    return { error: 'Unable to generate URL!' };
  }
}
