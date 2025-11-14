import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Profile - NoteHub',
  description:
    'Your personal profile page on NoteHub. View and edit your account information here.',
  openGraph: {
    title: 'Profile - NoteHub',
    description:
      'Your personal profile page on NoteHub. View and edit your account information here.',
    url: `https://09-auth-two-flame.vercel.app/profile`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1530,
        height: 1024,
        alt: 'NoteHub Image',
      },
    ],
    type: 'profile',
  },
};

async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
