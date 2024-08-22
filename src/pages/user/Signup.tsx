// import React, { useCallback, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { signupUser, selectStatus, selectError, googleAuth } from '../../Slices/userSlice/userSlice';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import dayjs from 'dayjs';
// import { auth, googleProvider } from "../../config/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { parse, isDate, subYears } from 'date-fns';
// import { toast } from 'sonner';
// import SearchModal from '../../components/User/Signup/SearchModal';
// import Cookies from 'js-cookie';

// const Signup: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tempUser, setTempUser] = useState<any>(null);
//   const [otp, setOtp] = useState(false)
//   const initialValues = {
//     username: '',
//     displayName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     birthDate: dayjs().format('YYYY-MM-DD'),
//   };

//   const validationSchema = Yup.object({
//     username: Yup.string().trim().required("Username required").matches(/^\w+$/, 'Enter a valid username.'),
//     displayName: Yup.string().trim().required("Display Name required").matches(/^\w+$/, 'Enter a valid display name.'),
//     email: Yup.string().email('Invalid email address').required('Email Required'),
//     password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
//       .required('Please confirm your password'),
//     birthDate: Yup.date()
//       .transform(function (value, originalValue) {
//         if (this.isType(value)) {
//           return value;
//         }
//         const result = parse(originalValue, "yyyy-MM-dd", new Date());
//         return result;
//       })
//       .typeError("Please enter a valid date")
//       .required("Birth Date is required")
//       .min(new Date(1969, 10, 13), "Date is too early")
//       .max(subYears(new Date(), 13), "You must be at least 13 years old")
//   });

//   const handleSubmit = (values: typeof initialValues, { setSubmitting, setStatus }: any) => {
//     setStatus(null);
//     const { username, displayName, email, password, birthDate } = values;
//     const userDetails = { username, displayName, email, password, birthDate };
//     dispatch(signupUser(userDetails))
//       .unwrap()
//       .then(() => {
//         setStatus({ success: true });
//         toast.success("Verify otp to continue!")
//       })
//       .catch((error: any) => {
//         console.log("error in signup", error);
//         setStatus({ success: false, error });
//         toast.error(error)
//       })
//       .finally(() => {
//         setSubmitting(false);
//       });
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const decodedUser = result.user;
//       if (decodedUser.uid && decodedUser.displayName && decodedUser.email && decodedUser.photoURL) {
//         const user = {
//           userId: decodedUser.uid,
//           username: decodedUser.displayName,
//           email: decodedUser.email,
//           profileImage: decodedUser.photoURL,
//           displayName: '',
//           password: '',
//           birthDate: ''
//         };
//         const response: any = await dispatch(googleAuth(user)).unwrap();
//         console.log("Response", response);
//         if (response.isUsernameTaken) {
//           setTempUser(user);
//           setIsModalOpen(true);
//         } else {
//           const token = Cookies.get('UserAccessToken');
//           if (token) {
//             toast.success("Signup successful")
//             navigate('/');
//           }
//         }
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//       console.error("Error signing up with Google: ", error);
//     }
//   };

//   const handleUsernameSubmit = async (username: string) => {
//     try {
//       if (tempUser) {
//         const updatedUser = { ...tempUser, username: username };
//         console.log("updatedUser", updatedUser);

//         const user = {
//           userId: updatedUser.userId,
//           username: updatedUser.username,
//           email: updatedUser.email,
//           profileImage: updatedUser.profileImage
//         };

//         const response: any = await dispatch(googleAuth(user)).unwrap();
//         console.log("Response", response);

//         if (response.isUsernameTaken) {
//           toast.error('Username is already taken. Please choose another one.');
//         } else {
//           const token = Cookies.get('UserAccessToken');
//           if (token) {
//             toast.success("Signup successful")
//             navigate('/');
//           } else {
//             toast.error('Error during signup. Please try again.');
//           }
//         }
//       } else {
//         toast.error('Temporary user data not found.');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Error updating username. Please try again.');
//       console.error("Error updating username: ", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: "url('https://pro-theme.com/html/teamhost/assets/img/heading8.jpg')" }}>
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, status }) => (
//             <Form>
//               <div className="mb-4">
//                 <label htmlFor="username" className="block text-sm font-semibold mb-1">Username</label>
//                 <Field
//                   type="text"
//                   id="username"
//                   name="username"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   placeholder="Enter your username"
//                 />
//                 <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="displayName" className="block text-sm font-semibold mb-1">Display Name</label>
//                 <Field
//                   type="text"
//                   id="displayName"
//                   name="displayName"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   placeholder="Enter your display name"
//                 />
//                 <ErrorMessage name="displayName" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
//                 <Field
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   placeholder="Enter your email"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
//                 <Field
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   placeholder="Enter your password"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirm Password</label>
//                 <Field
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   placeholder="Confirm your password"
//                 />
//                 <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="birthDate" className="block text-sm font-semibold mb-1">Birth Date</label>
//                 <Field
//                   type="date"
//                   id="birthDate"
//                   name="birthDate"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 />
//                 <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm mt-1" />
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <button
//                   type="button"
//                   onClick={handleGoogleSignup}
//                   className="w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
//                 >
//                   Sign up with Google
//                 </button>
//               </div>
//               <div className="mb-4 flex justify-between">
//                 <button
//                   type="submit"
//                   className={`w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Signing up...' : 'Sign Up'}
//                 </button>
//               </div>
//               {status && status.success && <div className="text-green-500">Signup successful! Please check your email to verify your account.</div>}
//               {status && status.error && <div className="text-red-500">Signup failed. {status.error.message}</div>}
//             </Form>
//           )}
//         </Formik>
//         {

//         }

//         <SearchModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleUsernameSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  signupUser,
  selectStatus,
  selectError,
  googleAuth,
} from "../../Slices/userSlice/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { parse, isDate, subYears } from "date-fns";
import { toast } from "sonner";
import SearchModal from "../../components/User/Signup/SearchModal";
import Cookies from "js-cookie";
import { useLoading } from '../../context/LoadingContext';


const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState<any>(null);
  const [otp, setOtp] = useState(false);
  const initialValues = {
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: dayjs().format("YYYY-MM-DD"),
  };
  const [email, setEmail] = useState("");
  const { setLoading } = useLoading(); 


  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .required("Username required")
      .matches(/^\w+$/, "Enter a valid username."),
    displayName: Yup.string()
      .trim()
      .required("Display Name required")
      .matches(/^\w+$/, "Enter a valid display name."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
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
      .min(new Date(1969, 10, 13), "Date is too early")
      .max(subYears(new Date(), 13), "You must be at least 13 years old"),
  });

  const handleSubmit = (
    values: typeof initialValues,
    
    { setSubmitting, setStatus }: any
  ) => {
    setLoading(true)
    setStatus(null);
    const { username, displayName, email, password, birthDate } = values;
    const userDetails = { username, displayName, email, password, birthDate };
    setEmail(email)
    dispatch(signupUser(userDetails))
      .unwrap()
      .then(() => {
        setStatus({ success: true });
        setOtp(true); 
        toast.success("Verify otp to continue!");
      })
      .catch((error: any) => {
        console.log("error in signup", error);
        setStatus({ success: false, error });
        toast.error(error);
      })
      .finally(() => {
        setLoading(false)
        setSubmitting(false);
      });
  };

  const handleGoogleSignup = async () => {
    // Google signup logic remains the same
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const decodedUser = result.user;
      if (
        decodedUser.uid &&
        decodedUser.displayName &&
        decodedUser.email &&
        decodedUser.photoURL
      ) {
        const user = {
          userId: decodedUser.uid,
          username: decodedUser.displayName,
          email: decodedUser.email,
          profileImage: decodedUser.photoURL,
          displayName: "",
          password: "",
          birthDate: "",
        };
        const response: any = await dispatch(googleAuth(user)).unwrap();
        console.log("Response", response);
        if (response.isUsernameTaken) {
          setTempUser(user);
          setIsModalOpen(true);
        } else {
          const token = Cookies.get("UserAccessToken");
          if (token) {
            toast.success("Signup successful");
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error signing up with Google: ", error);
    }
  };

  const handleUsernameSubmit = async (username: string) => {
    // Username submission logic remains the same
    try {
      if (tempUser) {
        const updatedUser = { ...tempUser, username: username };
        console.log("updatedUser", updatedUser);

        const user = {
          userId: updatedUser.userId,
          username: updatedUser.username,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage,
        };

        const response: any = await dispatch(googleAuth(user)).unwrap();
        console.log("Response", response);

        if (response.isUsernameTaken) {
          toast.error("Username is already taken. Please choose another one.");
        } else {
          const token = Cookies.get("UserAccessToken");
          if (token) {
            toast.success("Signup successful");
            navigate("/");
          } else {
            toast.error("Error during signup. Please try again.");
          }
        }
      } else {
        toast.error("Temporary user data not found.");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Error updating username. Please try again."
      );
      console.error("Error updating username: ", error);
    }
  };

  useEffect(() => {
    if (otp) {
      console.log('Navigating to OTP with email:', email);
      navigate("/otp", { state: { email, isSignup: true, isPasswordReset: false} }); // Redirect to OTP page
    }
  }, [otp, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage:
          "url('https://pro-theme.com/html/teamhost/assets/img/heading8.jpg')",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold mb-1"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="displayName"
                  className="block text-sm font-semibold mb-1"
                >
                  Display Name
                </label>
                <Field
                  type="text"
                  id="displayName"
                  name="displayName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your display name"
                />
                <ErrorMessage
                  name="displayName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-1"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-1"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-semibold mb-1"
                >
                  Birth Date
                </label>
                <Field
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="YYYY-MM-DD"
                />
                <ErrorMessage
                  name="birthDate"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Sign Up with Google
                </button>
              </div>
              {status && status.error && (
                <div className="text-red-500 text-sm mt-2">{status.error}</div>
              )}
            </Form>
          )}
        </Formik>
        {isModalOpen && (
          // <SearchModal
          //   onClose={() => setIsModalOpen(false)}
          //   onSubmit={handleUsernameSubmit}
          //   tempUser={tempUser}
          // />
          <SearchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleUsernameSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
