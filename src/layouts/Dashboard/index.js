import React from 'react';
import { Container } from 'react-bootstrap';
import Header from 'components/Header';

const Dashboard = (Content) => {
  return (props) => {
    return (
      <>
        <Header />
        <Container fluid className='p-0'>
          <Content {...props} />
        </Container>
      </>
    );
  };
};

export default Dashboard;
