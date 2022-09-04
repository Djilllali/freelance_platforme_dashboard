import React, { useRef, useState } from "react";
import {
  Button,
  Row,
  Col,
  Input,
  Space,
  Breadcrumb,
  Radio,
  Table,
  Spin,
  Pagination,
  DatePicker,
  Tag,
  Upload,
  Result,
  message,
  Alert,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglejob, updateJob } from "./jobSlice";
import Highlighter from "react-highlight-words";
import Title from "antd/lib/skeleton/Title";
import { Switch } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Footer } from "antd/lib/layout/layout";
import moment from "moment";
import { Descriptions } from "antd";
import { downloadFileZipUrl } from "../../Constants";
import { Typography } from "antd";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Text from "antd/lib/typography/Text";
import { Select } from "antd";
import { fetchAllDomains } from "../users/usersSlice";
const { Link } = Typography;

const Contt = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};
const { RangePicker } = DatePicker;
const Clients = () => {
  const { _id } = useParams();
  let history = useHistory();
  const [state, setState] = useState({});
  const { useEffect } = React;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglejob({ _id }));
    dispatch(fetchAllDomains());
  }, []);

  const isFetchingSingleJob = useSelector(
    (state) => state.job?.setFetchingSingleJobs
  );
  const fetchSingleJobResult = useSelector(
    (state) => state.job.fetchSinglejobResult
  );
  const fetchAllDomainsResult = useSelector(
    (state) => state.users.fetchAllDomainsResult
  );
  const [addNew, setAddNew] = React.useState({
    title: "",
    description: "",
    estimated_time: "",
    domain: "",
    initial_price: "",
    client_price: "",
    status: "",
    deadline: "",
    visible: false,
    edit: false,
  });
  const [notes, setNotes] = React.useState({
    notes: "",
    disabled: false,
  });
  const handleUpdateDownloaded = () => {
    window.open(
      downloadFileZipUrl + fetchSingleJobResult?.oneJob?.submission.file
    );
  };
  const getDateValue = (dateString) => {
    let date = moment(dateString._d).format("DD/MM/yyyy");
    setAddNew({ ...addNew, deadline: date });
  };
  const colors = {
    inprogress: "red",
    virgin: "blue",
    finished: "yellow",
    approved: "orange",
    paid: "green",
  };
  const handleaddNew = () => {
    let my_edit = addNew;
    delete my_edit.visible;
    delete my_edit.edit;

    dispatch(updateJob({ ...my_edit, _id: _id }));

    setAddNew({ ...addNew, visible: false, edit: false });
  };
  return (
    <div>
      {console.log("fetchSingleJobResult", fetchSingleJobResult)}
      <Row gutter={[25, 5]} style={{ padding: 10, marginTop: 0 }}>
        <Button type="link">All jobs /</Button>
        <Button type="text">Job</Button>
        <Col offset={2} span={16}>
          <Descriptions
            layout="horizontal"
            bordered
            style={{ marginTop: "10%" }}
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Title">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.title
              ) : (
                <Input
                  onChange={(e) =>
                    setAddNew({
                      ...addNew,
                      title: e.target.value,
                    })
                  }
                  value={addNew.title}
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.description
              ) : (
                <Input
                  onChange={(e) =>
                    setAddNew({
                      ...addNew,
                      description: e.target.value,
                    })
                  }
                  value={addNew.description}
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Creator">
              {fetchSingleJobResult?.oneJob?.creator?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned to">
              {fetchSingleJobResult?.oneJob?.assignedTo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Estimated time">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.estimated_time
              ) : (
                <Input
                  onChange={(e) =>
                    setAddNew({
                      ...addNew,
                      estimated_time: e.target.value,
                    })
                  }
                  value={addNew.estimated_time}
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Domain">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.domain?.name
              ) : (
                <Select
                  labelInValue
                  onSelect={(e) =>
                    setAddNew({
                      ...addNew,
                      domain: e.value,
                    })
                  }
                  showSearch
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                  placeholder="select a domain"
                >
                  {fetchAllDomainsResult?.data?.map((d) => (
                    <Select.Option key={d._id}>{d.name}</Select.Option>
                  ))}
                </Select>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Initial price">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.initial_price
              ) : (
                <Input
                  onChange={(e) =>
                    setAddNew({
                      ...addNew,
                      initial_price: e.target.value,
                    })
                  }
                  value={addNew.initial_price}
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Client price">
              {!addNew.edit ? (
                fetchSingleJobResult?.oneJob?.client_price
              ) : (
                <Input
                  onChange={(e) =>
                    setAddNew({
                      ...addNew,
                      client_price: e.target.value,
                    })
                  }
                  value={addNew.client_price}
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {!addNew.edit ? (
                <Tag color={colors[fetchSingleJobResult?.oneJob?.status]}>
                  {fetchSingleJobResult?.oneJob?.status.toUpperCase()}
                </Tag>
              ) : (
                <Select
                  labelInValue
                  onSelect={(e) =>
                    setAddNew({
                      ...addNew,
                      status: e.value,
                    })
                  }
                  showSearch
                  style={{
                    width: "369px",
                    height: 30,
                    marginBottom: 8,
                    marginTop: 8,
                    fontSize: "15px",
                    display: "block",
                  }}
                  placeholder="select a status"
                >
                  <Select.Option key="virgin">virgin</Select.Option>

                  <Select.Option key="inprogress">in progress</Select.Option>

                  <Select.Option key="finished">finished</Select.Option>

                  <Select.Option key="approved">approved</Select.Option>

                  <Select.Option key="paid">paid</Select.Option>
                </Select>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Deadline">
              {!addNew.edit ? (
                <Tag color="blue">
                  {moment(fetchSingleJobResult?.oneJob?.deadline).format(
                    "DD/MM/yyyy"
                  )}
                </Tag>
              ) : (
                <DatePicker style={{ marginTop: 8 }} onChange={getDateValue} />
              )}
            </Descriptions.Item>
            {fetchSingleJobResult?.oneJob?.status === "finished" && (
              <Descriptions.Item label="Remarques">
                {/* {fetchSingleJobResult?.result[0]?.notes} */}
              </Descriptions.Item>
            )}
            {fetchSingleJobResult?.oneJob?.status === "finished" && (
              <Descriptions.Item label="Les données collectées">
                <Button
                  size="large"
                  type="link"
                  onClick={handleUpdateDownloaded}
                >
                  Cliquez ici pour télécharger le fichier.Zip
                </Button>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col offset={10}>
          {!addNew.edit && (
            <Button
              size="large"
              type="primary"
              onClick={() =>
                setAddNew({
                  ...addNew,
                  edit: true,
                  title: fetchSingleJobResult?.oneJob?.title,
                  description: fetchSingleJobResult?.oneJob?.description,
                  estimated_time: fetchSingleJobResult?.oneJob?.estimated_time,
                  domain: fetchSingleJobResult?.oneJob?.domain?._id,
                  initial_price: fetchSingleJobResult?.oneJob?.initial_price,
                  client_price: fetchSingleJobResult?.oneJob?.client_price,
                  status: fetchSingleJobResult?.oneJob?.status,
                  deadline: fetchSingleJobResult?.oneJob?.deadline,
                })
              }
            >
              Edit job
            </Button>
          )}
        </Col>

        <Col offset={1}>
          {addNew.edit && (
            <Button size="large" type="primary" onClick={handleaddNew}>
              Update
            </Button>
          )}
        </Col>

        <Col offset={1}>
          {addNew.edit && (
            <Button
              size="large"
              type="primary"
              onClick={() =>
                setAddNew({
                  ...addNew,
                  edit: false,
                })
              }
            >
              Cancel
            </Button>
          )}
        </Col>
      </Row>
      <br></br> <br></br>
    </div>
  );
};
export default Clients;
