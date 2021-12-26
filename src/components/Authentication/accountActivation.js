import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {Result} from 'antd';
import 'antd/dist/antd.css';
import { URL } from "./url";

export function Activate() {
  const { token } = useParams();
  useEffect(() => {
    axios
      .get(`${URL}/user/account-verification/${token}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <div>
       <Result
        status="success"
        title="Password Updated!"
        subTitle="Your password has been changed successfully Use your new password to log in"
      />
    </div>
  );
}
