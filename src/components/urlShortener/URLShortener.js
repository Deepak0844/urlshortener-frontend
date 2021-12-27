import "./urlShortener.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Popover, Button, Typography } from "@mui/material";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import * as yup from "yup";
import { URL } from "../Authentication/url";

const formValidationSchema = yup.object({
  url: yup
    .string()
    .matches(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
      "Enter correct url!"
    )
    .required("Please Enter the Url"),
});

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        url: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (url) => {
        verifyBtn(url);
      },
    });

  const verifyBtn = (url) => {
    console.log(url);

    axios
      .post(`${URL}/url`, url)
      .then((res) => {
        toast.success("Short URL created successfully");
        setUrl(res.data.shortUrl);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="urlBG">
      <form onSubmit={handleSubmit}>
        <h1>Url Shortener</h1>
        <p>Simplify your links</p>
        <div className="urlInput">
          <Form.Group className="position-relative mb-3">
            <InputGroup size="lg">
              <FormControl
                id="url"
                name="url"
                value={values.url}
                isValid={touched.url && !errors.url}
                isInvalid={!!errors.url}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="basic-addon3"
              />
              <Button type="submit" variant="contained">
                SHORTEN
              </Button>

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.url}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {url ? (
            <div>
              <h4 style={{ marginTop: "50px"}}>Shorten Link</h4>
              <div className="copyInput">
                <input
                  variant="outlined"
                  value={url}
                  label="short url"
                  readOnly
                  style={{
                    width: "520px",
                    marginRight:"5px",
                    background: "transparent",
                    outline: "none",
                    border: "none",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                ></input>
                <CopyBtn url={url} />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
function CopyBtn({ url }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <CopyAllIcon
        fontSize="medium"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        color="inherit"
        variant="contained"
        style={{ padding: "0" }}
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
      ></CopyAllIcon>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Copy</Typography>
      </Popover>
    </div>
  );
}
