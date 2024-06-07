import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { signupUser } from '../../store/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { parse } from 'date-fns';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();


  const initialValues = {
    userName: '',
    displayName: '', 
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: dayjs().format('YYYY-MM-DD'),
  };

  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("Username required").matches(/^\w+$/, 'Enter a valid username.'),
    displayName: Yup.string().trim().required("Display Name required").matches(/^\w+$/, 'Enter a valid display name.'),
    email: Yup.string().email('Invalid email address').required('Email Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password'),
    birthDate: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "yyyy-MM-dd", new Date());
        return result;
      })
      .typeError("Please enter a valid date")
      .required("Birth Date is required")
      .min(new Date(1969, 10, 13), "Date is too early")  // Note that months are 0-indexed
  });

  const handleSubmit = (values: typeof initialValues, { setSubmitting, setStatus }: any) => {
    setStatus(null);
    const { userName, displayName, email, password, birthDate } = values;
    const userDetails = { userName, displayName, email, password, birthDate }
    dispatch(signupUser(userDetails))
      .unwrap()
      .then(() => {
        setStatus({ success: true });
      })
      .catch((error: any) => {
        setStatus({ success: false, error: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, setFieldValue, values }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                  Username
                </label>
                <Field
                  type="text"
                  id="userName"
                  name="userName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="userName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
                  Display Name
                </label>
                <Field
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="displayName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
                  Birth Date
                </label>
                <Field
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={values.birthDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('birthDate', e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={isSubmitting || status === 'loading'}
              >
                {isSubmitting || status === 'loading' ? 'Signing Up...' : 'Sign Up'}
              </button>
              {status && status.success && (
                <div className="text-green-500 text-sm mt-4">Signup successful!</div>
              )}
              {status && !status.success && (
                <div className="text-red-500 text-sm mt-4">{status.error}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
