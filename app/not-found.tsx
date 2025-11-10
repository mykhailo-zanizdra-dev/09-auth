import NotFound from '@/components/NotFound/NotFound';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Page Not Found - NoteHub',
  description:
    'The page you are looking for does not exist. It might have been moved or deleted.',
  openGraph: {
    title: 'Page Not Found - NoteHub',
    description:
      'The page you are looking for does not exist. It might have been moved or deleted.',
    url: 'https://08-zustand-psi-seven.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1530,
        height: 1024,
        alt: 'NoteHub Image',
      },
    ],
    type: 'website',
  },
};

function NotFoundPage() {
  return <NotFound />;
}

export default NotFoundPage;
