'use client';
import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css';
import { useState } from 'react';
import { register } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';
import toast from 'react-hot-toast';
import { UserCredentials } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const initialValues: UserCredentials = {
  email: '',
  password: '',
};

function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: (credentials: UserCredentials) => register(credentials),
    onSuccess: () => {
      router.push('/profile');
    },
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.error ??
        error.message ??
        'An unexpected error occurred';
      setError(message);
      toast.error(message);
    },
  });

  const handleSubmit = async (values: UserCredentials) => {
    setError('');
    registerMutation(values);
  };

  return (
    <div className={css.mainContent}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <h1 className={css.formTitle}>Sign up</h1>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              className={css.input}
              disabled={isPending}
            />
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              type="password"
              name="password"
              className={css.input}
              disabled={isPending}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? 'Registering...' : 'Register'}
            </button>
          </div>
          {!!error && <p className={css.error}>{error}</p>}
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpPage;
