import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Layout(props) {
  return (
    <Row className='m-0'>
      <Col className='m-3' sm={1}>Hello world</Col>
      <Col>
        <Container>{props.children}</Container>
      </Col>
    </Row>
  );
}

export default Layout;
