import React, { useState, ChangeEvent, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash/debounce';

interface SearchModalProps {
  modalOpen: boolean;
  handleInputChange: (searchValue: string) => void;
  handleUsernameChange: (username: string) => void; // New prop to handle username change
}

const validationSchema = Yup.object({
  search: Yup.string().required('Search is required'),
});

const SearchModal: React.FC<SearchModalProps> = ({
  modalOpen,
  handleInputChange,
  handleUsernameChange, // Use the new prop
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputStatus, setInputStatus] = useState(''); 

  const debouncedHandleInputChange = debounce((value: string) => {
    handleInputChange(value);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedHandleInputChange(value);
  };

  useEffect(() => {
    handleUsernameChange(inputValue); 
  }, [inputValue, handleUsernameChange]);

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="relative w-full p-4">
              <div className="absolute inset-y-0 flex items-center pb-8 pl-3 pointer-events-none">
                <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <Formik
                initialValues={{ search: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <p>Choose a Username for Your Account!</p>
                    <Field
                      type="text"
                      id="simple-search"
                      name="search"
                      className={`bg-gray-50 border ${inputStatus === 'success' ? 'border-green-500' : 'border-red-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="Search Username..."
                      required
                      onChange={handleChange}
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Searching...' : 'Search'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
