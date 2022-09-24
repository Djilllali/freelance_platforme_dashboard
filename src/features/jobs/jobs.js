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
  notification,
  DatePicker,
  Tag,
  message,
  Skeleton,
  Alert,
  Upload,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllJobs,
  AddnewJob,
  setFilters,
  setPage,
  fetchUploadZipFile,
} from "./jobsSlice";
import { fetchAllDomains } from "../users/usersSlice";
import Highlighter from "react-highlight-words";
import Title from "antd/lib/skeleton/Title";
import { Switch } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Footer } from "antd/lib/layout/layout";
import moment from "moment";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Text from "antd/lib/typography/Text";
import { Select } from "antd";
const { TextArea } = Input;

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
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [state, setState] = useState({});
  const { useEffect } = React;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllJobs());
    dispatch(fetchAllDomains());
  }, []);

  const isFetchingTickets = useSelector(
    (state) => state.jobs?.isFetchingAllJobs
  );
  const fetchAllJobsResult = useSelector(
    (state) => state.jobs.fetchAllJobsResult
  );
  const fetchAllDomainsResult = useSelector(
    (state) => state.users.fetchAllDomainsResult
  );
  const fetchuploadresult = useSelector(
    (state) => state.jobs.fetchUploadZipFileResult
  );
  let searchInput = useRef(null);
  const toggleswitched = (e) => {
    setState({ ...state, switcher: e });
  };
  const toggleChecked = (e) => {
    setState({ ...state, checked: e.target.checked });
  };
  const { Option } = Select;

  const [addNew, setAddNew] = React.useState({
    title: "",
    description: "",
    deadline: "",
    estimated_time: "",
    initial_price: "",
    client_price: "",
    domain: "",
    visible: false,
    file: "",
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      align: "center",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: "25%",
      align: "center",
      render: (text) => {
        return text?.name;
      },
    },
    {
      title: "Assigned to",
      dataIndex: "assignedTo",
      key: "assignedTo",
      width: "25%",
      align: "center",
      render: (text) => {
        return text?.name || <Tag color={"lightGrey"}>not assigned</Tag>;
      },
    },
    {
      title: "Estimated time",
      dataIndex: "estimated_time",
      key: "estimated_time",
      width: "25%",
      align: "center",
      render: (text) => {
        return text + " Days";
      },
    },

    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain.name",
      width: "35%",
      align: "center",
      filters: [
        {
          text: "Business",
          value: "Business",
        },
        {
          text: "Ingenierie",
          value: "Ingenierie",
        },
        {
          text: "Medical",
          value: "Medical",
        },
        {
          text: "Informatique",
          value: "Informatique",
        },
      ],

      filterMultiple: false,
      onFilter: (value, record) => record.domain.name.indexOf(value) === 0,

      filterSearch: true,
      render: (text) => {
        const colors = {
          Business: "green",
          Ingenierie: "purple",
          Medical: "yellow",
          Informatique: "blue",
        };
        return text?.name;
      },
    },
    {
      title: "Initial price",
      dataIndex: "initial_price",
      key: "initial_price",
      width: "25%",
      align: "center",
      render: (text) => {
        return text + " DZD";
      },
    },
    {
      title: "Client price",
      dataIndex: "client_price",
      key: "client_price",
      width: "25%",
      align: "center",
      render: (text) => {
        return text + " DZD";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "25%",
      filters: [
        {
          text: "In progress",
          value: "inprogress",
        },
        {
          text: "virgin",
          value: "virgin",
        },
        {
          text: "Finished",
          value: "finished",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Paid",
          value: "paid",
        },
      ],

      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      filterSearch: true,
      render: (text) => {
        const colors = {
          inprogress: "red",
          virgin: "blue",
          finished: "yellow",
          approved: "orange",
          paid: "green",
        };
        return <Tag color={colors[text]}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      width: "25%",
      align: "center",
      render: (text) => {
        return moment(text).format("DD/MM/yyyy");
      },
    },
    // {
    //   title: "Deadline",
    //   dataIndex: "deadline",
    //   key: "deadline",
    //   width: "25%",
    //   align: "center",
    //   render: (text) => {
    //     return moment(text).format("DD/MM/yyyy");
    //   },
    {
      title: "plus",
      align: "center",
      width: "25%",

      render: (e) => {
        return (
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push("/dashboard/allJobs/" + e._id)}
            >
              Edit Job
            </Button>
          </div>
        );
      },
    },
  ];
  function onChange(pagination, filters, sorter, extra, from_date, to_date) {
    if (!from_date) {
      dispatch(setFilters(filters));
      dispatch(setPage(1));
      dispatch(
        fetchAllJobs({
          ...filters,
          page: 1,
        })
      );
    } else {
      dispatch(setFilters(filters));
      dispatch(setPage(1));

      dispatch(
        fetchAllJobs({
          ...filters,
          page: 1,
        })
      );
    }
  }

  const uploadProps = {
    onRemove: (file) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      setState({ ...state, fileList: newFileList });
    },
    beforeUpload: (file) => {
      // setState({
      //   ...state,
      //   fileList: [...state.fileList, file],
      // });
      dispatch(fetchUploadZipFile(file));
      return false;
    },
    fileList: state.fileList,
  };
  console.log("fetchuploadresult", fetchuploadresult);
  const handleaddNew = () => {
    console.log("addnew", addNew);
    if (
      !addNew.title === "" ||
      !addNew.description === "" ||
      !addNew.deadline === "" ||
      !addNew.estimated_time === "" ||
      !addNew.initial_price === "" ||
      !addNew.client_price === "" ||
      !addNew.domain
    ) {
      message.error("Merci de compléter tous les champs!");
    } else {
      let my_edit = addNew;

      delete my_edit.visible;

      dispatch(AddnewJob({ ...my_edit, file: fetchuploadresult }));
      setAddNew({ ...addNew, visible: false });
    }
  };
  const getDateValue = (dateString) => {
    let date = moment(dateString._d).format("DD/MM/yyyy");
    setAddNew({ ...addNew, deadline: date });
  };
  const checkNotifications = () => {
    fetchAllJobsResult?.allJobs?.map((element) =>
      notification.info({
        message: element?.name,
        description:
          'Le ticket " ' +
          element.subject +
          '"a été terminé, cliquez ici pour obtenir les détails du ticket',
        placement: "topRight",
        duration: 5,
        onClick: () => {
          history.push("/dashboard/tickets/termine/" + element._id);
        },
      })
    );
  };

  return (
    <div>
      <Row gutter={[25, 5]} style={{ padding: 10, marginTop: 0 }}>
        <Col span={24}>
          <Contt style={{ margin: "0 16px" }}>
            <div
              style={{
                background: "white",
                maxHeight: "100%",
                padding: 24,
                margin: "8px 0px",
              }}
            >
              <h1 style={{ fontSize: "35px" }}> All Jobs list</h1>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddNew({ ...addNew, visible: true })}
              >
                Create a new job
              </Button>
              <span className="tab">
                {" "}
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={checkNotifications}
                >
                  Vérifier les notifications{" "}
                </Button>
              </span>

              <Switch
                style={{ margin: "auto", color: "red" }}
                onClick={toggleswitched}
                checkedChildren="Après"
                unCheckedChildren="Avant"
                defaultunChecked
              />
            </div>

            {addNew?.visible && (
              <Modal
                title={"NEW JOB"}
                centered
                visible={addNew?.visible}
                onOk={handleaddNew}
                onCancel={() => setAddNew({ ...addNew, visible: false })}
                width={600}
                okText="Create a job"
                cancelText="Cancel"
              >
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Title
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
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
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Déscription:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <TextArea
                      rows={4}
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          description: e.target.value,
                        })
                      }
                      //value={addIdentity?.slug}
                      value={addNew.description}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={8} style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Deadline:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <DatePicker
                      style={{ marginTop: 8 }}
                      onChange={getDateValue}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Estimated time
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          estimated_time: e.target.value,
                        })
                      }
                      type="number"
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
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Initial price
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          initial_price: e.target.value,
                        })
                      }
                      type="number"
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
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Client price
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          client_price: e.target.value,
                        })
                      }
                      type="number"
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
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Domain:
                    </Text>
                  </Col>
                  <Col span={16}>
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
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Upload file:
                    </Text>
                  </Col>
                  <Col span={16}>
                    <Upload {...uploadProps}>
                      <div
                        className="file file--upload"
                        style={{
                          border: "1px ridge green",
                          borderRadius: "4px",
                          backgroundColor: "#93edb6",
                          padding: "20px",
                        }}
                      >
                        <label for="input-file">
                          <UploadOutlined />
                          <span className="tab"> Ratacher le fichier .zip</span>
                        </label>
                      </div>
                    </Upload>
                    {fetchuploadresult && (
                      <Alert
                        message="Votre fichier zip a été uploadé avec succès !"
                        type="success"
                        description={
                          "le nouveau nom du fichier est: " + fetchuploadresult
                        }
                        showIcon
                        closable
                      />
                    )}
                  </Col>
                </Row>
              </Modal>
            )}
            <Row style={{ background: "#fff" }}>
              {isFetchingTickets ? (
                <Skeleton active="true" />
              ) : (
                <Table
                  pagination={false}
                  rowKey="_id"
                  tableLayout="fixed"
                  columns={columns}
                  dataSource={fetchAllJobsResult?.allJobs}
                  loading={isFetchingTickets}
                  style={{ padding: 24, minHeight: "100%" }}
                  // size="small"
                  //scroll={{ x: '100vw' }}
                />
              )}
            </Row>
          </Contt>
          <Footer style={{ marginTop: 10, background: "#fff" }}>
            <Row justify="end">
              <Col>All jobs: {fetchAllJobsResult?.allJobs?.length}</Col>
            </Row>
          </Footer>
        </Col>
      </Row>
    </div>
  );
};
export default Clients;
