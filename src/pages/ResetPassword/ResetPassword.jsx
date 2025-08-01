import { useFormik } from "formik";
import  { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { tokenContext } from "../../context/Tokencontext";
import { object, string } from "yup";
import { Helmet } from "react-helmet-async";

export default function ResetPassword() {
  let { updateToken } = useContext(tokenContext);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    newPassword: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  async function resetPassword(values) {
    const loadingId = toast.loading("Resetting your password...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.token) {
        toast.dismiss(loadingId);
        toast.success("Password reset successfully 🎉");
        updateToken(data.token);
        navigate("/login");
      }
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error(error.response?.data?.message || "Failed to reset password");
      setError(error.response?.data?.message || "An error occurred");
    }
  }

  return (
    <>
    <Helmet>
      <title>Reset Password | Shop Cart</title>
      <meta name="description" content="Set a new password for your Shop Cart account." />
    </Helmet>
    <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="container sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please enter your email and a new password.
          </p>
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`mt-1 block w-full px-3 py-2 border ${
                  formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={`mt-1 block w-full px-3 py-2 border ${
                formik.errors.newPassword && formik.touched.newPassword
                  ? "border-red-500"
                  : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.newPassword}</p>
              )}
            </div> 
            <button
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
}
