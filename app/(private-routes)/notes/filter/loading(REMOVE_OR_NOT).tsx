'use client';
import Loader from '@/components/Loader/Loader';
import NotesClient from './[...slug]/Notes.client';

function NotesLoadingPage() {
  return (
    <>
      <Loader />
      <NotesClient />
    </>
  );
}

export default NotesLoadingPage;
