import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { object, string } from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  
  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });

  async function forgetPassword(values) {
    const loadingId = toast.loading("Sending your verification code...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.statusMsg === "success") {
        toast.dismiss(loadingId);
        toast.success("Code sent to your email successfully");
        navigate("/Auth-Password/verifyCode");
      }
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error("Error in sending code");
      setError(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
    <Helmet>
      <title>Forgot Password | Shop Cart</title>
      <meta name="description" content="Reset your Shop Cart password here." />
    </Helmet>

    <div className="min-h-screen bg-gray-50 flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full  sm:max-w-md mb-10">
            <h2 className=" text-center text-2xl font-extrabold text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address below and we'll send you a verification code to reset your password.
            </p>
      </div>
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}
           
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    formik.errors.email && formik.touched.email 
                      ? 'border-red-300' 
                      : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div>
              
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Send Verification Code
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      
    </div>
    </>
  );
}