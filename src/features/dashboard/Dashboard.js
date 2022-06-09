import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";

import {
  Layout,
  Menu,
  Spin,
  Avatar,
  Alert,
  Row,
  Col,
  Typography,
  Popover,
  Divider,
  Button,
  Image,
  Badge,
  Tag,
} from "antd";
import {
  UserOutlined,
  AlignLeftOutlined,
  LogoutOutlined,
  LoadingOutlined,
  SendOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { setPathname, fetchUserProfile } from "./dashboardSlice";
import { setredirectToDashboard } from "../signin/signinSlice";
import { Content } from "antd/lib/layout/layout";
import Tickets from "../tickets/ticket";
import PendingTickets from "../ticket-nouveau/ticketNouveau";
import EncoursTickets from "../ticket-encours/ticketEnCours";
import TermineTickets from "../ticket-termines/ticketTermine";
import SingleTicket from "../singleTicket/singleTicket";
import ValidateTicket from "../ticket-validation/ticketValidation";
import TicketsArchive from "../ticket-archived/ticketArchived";

const { Header, Footer, Sider } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;
let keys = {
  "/dashboard/tickets": "tickets",
  "/dashboard/tickets/pending": "pending",
  "/dashboard/tickets/encours": "encours",
  "/dashboard/tickets/termine": "termine",
  "/dashboard/tickets/archive": "archive",
};

let Dashboard = ({}) => {
  let history = useHistory();
  let [state, setState] = React.useState({
    collapsed: false,
    current: "",
  });

  const dispatch = useDispatch();

  const isFetchingProfile = useSelector(
    (state) => state.dashboard?.isFetchingProfile
  );
  const fetchProfileResult = useSelector(
    (state) => state.dashboard?.fetchProfileResult
  );
  const fetchProfileError = useSelector(
    (state) => state.dashboard?.fetchProfileError
  );
  {
    console.log("type", fetchProfileResult?.user.type);
  }
  const { collapsed } = state;
  const { useEffect } = React;
  const onCollapse = (collapsed) => {
    setState({ ...state, collapsed });
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(setPathname(history.location.pathname));
  }, [localStorage.token]);
  const handlePageChange = (e) => {
    setState({
      current: e.key,
    });
    switch (e.key) {
      case "tickets":
        history.push("/dashboard/tickets");
        break;
      case "pending":
        history.push("/dashboard/tickets/pending");
        break;
      case "encours":
        history.push("/dashboard/tickets/encours");
        break;
      case "termine":
        history.push("/dashboard/tickets/termine");
        break;
      case "archive":
        history.push("/dashboard/tickets/archive");
        break;
    }
  };
  const AvatarLoader = () => {
    return (
      <span>
        <Badge dot>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </span>
    );
  };
  const content = (
    <div>
      <div>
        <Row>
          <Col>
            {" "}
            <h5>Nom:</h5>
          </Col>
          <Col>
            <span className="tab">
              {" "}
              <h5>{fetchProfileResult?.user.name}</h5>
            </span>{" "}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            {" "}
            <h5>Email:</h5>{" "}
          </Col>
          <Col>
            <span className="tab">
              {" "}
              <h5>{fetchProfileResult?.user.email}</h5>
            </span>{" "}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col offset={6}>
            {" "}
            {fetchProfileResult?.user.type === "assistantFr" ? (
              <Tag color="#FFD700" style={{ fontSize: "20px" }}>Assistant FR </Tag>
            ) : (
              <Tag color="#C0C0C0" style={{ fontSize: "20px" }}>Assistant DZ </Tag>
            )}
          </Col>
        </Row>
      </div>

      <Divider />
      <Button
        block
        size="medium"
        shape="round"
        //type="link"
        onClick={() => {
          localStorage.removeItem("token");
          history.push("/signin");
        }}
        style={{ backgroundColor: "#FF0000", color: "white" }}
      >
        <LogoutOutlined style={{ fontSize: "20px" }} />
        Logout
      </Button>
    </div>
  );
  const AvatarProfile = ({}) => {
    return (
      <Popover content={content} trigger="click">
        <span>
          <Badge dot>
            <Avatar size={40} icon={<UserOutlined />} />
          </Badge>
        </span>
      </Popover>
    );
  };
  if (!localStorage.token) return <Redirect to="/signin" />;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          style={{
            margin: "16px",
          }}
        >
          {!collapsed ? (
            <Col
              style={{
                backgroundColor: "#333",
                height: "34px",
                borderRadius: "7px",
              }}
            ></Col>
          ) : null}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["clients"]}
          mode="inline"
          onSelect={handlePageChange}
          style={{ overflow: "auto" }}
          selectedKeys={[state.current]}
        >
          {fetchProfileResult?.user.type === "assistantFr" && (
            <Menu.Item key="tickets" icon={<AlignLeftOutlined />}>
              Tous les tickets
            </Menu.Item>
          )}
          {fetchProfileResult?.user.type === "assistantFr" && (
            <Menu.Item key="archive" icon={<FileProtectOutlined />}>
              Les tickets archivés
            </Menu.Item>
          )}

          {fetchProfileResult?.user.type === "assistantDz" && (
            <Menu.Item key="pending" icon={<SendOutlined />}>
              Les tickets disponibles
            </Menu.Item>
          )}
          {fetchProfileResult?.user.type === "assistantDz" && (
            <Menu.Item key="encours" icon={<LoadingOutlined />}>
              Les tickets en cours
            </Menu.Item>
          )}
          {fetchProfileResult?.user.type === "assistantDz" && (
            <Menu.Item key="termine" icon={<SafetyCertificateOutlined />}>
              Les tickets terminés
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Row>
            <Col xs={18}>
              <Text></Text>
            </Col>
            <Col xs={6}>
              <Row justify="center">
                <Col span={5}>
                  <Badge
                    count={0}
                    size={60}
                    offset={[0, 10]}
                    style={{ marginLeft: 10 }}
                  >
                    {isFetchingProfile ? <Spin /> : <AvatarProfile />}
                  </Badge>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={24} md={12} lg={6}>
              <Spin spinning={isFetchingProfile}></Spin>
            </Col>
          </Row>
        </Header>
        <Content>
          <Switch>
            <Route exact path="/dashboard/tickets" component={Tickets} />
            <Route
              exact
              path="/dashboard/tickets/encours/:_id"
              component={SingleTicket}
            />
            <Route
              exact
              path="/dashboard/tickets/archive"
              component={TicketsArchive}
            />
            <Route
              exact
              path="/dashboard/tickets/termine/:_id"
              component={ValidateTicket}
            />
            <Route
              exact
              path="/dashboard/tickets/pending"
              component={PendingTickets}
            />
            <Route
              exact
              path="/dashboard/tickets/encours"
              component={EncoursTickets}
            />
            <Route
              exact
              path="/dashboard/tickets/termine"
              component={TermineTickets}
            />
            <Route exact path="/dashboard/" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
