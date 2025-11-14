'use client';
import { createNote } from '@/lib/api/clientApi';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import QUERY_KEYS from '../../const/queryKeys';
import { noteTags, type NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.string()
    .oneOf<NoteTag>(noteTags, 'Tag is invalid')
    .required('Tag is required'),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const hasDraft = !!draft.title || !!draft.content || draft.tag !== 'Todo';

  const { mutate: createNoteRequest, isPending: isCreatingNote } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success('Note created successfully');
      queryClient.removeQueries({
        queryKey: [QUERY_KEYS.NOTES],
        exact: false,
      });
      clearDraft();
      router.back();
    },
    onError: () => {
      toast.error('There was an error creating the note');
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    createNoteRequest(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={hasDraft ? draft : initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field
              type="text"
              id={`${fieldId}-title`}
              name="title"
              className={css.input}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                const { value } = e.target;
                if (value && value !== draft.title) {
                  setDraft({
                    ...values,
                    title: value,
                  });
                }
              }}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                const { value } = e.target;
                if (value && value !== draft.content) {
                  setDraft({
                    ...values,
                    content: value,
                  });
                }
              }}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const { value } = e.target;
                if (value !== draft.tag) {
                  setFieldValue('tag', value);
                  setDraft({
                    ...values,
                    tag: value as NoteTag,
                  });
                }
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={router.back}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isCreatingNote}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;
