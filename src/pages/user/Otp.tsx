
import React, { useState, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/hooks';
import { verifyOtp } from '../../Slices/userSlice/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  email: string;
}

const OtpPage: React.FC = () => {

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));

  const initialValues = {
    otp: ''
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email;

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required('OTP is required')
      .length(4, 'OTP must be exactly 4 digits')
      .matches(/^[0-9]{4}$/, 'OTP must be exactly 4 digits')
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number, setFieldValue: (field: string, value: any) => void) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setFieldValue('otp', newOtp.join(''));

      if (index < 3 && e.target.nextElementSibling instanceof HTMLInputElement) {
        e.target.nextElementSibling.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number, setFieldValue: (field: string, value: any) => void) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      setFieldValue('otp', newOtp.join(''));

      // Focus previous input box
      if (index > 0 && (e.target as HTMLInputElement).previousElementSibling instanceof HTMLInputElement) {
        ((e.target as HTMLInputElement).previousElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    if (/^[0-9]{4}$/.test(text)) {
      setOtp(text.split(''));
      setFieldValue('otp', text);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('#otp-form input[type="text"]') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.addEventListener('focus', (e) => (e.target as HTMLInputElement).select());
    });
  }, []);

  const handleSubmit = async (otp: string) => {
    try {
      const response = await dispatch(verifyOtp({ email, otp })).unwrap();
      console.log(response);
      navigate('/login'); 
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: "url('https://pro-theme.com/html/teamhost/assets/img/heading8.jpg')" }}>
      {/* <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden"> */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="w-5/6 text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 4-digit verification code that was sent to your email.
                </p>
              </header>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values.otp)
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form id="otp-form">
                    <div className="flex items-center justify-center gap-7">
                      {otp.map((data, index) => (
                        <Field
                          key={index}
                          type="text"
                          name={`otp[${index}]`}
                          className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                          maxLength={1}
                          value={data}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index, setFieldValue)}
                          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index, setFieldValue)}
                          onPaste={(e: ClipboardEvent<HTMLInputElement>) => handlePaste(e, setFieldValue)}
                        />
                      ))}
                    </div>
                    <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-2" />
                    <div className="max-w-[260px] mx-auto mt-4">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                        disabled={isSubmitting}
                      >
                        Verify Account
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{' '}
                <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      {/* </main> */}
     </div>
  );
};

export default OtpPage;
