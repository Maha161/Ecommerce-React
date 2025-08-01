import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import toast from "react-hot-toast";
import { UserContext } from "../../context/User.context";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const [inCorrectEmailorPasswordError, setInCorrectEmailorPasswordError] = useState(null);
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({  
    email: string()
      .required("Email is required")
      .email("Email is not valid"),
    password: string()
      .required("Password is required")
      .matches(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
  });

  async function sendDataToLogin(values) {
    const loadingID = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.dismiss(loadingID);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("User Logged in successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(loadingID);
      toast.error(error.response?.data?.message || "Login failed");

      setInCorrectEmailorPasswordError(error.response?.data?.message || "Invalid email or password");
    }
  }

  const formik = useFormik({
    initialValues: {   
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
    <Helmet>
      <title>Login | Shop Cart</title>
      <meta name="description" content="Access your Shop Cart account." />
    </Helmet>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
            create a new account
          </Link>
        </p>
      </div>
          {inCorrectEmailorPasswordError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm text-red-700">{inCorrectEmailorPasswordError}</p>
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
                  className={`mt-1 block w-full px-3 py-2 border ${
                    formik.errors.email && formik.touched.email 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={`mt-1 block w-full px-3 py-2 border ${
                    formik.errors.password && formik.touched.password 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/Auth-Password/forgetPassword"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}