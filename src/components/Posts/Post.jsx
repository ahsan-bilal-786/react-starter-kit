import React from 'react';
import { Card, Image, Row, Col } from 'react-bootstrap';
import user from 'assets/img/user.png';
import {
  ProfileBadge,
  ProfileBadgeText,
  TimeStamp,
} from 'components/Posts/style';

const Post = ({ post, userName, profilePicture }) => {
  return (
    <Card className='mb-3'>
      {post.feed_type === 'register' ? <Card.Header>HURRAY!</Card.Header> : ''}
      <Card.Body>
        <Row className='m-0 '>
          <Col md='1' className='pl-0'>
            <ProfileBadge
              src={profilePicture ? profilePicture : user}
              className='rounded-circle'
            />
          </Col>
          <ProfileBadgeText className='pl-0'>
            <Row>{userName ? userName : 'User'}</Row>
            <TimeStamp>{new Date(post.created_at).toDateString()}</TimeStamp>
          </ProfileBadgeText>
        </Row>
        <Row className='m-0 mt-2'>
          <Card.Text>{post.content}</Card.Text>
          {post.feed_type === 'add_new_photo' ? (
            <Image
              src={post.image}
              className='img-responsive card-img-bottom'
            ></Image>
          ) : (
            ''
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Post;
