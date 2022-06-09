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
import {
  fetchSingleTicket,
  fetchUploadZipFile,
  updateTicketFIle,
} from "./singleTicketSlice";
import Highlighter from "react-highlight-words";
import Title from "antd/lib/skeleton/Title";
import { Switch } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Footer } from "antd/lib/layout/layout";
import moment from "moment";
import { Descriptions } from "antd";
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
  const { _id } = useParams();
  let history = useHistory();
  const [state, setState] = useState({});
  const { useEffect } = React;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleTicket({ _id }));
  }, []);

  const isFetchingSingleTicket = useSelector(
    (state) => state.singleTicket?.isFetchingSingleTicket
  );
  const fetchSingleTicketResult = useSelector(
    (state) => state.singleTicket.fetchSingleTicketResult
  );
  const fetchuploadresult = useSelector(
    (state) => state.singleTicket.fetchUploadZipFileResult
  );

  const [addNew, setAddNew] = React.useState({
    subject: "",
    description: "",
    deadline: "",
    visible: false,
  });
  const [notes, setNotes] = React.useState({
    notes: "",
    disabled: false,
  });

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
  const handleEnd = () => {
    if (notes.notes && fetchuploadresult) {
      setNotes({ ...notes, disabled: true });
      console.log("notes.disabled", notes.disabled);
      dispatch(
        updateTicketFIle({
          _id,
          notes: notes.notes,
          path: fetchuploadresult,
        })
      );
    } else message.error("Veuillez remplir tous les champs ");
  };
  return (
    <div>
      <Row gutter={[25, 5]} style={{ padding: 10, marginTop: 0 }}>
        <Button type="link" onClick={history.goBack}>
          En cours /
        </Button>
        <Button type="text">Ticket</Button>
        <Col span={10}>
          <Descriptions
            layout="horizontal"
            bordered
            style={{ marginTop: "10%" }}
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Intitulé">
              {fetchSingleTicketResult?.result[0]?.subject}
            </Descriptions.Item>
            <Descriptions.Item label="Déscription">
              {fetchSingleTicketResult?.result[0]?.description}
            </Descriptions.Item>
            <Descriptions.Item label="Date de création">
              <Tag color="blue">
                {moment(fetchSingleTicketResult?.result[0]?.openAt).format(
                  "DD/MM/yyyy"
                )}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Deadline">
              <Tag color="red">
                {moment(fetchSingleTicketResult?.result[0]?.deadline).format(
                  "DD/MM/yyyy"
                )}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        {!notes.disabled && (
          <Col span={8} style={{ marginTop: "3%" }}>
            <Text type="secondary" style={{ fontSize: "20px" }}>
              Ajouter des remarques:
            </Text>{" "}
            <TextArea
              rows={4}
              onChange={(e) =>
                setNotes({
                  ...notes,
                  notes: e.target.value,
                })
              }
              //value={addIdentity?.slug}
              value={notes.notes}
            />
            <span className="tab" style={{ marginTop: "8%" }}>
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
            </span>
          </Col>
        )}
      </Row>

      <Row style={{ marginTop: "10%" }}>
        <Col span={6}></Col>

        <Col span={6}>
          {" "}
          <Button
            type="primary"
            size="large"
            onClick={handleEnd}
            disabled={notes.disabled}
          >
            Valider le fichier et terminer le ticket
          </Button>
        </Col>

        <Col span={6}>
          {" "}
          <Button
            size="large"
            onClick={() => history.push("/dashboard/tickets/termine")}
            type="link"
            disabled={!notes.disabled}
          >
            Consulter vos tickets terminés
          </Button>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
};
export default Clients;
