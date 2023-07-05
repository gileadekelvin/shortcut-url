'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { generateURL } from './actions';

const Generator = () => {
  const { toast } = useToast();

  const [result, setResult] = useState<{
    error: string | null;
    success: string | null | undefined;
  }>({ error: null, success: null });

  return (
    <div className='flex w-full flex-col gap-6 space-x-4 py-8'>
      <form
        className='flex w-full flex-row gap-4'
        action={async (formData) => {
          const origin =
            typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
          const data = await generateURL(formData, origin);
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
          onChange={() => setResult({ error: null, success: null })}
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
            className='mb-4 flex w-fit flex-row gap-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400'
            role='alert'
          >
            <span className='self-center font-medium'>{result.success}</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='18'
              height='18'
              viewBox='0 0 24 24'
              className='cursor-pointer'
              onClick={() => {
                if (!result.success) {
                  return;
                }
                void navigator.clipboard.writeText(result.success);
                toast({
                  description: 'URL copied to clipboard!',
                });
              }}
            >
              <path
                fill='currentColor'
                d='M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z'
              />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Generator;
