'use client';
import Image from 'next/image';
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateMe } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import { ApiError } from '@/lib/api/api';
import css from './EditProfilePage.module.css';
import Spinner from '@/components/Spinner/Spinner';
import Loader from '@/components/Loader/Loader';

interface EditProfileFormValues {
  username: string;
}

const EditProfileSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be 30 characters or less')
    .required('Username is required'),
});

function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: updatedUser => {
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      router.push('/profile');
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.error ??
          error.message ??
          'Unable to update profile'
      );
    },
  });

  if (!user) {
    return (
      <main className={css.mainContent}>
        <Loader />
      </main>
    );
  }

  const initialValues: EditProfileFormValues = {
    username: user.username ?? '',
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    updateProfile({ username: values.username.trim() });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={EditProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <Field
                id="username"
                name="username"
                type="text"
                className={css.input}
              />
              <ErrorMessage
                name="username"
                component="span"
                className={css.error}
              />
            </div>

            <p>Email: {user.email}</p>

            <div className={css.actions}>
              {isPending ? (
                <Spinner size="small" className={css.spinner} />
              ) : (
                <button
                  type="submit"
                  className={css.saveButton}
                  disabled={isPending}
                >
                  Save
                </button>
              )}
              <button
                type="button"
                className={css.cancelButton}
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
}

export default EditProfilePage;
