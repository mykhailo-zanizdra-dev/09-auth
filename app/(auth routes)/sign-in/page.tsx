'use client';
import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';
import { login } from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import toast from 'react-hot-toast';

import { useEffect, useState } from 'react';
import { ApiError } from '@/lib/api/api';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface LoginData {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const initialValues: LoginData = {
  email: '',
  password: '',
};

function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState('');

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: user => {
      setUser(user);
      router.push('/profile');
    },
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.error ??
        error.message ??
        'An unexpected error occurred';
      toast.error(message);
      setError(message);
    },
  });

  const handleSubmit = async (values: LoginData) => {
    setError('');
    loginMutation(values);
  };

  return (
    <div className={css.mainContent}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <h1 className={css.formTitle}>Sign in</h1>

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
              {isPending ? 'Logging in...' : 'Log in'}
            </button>
          </div>
          {!!error && <p className={css.error}>{error}</p>}
        </Form>
      </Formik>
    </div>
  );
}

export default SignInPage;
