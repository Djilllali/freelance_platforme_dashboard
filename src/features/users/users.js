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
  Pagination,
  Skeleton,
  Divider,
} from "antd";
import { InputRef } from "antd";
import Modal from "antd/lib/modal/Modal";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  fetchAllDomains,
  fetchAllPacks,
  CreateUser,
  setFilters,
  setPage,
  UpdateUser,
  VerifyUser,
} from "./usersSlice";
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
  const [state, setState] = useState({});
  const { useEffect } = React;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllDomains());
    dispatch(fetchAllPacks());
  }, []);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const isFetchingTickets = useSelector(
    (state) => state.users?.isFetchingAllUsers
  );
  const fetchAllUsersResult = useSelector(
    (state) => state.users.fetchAllUsersResult
  );

  const nbreOfDocs = useSelector((state) => state.users.nbreOfDocs);
  const selectedPage = useSelector((state) => state.users.page);
  const fetchAllDomainsResult = useSelector(
    (state) => state.users.fetchAllDomainsResult
  );
  const fetchAllPacksResult = useSelector(
    (state) => state.users.fetchAllPacksResult
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
    name: "",
    email: "",
    password: "",
    phone: "",
    domain: "",
    pack: "",
    update: false,
    _id: "",
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      align: "center",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "40%",
      align: "left",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "25%",
      align: "center",
      ...getColumnSearchProps("phone"),
    },
    // {
    //   title: "Date de création",
    //   dataIndex: "openAt",
    //   key: "openAt",
    //   width: "25%",
    //   align: "center",
    //   render: (text) => {
    //     return moment(text).format("DD/MM/yyyy");
    //   },
    // },

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
      onFilter: (value, record) => record.domain?.name?.indexOf(value) === 0,

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
      title: "Pack",
      dataIndex: "pack",
      key: "pack.name",
      width: "25%",
      align: "center",
      filters: [
        {
          text: "Relax",
          value: "relax",
        },
        {
          text: "Pro",
          value: "pro",
        },
        {
          text: "Promax",
          value: "promax",
        },
        {
          text: "Freelancer",
          value: "freelancer",
        },
      ],

      filterMultiple: false,
      onFilter: (value, record) => record.pack?.name.indexOf(value) === 0,

      filterSearch: true,
      render: (text) => {
        const colors = {
          relax: "green",
          pro: "purple",
          promax: "yellow",
          freelancer: "blue",
        };
        return <Tag color={colors[text?.name]}>{text?.name}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "verified",
      key: "verified",
      align: "center",
      width: "25%",
      filters: [
        {
          text: "verified",
          value: true,
        },
        {
          text: "unverified",
          value: false,
        },
      ],

      filterMultiple: false,
      onFilter: (value, record) => record.verified === value,
      filterSearch: true,
      render: (verified) => {
        const colors = {
          true: "green",
          false: "red",
        };
        return verified ? (
          <Tag color={colors[verified]}>VERIFIED</Tag>
        ) : (
          <Tag color={colors[verified]}>NOT VERIFIED</Tag>
        );
      },
    },
    {
      title: "plus",
      align: "center",
      width: "45%",

      render: (e) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setAddNew({
                  ...addNew,
                  _id: e._id,
                  name: e.name,
                  email: e.email,
                  phone: e.phone,
                  domain: e?.domain?._id,
                  pack: e?.pack?._id,
                  visible: true,
                  update: true,
                });
              }}
              style={{ marginRight: 10 }}
            >
              Edit user
            </Button>

            <Button
              type="primary"
              onClick={() => dispatch(VerifyUser({ _id: e._id }))}
            >
              Verify user
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
        fetchAllUsers({
          ...filters,
          page: 1,
        })
      );
    } else {
      dispatch(setFilters(filters));
      dispatch(setPage(1));

      dispatch(
        fetchAllUsers({
          ...filters,
          page: 1,
        })
      );
    }
  }

  // const uploadProps = {
  //   onRemove: (file) => {
  //     const index = state.fileList.indexOf(file);
  //     const newFileList = state.fileList.slice();
  //     newFileList.splice(index, 1);
  //     setState({ ...state, fileList: newFileList });
  //   },
  //   beforeUpload: (file) => {
  //     // setState({
  //     //   ...state,
  //     //   fileList: [...state.fileList, file],
  //     // });
  //     console.log("============  uploaaaaaad");
  //     dispatch(
  //       fetchUploadCategoryImage({ categoryImage: editCategory._id }, file)
  //     );
  //     return false;
  //   },
  //   fileList: state.fileList,
  // };
  const handleaddNew = () => {
    if (!addNew.update) {
      if (
        addNew.name === "" ||
        addNew.email === "" ||
        addNew.password === "" ||
        addNew.phone === "" ||
        addNew.domain === "" ||
        addNew.pack === ""
      ) {
        message.error("Merci de compléter tous les champs!");
      } else {
        let my_edit = addNew;

        delete my_edit.visible;
        delete my_edit.update;
        delete my_edit._id;

        dispatch(CreateUser({ ...my_edit }));
      }
    } else {
      let my_edit = addNew;
      delete my_edit.visible;
      delete my_edit.update;
      dispatch(UpdateUser({ ...my_edit }));
    }
    setAddNew({ ...addNew, visible: false, update: false });
  };
  const getDateValue = (dateString) => {
    setAddNew({ ...addNew, deadline: dateString });
  };
  const checkNotifications = () => {
    fetchAllUsersResult?.data?.map((element) =>
      notification.info({
        message: element.name,
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
              <h1 style={{ fontSize: "35px" }}> All users list</h1>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() =>
                  setAddNew({ ...addNew, visible: true, update: false })
                }
              >
                Create a user
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
                title={addNew.update ? "UPDATE" : "CREATE"}
                centered
                visible={addNew?.visible}
                onOk={handleaddNew}
                onCancel={() => setAddNew({ ...addNew, visible: false })}
                width={600}
                okText={addNew.update ? "Update user" : "create a user"}
                cancelText="cancel creation"
              >
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Name:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          name: e.target.value,
                        })
                      }
                      value={addNew.name}
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
                      email:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      value={addNew.email}
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
                      Password:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          password: e.target.value,
                        })
                      }
                      type="password"
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
                      Phone:
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          phone: e.target.value,
                        })
                      }
                      type="tel"
                      value={addNew.phone}
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
                      Pack:
                    </Text>
                  </Col>
                  <Col span={16}>
                    <Select
                      labelInValue
                      onSelect={(e) =>
                        setAddNew({
                          ...addNew,
                          pack: e.value,
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
                      placeholder="select a pack"
                    >
                      {fetchAllPacksResult?.data?.map((d) => (
                        <Select.Option key={d._id}>{d.name}</Select.Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Modal>
            )}
            <Row style={{ background: "#fff" }}>
              {console.log("is fetchhing", isFetchingTickets)}
              {isFetchingTickets ? (
                <Skeleton active="true" />
              ) : (
                <Table
                  pagination={false}
                  rowKey="_id"
                  tableLayout="fixed"
                  columns={columns}
                  dataSource={fetchAllUsersResult?.data}
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
              <Col>
                {" "}
                <span className="tab"> Total number of users:</span>{" "}
              </Col>
              <Col>
                {
                  <Spin spinning={isFetchingTickets}>
                    <Pagination
                      size="small"
                      total={nbreOfDocs}
                      pageSize={15}
                      showSizeChanger={false}
                      showTotal={(total) => (
                        <Tag style={{ fontSize: "30px" }} color="geekblue">
                          {total}
                        </Tag>
                      )}
                      current={selectedPage}
                      onChange={(page, pageSize) => {
                        dispatch(setPage(page));
                        dispatch(
                          fetchAllUsers({
                            page,
                          })
                        );
                      }}
                    />
                  </Spin>
                }
              </Col>
            </Row>
          </Footer>
        </Col>
      </Row>
    </div>
  );
};
export default Clients;
