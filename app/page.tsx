import Link from 'next/link';
import Generator from './Generator';

export const runtime = 'edge';

export default function Home() {
  return (
    <section className='space-y-6 pb-8 pt-12 md:pb-12 md:pt-10 lg:py-36'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
        <Link
          href='https://twitter.com/gileadekelvin'
          className='rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium'
          target='_blank'
        >
          Follow along on Twitter
        </Link>
        <h1 className='text-3xl font-extrabold text-[#ededed] sm:text-5xl md:text-6xl lg:text-7xl'>
          Shortcut URL
        </h1>
        <Generator />
      </div>
    </section>
  );
}
