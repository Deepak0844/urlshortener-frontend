import './authentication.css'
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { URL } from "./url";

const formValidationSchema = yup.object({
  email: yup.string().required("please fill the Email"),
  password: yup
    .string()
    .min(8, "password must be longer")
    .required("please fill the Password"),
});

//signin
export default function SigninForm() {
  const history = useHistory();

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (existingUser) => {
        verifyBtn(existingUser);
      },
    });

  const verifyBtn = (existingUser) => {
    axios
      .post(`${URL}/user/signin`, existingUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        history.push("/");
      })
      .catch((err) => {
        // toast.error(err.response.data.message);
        console.log(err);
        // console.log(err.response.data.message);
      });
  };
  return (
    <div className="signinBG">
      <form className="signinForm" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <TextField
          variant="standard"
          value={values.email}
          error={errors.email && touched.email}
          fullWidth
          color="secondary"
          name="email"
          label="Email"
          helperText={errors.email && touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
        ></TextField>

        <TextField
          variant="standard"
          value={values.password}
          error={errors.password && touched.password}
          fullWidth
          type="password"
          color="secondary"
          name="password"
          label="Password"
          helperText={errors.password && touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          margin="normal"
        ></TextField>

        <div className="signBtn">
          <Button
            color="success"
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "10px" }}
            type="submit"
          >
            Log In
          </Button>
          <p
            onClick={() => {
              history.push("/signup");
            }}
          >
            Don't have an account?<span>Sign Up</span>
          </p>
          <p
            onClick={() => {
              history.push("/forget-password");
            }}
          >
            Forget Password?
          </p>
        </div>
      </form>
    </div>
  );
}
