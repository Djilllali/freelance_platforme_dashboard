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
  Cascader,
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
  fetchAllDomains,
  AddnewDomain,
  deleteDomain,
} from "../users/usersSlice";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDomains());
  }, []);

  const fetchAllDomainsResult = useSelector(
    (state) => state.users.fetchAllDomainsResult
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
    domain: "",
    visible: false,
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
              console.log("selectedKeys[0]", selectedKeys[0], dataIndex);
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
      title: "plus",
      align: "center",
      width: "45%",

      render: (e) => {
        return (
          <div>
            <Button
              type="danger"
              onClick={() => dispatch(deleteDomain({ _id: e._id }))}
            >
              delete
            </Button>
          </div>
        );
      },
    },
  ];
  const handleaddNew = () => {
    console.log("addnew", addNew);
    let my_edit = addNew;

    delete my_edit.visible;

    dispatch(AddnewDomain({ ...my_edit }));
    setAddNew({ ...addNew, visible: false });
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
              <h1 style={{ fontSize: "35px" }}> All domains list</h1>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setAddNew({ ...addNew, visible: true })}
              >
                Create a new domain
              </Button>
              <span className="tab">
                {" "}
                {/* <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={checkNotifications}
                >
                  Vérifier les notifications{" "}
                </Button> */}
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
                title={"NEW DOMAIN"}
                centered
                visible={addNew?.visible}
                onOk={handleaddNew}
                onCancel={() => setAddNew({ ...addNew, visible: false })}
                width={600}
                okText="Add a new domain"
                cancelText="Cancel"
              >
                <Row>
                  <Col span={8}>
                    <Text type="secondary" style={{ fontSize: "20px" }}>
                      Name
                    </Text>
                  </Col>
                  <Col span={16}>
                    {" "}
                    <Input
                      onChange={(e) =>
                        setAddNew({
                          ...addNew,
                          domain: e.target.value,
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
              </Modal>
            )}
            <Row style={{ background: "#fff" }}>
              <Table
                pagination={false}
                rowKey="_id"
                tableLayout="fixed"
                columns={columns}
                dataSource={fetchAllDomainsResult?.data}
                style={{ padding: 24, minHeight: "100%" }}
                // size="small"
                //scroll={{ x: '100vw' }}
              />
            </Row>
          </Contt>
          <Footer style={{ marginTop: 10, background: "#fff" }}>
            <Row justify="end">
              <Col>All Domains: {fetchAllDomainsResult?.data.length}</Col>
            </Row>
          </Footer>
        </Col>
      </Row>
    </div>
  );
};
export default Clients;
