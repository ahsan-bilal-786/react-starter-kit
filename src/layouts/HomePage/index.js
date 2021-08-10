import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';
import Welcome from 'components/Welcome';

const HomePage = (Content) => {
  return (props) => {
    return (
      <>
        <Header history={props.history} />
        <Container>
          <Row>
            <Col md='8'>
              <Welcome />
            </Col>
            <Col md='4'>
              <Content {...props} />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
};

export default HomePage;
