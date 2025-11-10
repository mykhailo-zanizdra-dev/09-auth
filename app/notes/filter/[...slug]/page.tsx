interface FilteredNotesProps {
  params: Promise<{ slug: string[] }>;
}

import NotesClient from '@/app/notes/filter/[...slug]/Notes.client';
import QUERY_KEYS from '@/const/queryKeys';
import { fetchNotes } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: FilteredNotesProps): Promise<Metadata> {
  const { slug: [filter] = [] } = (await params) || {};

  return {
    title: `${filter === 'all' ? 'All' : filter} Notes - NoteHub`,
    description: `Notes filtered by ${filter}`,
    openGraph: {
      title: `${filter === 'all' ? 'All' : filter} Notes - NoteHub`,
      description: `In this page you can see ${filter === 'all' ? 'all notes' : `notes filtered by ${filter}`}.`,
      url: `https://08-zustand-psi-seven.vercel.app/notes/filter/${filter}`,
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

async function FilteredNotes({ params }: FilteredNotesProps) {
  const { slug: [initialFilter] = [] } = (await params) || {};
  const queryClient = new QueryClient();
  const filter = initialFilter && initialFilter !== 'all' ? initialFilter : '';

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NOTES, '', 1, filter],
    queryFn: () => fetchNotes({ page: 1, search: '', tag: filter }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filter={filter} />
    </HydrationBoundary>
  );
}

export default FilteredNotes;
