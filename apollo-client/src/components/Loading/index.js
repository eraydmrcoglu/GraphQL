import { Spin, Alert } from "antd";

export default () => (
  <Spin tip="Loading...">
    <Alert message="Veriler Alınıyor" description="" type="info" />
  </Spin>
);
