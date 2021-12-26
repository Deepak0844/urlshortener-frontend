import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { URL } from "./url";

const formValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "needed longer password")
    .required("please enter your new password"),
  confirmPassword: yup
    .string()
    .required("please fille the confirm password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
});

//reset password
export function PasswordVerify() {
  const history = useHistory();
  const { token } = useParams();
  useEffect(() => {
    axios
      .get(`${URL}/user/forgot-password/verify`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        // console.log(res.data)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [token]);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        confirmPassword: "",
        password: "",
        token: token,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newPassword) => {
        verifyBtn(newPassword);
      },
    });

  const verifyBtn = (newPassword) => {
    console.log(newPassword);

    axios
      .post(`${URL}/user/change-password`, newPassword)
      .then((res) => {
        toast.success(res.data.message);
        history.push("/signin");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="passVerifyBG">
      <form className="resetPassword" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <TextField
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          id="password"
          name="password"
          label="Password"
          variant="standard"
          error={errors.password && touched.password}
          helperText={errors.password && touched.password && errors.password}
          margin="dense"
          type="password"
        />

        <TextField
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          variant="standard"
          error={errors.confirmPassword && touched.confirmPassword}
          helperText={
            errors.confirmPassword &&
            touched.confirmPassword &&
            errors.confirmPassword
          }
          margin="dense"
          type="password"
        />
        <Button
          variant="contained"
          color="warning"
          style={{ marginTop: "20px" }}
          className="button"
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
