import React from 'react';
import { Card } from 'react-bootstrap';
import CreatePostPrompt from 'components/CreatePostPrompt';
import Post from 'components/Posts/Post';

const Posts = ({ posts, userName, userProfilePicture, allowPost }) => {
  return (
    <>
      {posts && (
        <>
          {allowPost ? <CreatePostPrompt /> : ''}
          {posts.length !== 0 ? (
            posts.map((post, _) => {
              return (
                <Post
                  post={post}
                  key={`${post.content}-${post.created_at}`}
                  userName={userName}
                  profilePicture={userProfilePicture}
                />
              );
            })
          ) : (
            <Card>
              <Card.Body>No posts yet!</Card.Body>
            </Card>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
