'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateURL } from './actions';

const Generator = () => {
  const [result, setResult] = useState<{
    error: string | null;
    success: string | null | undefined;
  }>({ error: null, success: null });

  return (
    <div className='flex w-full flex-col gap-6 space-x-4 py-8'>
      <form
        className='flex w-full flex-row gap-4'
        action={async (formData) => {
          const data = await generateURL(formData);
          if (data.error) {
            setResult({ error: data.error, success: null });
          } else {
            setResult({ error: null, success: data.url });
          }
        }}
      >
        <Input
          name='originalUrl'
          id='originalUrl'
          type='text'
          placeholder='Enter link here'
          className='border-slate-500'
          autoFocus
          required
        />
        <Button className='w-44' type='submit'>
          Generate url
        </Button>
      </form>
      {result.error ? (
        <div className='flex w-full flex-col items-center justify-center'>
          <div
            className='mb-4 w-fit rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            <span className='font-medium'>{result.error}</span>
          </div>
        </div>
      ) : null}
      {result.success ? (
        <div className='flex w-full flex-col items-center justify-center'>
          <div
            className='mb-4 w-fit rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400'
            role='alert'
          >
            <span className='font-medium'>{result.success}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Generator;
