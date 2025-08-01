import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { object, string } from "yup";
import toast from "react-hot-toast";

export default function VerifyResetCode() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = object({
    resetCode: string().required("Reset code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyCode,
  });

  async function verifyCode(values) {
    const loadingID = toast.loading("Verifying your code...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.status === "Success") {
        toast.dismiss(loadingID);
        toast.success("Your code is verified");
        navigate("/Auth-Password/resetPassword");
      } else {
        setError("Invalid reset code. Please try again.");
      }
    } catch (error) {
            toast.error(error.response?.data?.message || "Failed on verifying code");

      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="container sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
            Verify Reset Code
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Please enter the verification code sent to your email.
          </p>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="resetCode" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                className={`mt-1 block w-full px-3 py-2 border ${
                  formik.errors.resetCode && formik.touched.resetCode
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {formik.errors.resetCode && formik.touched.resetCode && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.resetCode}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none"
            >
              Verify Code
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Didn't receive a code?{" "}
            <Link to="/Auth-Password/forgetPassword" className="text-primary-600 hover:text-primary-500 font-medium">
              Resend code
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}