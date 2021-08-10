import React from 'react';
import { ImagesSection } from 'components/ProfileImagesSection/style';
import UserCoverPicture from 'components/UserCoverPicture';
import UserProfilePicture from 'components/UserProfilePicture';

const ProfileImagesSection = ({ user, allowEdit }) => {
  return (
    <ImagesSection>
      <UserCoverPicture user={user} allowEdit={allowEdit} />
      <UserProfilePicture user={user} allowEdit={allowEdit} />
    </ImagesSection>
  );
};

export default ProfileImagesSection;
