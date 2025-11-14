import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import QUERY_KEYS from '@/const/queryKeys';
import { fetchServerNoteById } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type NotePreviewPageProps = {
  params: Promise<{ id: string }>;
};

async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NOTE, id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}

export default NotePreviewPage;
