import './authentication.css'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { URL } from "./url";

const formValidationSchema = yup.object({
  firstName: yup.string().required("Please enter your First Name"),
  lastName: yup.string().required("Please enter your Last Name"),
  email: yup.string().required("Please enter your Email"),
  password: yup
    .string()
    .min(8, "password must be longer")
    .required("please fill the Password"),
  confirmPassword: yup
    .string()
    .required("please fille the confirm password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

//signup
export default function SignUpForm() {
  const history = useHistory();

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newUser) => {
        verifyBtn(newUser);
      },
    });

  const verifyBtn = (newUser) => {
    console.log(newUser);

    axios
      .post(`${URL}/user/signup`, newUser)
      .then(() => {
        history.push("/signin");
        toast.success("Activation link has been send to your email");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="signUpBG">
      <form className="signupForm" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <TextField
          variant="standard"
          value={values.firstName}
          error={errors.firstName && touched.firstName}
          fullWidth
          id="firstName"
          color="warning"
          name="firstName"
          label="First Name"
          helperText={errors.firstName && touched.firstName && errors.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
        ></TextField>

        <TextField
          variant="standard"
          value={values.lastName}
          error={errors.lastName && touched.lastName}
          fullWidth
          id="lastName"
          color="warning"
          name="lastName"
          label="Last Name"
          helperText={errors.lastName && touched.lastName && errors.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
        ></TextField>

        <TextField
          variant="standard"
          value={values.email}
          error={errors.email && touched.email}
          fullWidth
          id="email"
          color="warning"
          name="email"
          label="Email"
          helperText={errors.email && touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
        ></TextField>

        <TextField
          variant="standard"
          value={values.password}
          error={errors.password && touched.password}
          fullWidth
          color="warning"
          id="password"
          name="password"
          label="Password"
          helperText={errors.password && touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
          type="password"
        ></TextField>
        <TextField
          variant="standard"
          value={values.confirmPassword}
          error={errors.confirmPassword && touched.confirmPassword}
          fullWidth
          color="warning"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          helperText={
            errors.confirmPassword &&
            touched.confirmPassword &&
            errors.confirmPassword
          }
          onChange={handleChange}
          onBlur={handleBlur}
          margin="dense"
          type="password"
        ></TextField>
        <div className="signBtn">
          <Button
            color="primary"
            variant="contained"
            style={{margin:'20px' }}
            type="submit"
          >
            Sign Up
          </Button>
          <p
            onClick={() => {
              history.push("/signin");
            }}
          >
            Already have an account?<span>Sign In</span>
          </p>
        </div>
      </form>
    </div>
  );
}
