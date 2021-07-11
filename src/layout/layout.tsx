import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <Row className="m-0 h-100">
      <Col className="p-0 " sm={2}>
        <Sidebar />
      </Col>
      <Col sm={10} className="d-flex justify-content-center align-items-center">
        {props.children}
      </Col>
    </Row>
  );
}

export default Layout;
