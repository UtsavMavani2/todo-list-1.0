import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import API from "../utils/axios";

const LoginInitialValues = {
  email: "",
  password: "",
};

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Login = () => {
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/auth/login",
  //       { email, password }
  //     );
  //     localStorage.setItem("token", data.token);
  //     toast.success("Login successful!");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error(error.response?.data?.msg || "Login failed");
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await API.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log("LLLL", response);

      localStorage.setItem("token", response.data.token);
      toast.success(response?.data?.data?.msg || "Login successfully");
      navigate("/dashboard");
    } catch (error) {
      // console.log("error.....", error);
      toast.error(error?.response?.data?.msg || "Login failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <form
        onSubmit={handleLogin}
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
            <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              type="password"
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
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Login
            </button>
            <div
              className="mx-auto text-center mt-2 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </div>
            {/* </form> */}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
