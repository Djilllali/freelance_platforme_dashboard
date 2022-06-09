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
import { fetchSingleTicket } from "../singleTicket/singleTicketSlice";
import { updateDownloadedStatus } from "./ticketValidationSlice";
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
  const handleUpdateDownloaded = () => {
    dispatch(updateDownloadedStatus({ _id }));
    window.open(
      downloadFileZipUrl + fetchSingleTicketResult?.result[0]?.zipFile
    );
  };

  return (
    <div>
      <Row gutter={[25, 5]} style={{ padding: 10, marginTop: 0 }}>
        <Button type="link">terminés /</Button>
        <Button type="text">Ticket</Button>
        <Col offset={2} span={16}>
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
            <Descriptions.Item label="Terminé le">
              <Tag color="green">
                {moment(fetchSingleTicketResult?.result[0]?.endAt).format(
                  "DD/MM/yyyy"
                )}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Remarques">
              {fetchSingleTicketResult?.result[0]?.notes}
            </Descriptions.Item>
            <Descriptions.Item label="Les données collectées">
              <Button size="large" type="link" onClick={handleUpdateDownloaded}>
                Cliquez ici pour télécharger le fichier.Zip
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
};
export default Clients;
