import QUERY_KEYS from '@/const/queryKeys';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import NoteDetailsClient from './NoteDetails.client';
import { fetchServerNoteById } from '@/lib/api/serverApi';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: `${note.content.slice(0, 30)}...`,
    openGraph: {
      title: `Note: ${note.title}`,
      description: `${note.content.slice(0, 100)}...`,
      url: `https://09-auth-two-flame.vercel.app/notes/${id}`,
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
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NOTE, id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
