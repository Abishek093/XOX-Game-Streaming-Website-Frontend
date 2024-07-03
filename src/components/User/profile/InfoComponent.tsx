// infoComponent.tsx

import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser, updateUser } from '../../../Slices/userSlice/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  userId: string;
  userName: string;
  displayName: string;
  bio: string;
}

const InfoComponent: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    userId: user?.user?.id || '', 
    username: user?.user?.username || '',
    displayName: user?.user?.displayName || '',
    bio: user?.user?.bio || '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    displayName: Yup.string().required('Display Name is required'),
    bio: Yup.string(),
  });

  const onSubmit = (values: FormValues) => {
    dispatch(updateUser(values));
  };

  return (
    <div className="h-full bg-white p-20 flex justify-center items-center">
      <div className="space-y-4 w-full max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 p-1.5">
                  Username
                  <ErrorMessage name="username" component="span" className="text-red-500 inline ml-1" />
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <Field
                    type="text"
                    name="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 p-1.5">
                  Display Name
                  <ErrorMessage name="displayName" component="span" className="text-red-500 inline ml-1" />
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <Field
                    type="text"
                    name="displayName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 p-1.5">
                  Bio
                  <ErrorMessage name="bio" component="span" className="text-red-500 inline ml-1" />
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <Field
                    as="textarea"
                    name="bio"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 bg-gray-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 w-full"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InfoComponent;
