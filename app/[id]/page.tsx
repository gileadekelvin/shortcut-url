import { redirect } from 'next/navigation';
import { kv } from '@vercel/kv';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fetchUrl = async (id: string) => {
  return kv.hget(id, 'originalUrl') as unknown as string | null;
};

export default async function Page({ params }: { params: { id: string } }) {
  const originalUrl = await fetchUrl(params.id);

  if (originalUrl) {
    redirect(originalUrl);
  }

  return (
    <section className='space-y-6 pb-8 pt-12 md:pb-12 md:pt-10 lg:py-36'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-16 text-center'>
        <h1 className='text-3xl font-extrabold text-[#ededed] sm:text-5xl md:text-6xl lg:text-7xl'>
          URL Not Found!
        </h1>
        <Link href='/'>
          <Button>Create a new one</Button>
        </Link>
      </div>
    </section>
  );
}
