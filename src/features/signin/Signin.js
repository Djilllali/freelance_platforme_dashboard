import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Spin,
  Alert,
} from "antd";
import { motion } from "framer-motion";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./signin.css";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchSignin, setSigninError, initSignin } from "./signinSlice";
import React from "react";
import { Redirect } from "react-router-dom";
import { fetchUserProfile } from "../dashboard/dashboardSlice";
import Background from "../../4428859.svg";
const { Title, Paragraph, Text } = Typography;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Signin = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    remember: false,
  });

  const dispatch = useDispatch();

  const fetchSigninError = useSelector(
    (state) => state.signin.fetchSigninError
  );
  const signInResult = useSelector((state) => state.signin.fetchSigninResult);
  console.log("signInResult", signInResult);
  const isFetchingSignin = useSelector(
    (state) => state.signin.isFetchingSignin
  );
  const redirectToDashboard = useSelector(
    (state) => state.signin.redirectToDashboard
  );

  React.useEffect(() => {
    dispatch(initSignin());
  }, []);

  // if (redirectToDashboard) {
  //   dispatch(fetchUserProfile());
  // }

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (fetchSigninError !== null) dispatch(setSigninError(null));

    if (e.keyCode === 13) dispatch(fetchSignin(state));
  };

  const handleSigninClick = (e) => {
    dispatch(fetchSignin(state));
  };
  if (signInResult?.userType === "assistantDz")
    return <Redirect to="/dashboard/tickets/pending" />;
  if (signInResult?.userType === "assistantFr")
    return <Redirect to="/dashboard/tickets" />;
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={12} style={{ padding: "0px 128px 128px 128px" }}>
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: [-10.55, -10.3], x: [-10, 10, -10, 0] }}
          transition={{ duration: 1, repeat: 0, type: "spring" }}
        >
          <div
            style={{
              marginLeft: "20%",
              marginRight: "20%",
              marginTop: "30%",
              minHeight: "50vh",
              Display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              width={150}
              style={{
                alignSelf: "center",
                marginLeft: "30%",
                marginBottom: "20%",
              }}
              className="center"
            ></img>
            <h3 style={{ marginBottom: 32, marginLeft:30 }}>Connectez-vous!</h3>
            <Form name="normal_login" className="register-form">
              <Form.Item
                name="Email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  onKeyDown={handleKeyDown}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>
              {fetchSigninError ? (
                <Form.Item>
                  <Alert
                    type="error"
                    message="Incorrect Email Or Password"
                    banner
                  />
                </Form.Item>
              ) : null}

              <Form.Item>
                {isFetchingSignin ? (
                  <Spin indicator={antIcon}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{ width: "100%" }}
                    >
                      Log in
                    </Button>
                  </Spin>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ width: "100%" }}
                    onClick={handleSigninClick}
                  >
                    Login
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </motion.div>
      </Col>
      <Col
        xs={12}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "right center",
          backgroundSize: "50%",
          height: "100vh",
          backgroundColor: "#01488f",
          boxShadow: "-7px 1px 26px -2px rgba(0,0,0,0.78)",
        }}
      ></Col>
    </Row>
  );
};

export default Signin;
