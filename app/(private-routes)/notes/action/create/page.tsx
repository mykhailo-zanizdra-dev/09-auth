import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Note creating...',
  description: 'Here you can create a new note to add to your collection.',
  openGraph: {
    title: 'Note creating...',
    description: 'Here you can create a new note to add to your collection.',
    url: 'https://08-zustand-psi-seven.vercel.app/notes/action/create',
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

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <Toaster />
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

export default CreateNote;
