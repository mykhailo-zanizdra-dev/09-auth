'use client';
import Link from 'next/link';
import css from './AuthNavigation.module.css';
import useAuthStore from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      toast.success('Logged out successfully');
      router.replace('/sign-in');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}

export default AuthNavigation;
