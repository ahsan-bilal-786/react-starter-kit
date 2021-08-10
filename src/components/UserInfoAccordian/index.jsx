import React from 'react';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import ContextAwareToggle from 'elements/ContextAwareToggle';

const UserInfoAccordian = ({ userInfo }) => {
  return (
    <Accordion defaultActiveKey='0'>
      <Card>
        <ContextAwareToggle eventKey='0'>Bio</ContextAwareToggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            {userInfo.bio ? userInfo.bio : 'Something Cool Here....'}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <ContextAwareToggle eventKey='1'>
          Personal Information
        </ContextAwareToggle>
        <Accordion.Collapse eventKey='1'>
          <Card.Body>
            <Row>
              <Col md='5'>Birthday:</Col>
              <Col md='6'>{userInfo.birthday}</Col>
            </Row>
            <Row>
              <Col md='5'>Home Town:</Col>
              <Col md='6'>
                {userInfo.hometown ? userInfo.hometown : 'Hometown Not set'}
              </Col>
            </Row>
            <Row>
              <Col md='5'>Gender:</Col>
              <Col md='6'>{userInfo.gender}</Col>
            </Row>
            {userInfo.email ? (
              <Row>
                <Col md='5'>Email:</Col>
                <Col md='6'>{userInfo.email}</Col>
              </Row>
            ) : (
              ''
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <ContextAwareToggle eventKey='2'>Education & Work</ContextAwareToggle>
        <Accordion.Collapse eventKey='2'>
          <Card.Body>
            <Row>
              <Col md='5'>Work:</Col>
              <Col md='6'>
                {userInfo.work ? userInfo.work : 'Not working yet'}
              </Col>
            </Row>
            <Row>
              <Col md='5'>Education:</Col>
              <Col md='6'>
                {userInfo.education ? userInfo.education : 'No Education Info'}
              </Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <ContextAwareToggle eventKey='3'>Relationships</ContextAwareToggle>
        <Accordion.Collapse eventKey='3'>
          <Card.Body>
            <Row>
              <Col md='5'>Relationship Status:</Col>
              <Col md='6'>{userInfo.relationship_status}</Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default UserInfoAccordian;
