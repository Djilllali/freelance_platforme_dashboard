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
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { SearchOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  setFilters,
  setPage,
  AddnewTicket,
} from "./ticketArchivedSlice";
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
    dispatch(fetchTickets());
  }, []);

  const isFetchingTickets = useSelector(
    (state) => state.ticketsArchived?.isFetchingTickets
  );
  const fetchTicketsResult = useSelector(
    (state) => state.ticketsArchived.fetchTicketsResult
  );
  {
    console.log("fetchTicketsResult", fetchTicketsResult);
  }
  let searchInput = useRef(null);
  const toggleswitched = (e) => {
    setState({ ...state, switcher: e });
  };
  const toggleChecked = (e) => {
    setState({ ...state, checked: e.target.checked });
  };
  const { Option } = Select;

  const [addNew, setAddNew] = React.useState({
    subject: "",
    description: "",
    deadline: "",
    visible: false,
  });
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys}
          onChange={(e) => {
            setSelectedKeys([e.target.value] ? [e.target.value] : "");
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) => {
      if (state.searchedColumn === dataIndex)
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        );
      else return text;
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({ searchedColumn: dataIndex, searchText: selectedKeys[0] });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ ...state, searchText: "" });
  };

  const columns = [
    {
      title: "Intitulé",
      dataIndex: "subject",
      key: "subject",
      width: "25%",
      align: "center",
      ...getColumnSearchProps("subject"),
    },
    {
      title: "Date de création",
      dataIndex: "openAt",
      key: "openAt",
      width: "25%",
      align: "center",
      render: (text) => {
        return moment(text).format("DD/MM/yyyy");
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
    {
      title: "Etat",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "25%",
      render: (text) => {
        const b = "archivé";
        return <Tag color="grey">{b.toUpperCase()}</Tag>;
      },
    },
    {
      title: "plus",
      align: "center",
      width: "25%",

      render: (text) => {
        return text.status === "termine" ? (
          <div>
            <Button
              icon={<EditOutlined />}
              size="large"
              onClick={() =>
                history.push("/dashboard/tickets/termine/" + text._id)
              }
            >
              {" "}
              Afficher plus
            </Button>
          </div>
        ) : (
          "---"
        );
      },
    },
  ];
  function onChange(pagination, filters, sorter, extra, from_date, to_date) {
    if (!from_date) {
      dispatch(setFilters(filters));
      dispatch(setPage(1));
      dispatch(
        fetchTickets({
          ...filters,
          page: 1,
        })
      );
    } else {
      dispatch(setFilters(filters));
      dispatch(setPage(1));

      dispatch(
        fetchTickets({
          ...filters,
          page: 1,
        })
      );
    }
  }

  const handleaddNew = () => {
    let my_edit = addNew;

    delete my_edit.visible;

    dispatch(AddnewTicket({ ...my_edit }));
    setAddNew({ ...addNew, visible: false });
  };
  const getDateValue = (dateString) => {
    setAddNew({ ...addNew, deadline: dateString });
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
              <h1 style={{ fontSize: "35px" }}>
                {" "}
                La liste des tickets archivés
              </h1>
              <Switch
                style={{ margin: "auto", color: "red" }}
                onClick={toggleswitched}
                checkedChildren="Après"
                unCheckedChildren="Avant"
                defaultunChecked
              />
            </div>
            <Row style={{ background: "#fff" }}>
              <Table
                pagination={false}
                rowKey="_id"
                tableLayout="fixed"
                columns={columns}
                dataSource={fetchTicketsResult?.result}
                loading={isFetchingTickets}
                style={{ padding: 24, minHeight: "100%" }}
                // size="small"
                //scroll={{ x: '100vw' }}
              />
            </Row>
          </Contt>
          <Footer style={{ marginTop: 10, background: "#fff" }}>
            <Row justify="end">
              <Col>
                Nombre total de tickets: {fetchTicketsResult?.result.length}
              </Col>
              {console.log("lenth", fetchTicketsResult?.result.length)}
            </Row>
          </Footer>
        </Col>
      </Row>
    </div>
  );
};
export default Clients;
