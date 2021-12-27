import "./authentication.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "./url";
import { useHistory } from "react-router-dom";

const formValidationSchema = yup.object({
  email: yup.string().required("fill email please"),
});

//forget password
export default function ForgetPassword() {
  const history = useHistory();
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (emailVerify) => {
        verifyBtn(emailVerify);
      },
    });

  const verifyBtn = (emailVerify) => {
    console.log(emailVerify);

    axios
      .post(`${URL}/user/forgot-password`, emailVerify)
      .then((res) => {
        console.log("data: ", res.data);
        toast.success(res.data);
        history.push("/signin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="forgetPassBG">
      <form className="forgetPassForm" onSubmit={handleSubmit}>
        <h2>Forget Password</h2>
        <TextField
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          id="email"
          name="email"
          label="Enter your email"
          variant="standard"
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
        />
        <Button
          style={{ margin: "30px" }}
          color="warning"
          variant="contained"
          className="button"
          type="submit"
        >
          Forget Password
        </Button>
      </form>
    </div>
  );
}
