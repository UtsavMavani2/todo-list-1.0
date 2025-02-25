import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../utils/axios";

const LoginInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const LogInSchema = Yup.object().shape({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .min(8, "Confirm password must be at least 8 characters")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigator = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await API.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success(response?.data?.data?.msg || "Registration successfully");
      navigator("/");
    } catch (error) {
      console.log("error.....", error);
      toast.error(error?.response?.data?.msg || "Registration failed");
    }
    setSubmitting(false);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-lg shadow-lg"
      > */}
      <Formik
        initialValues={LoginInitialValues}
        validationSchema={LogInSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form className="space-y-2 max-w-2xl w-full" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold">Register</h2>
            <input
              type="text"
              placeholder="Name"
              className={`border p-2 w-full ${
                errors.name && touched.name ? "border-red-600" : ""
              }`}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <div className="text-red-500 text-sm">
              {errors.name && touched.name && errors.name}
            </div>
            <input
              type="text"
              placeholder="Email Address"
              className={`border p-2 w-full ${
                errors.email && touched.email ? "border-red-600" : ""
              }`}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="text-red-500 text-sm">
              {errors.email && touched.email && errors.email}
            </div>
            <input
              type="text"
              placeholder="Password"
              className={`border p-2 w-full ${
                errors.password && touched.password ? "border-red-600" : ""
              }`}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="text-red-500 text-sm">
              {errors.password && touched.password && errors.password}
            </div>
            <input
              type="password"
              placeholder="confirmPassword"
              className={`border p-2 w-full ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-600"
                  : ""
              }`}
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            <div className="text-red-500 text-sm">
              {errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded w-full"
            >
              Register
            </button>
            <div
              className="mx-auto text-center mt-2 cursor-pointer"
              onClick={() => navigator("/")}
            >
              Login
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
