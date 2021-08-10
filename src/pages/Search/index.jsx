import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileCard from 'components/ProfileCard';
import SearchFilters from 'components/SearchFilters';
import useQuery from 'utils/useQuery';
import { userSearch } from 'api';
import ProfileContainer from 'elements/Profile/ProfileContainer';

const Search = () => {
  const query = useQuery();

  const search_param = query.get('search');
  const [value, setValue] = useState('');
  console.log('this is my search query outside filter', search_param);
  useEffect(() => {}, [value]);
  const [searchResults, setSearchResults] = useState([]);
  const [hometownFilters, setHometownFilters] = useState([]);
  const [educationFilters, setEducationFilters] = useState([]);
  const [workFilters, setWorkFilters] = useState([]);

  const getFiltersFromData = (filter_name, data) => {
    return data
      .map((data_obj) => {
        if (filter_name in data_obj.profile)
          return data_obj.profile[filter_name];
        return '';
      })
      .filter((value, index, original_array) => {
        return original_array.indexOf(value) === index && value !== '';
      });
  };

  const getSearchResults = () => {
    const requestData = {
      search: search_param,
    };

    query.forEach((value, key) => {
      requestData[key] = value;
    });
    userSearch(requestData).then((response) => {
      setSearchResults(response);
      setWorkFilters(getFiltersFromData('work', response));
      setEducationFilters(getFiltersFromData('education', response));
      setHometownFilters(getFiltersFromData('hometown', response));
    });
  };
  useEffect(getSearchResults, [query.toString(), search_param]);

  return (
    <div>
      <ProfileContainer>
        <Row>
          <Col md='4'>
            <SearchFilters
              hometownFilters={hometownFilters && hometownFilters}
              educationFilters={educationFilters && educationFilters}
              workFilters={workFilters && workFilters}
              searchParams={search_param}
              setForceRerender={setValue}
            />
          </Col>
          <Col md='8'>
            <h4>
              {`${searchResults.length} Search Result(s) for ${search_param}`}
            </h4>
            <div>
              {searchResults.map((user, _) => (
                <ProfileCard
                  id={user.id}
                  picture={user.profile.profile_picture}
                  name={`${user.first_name}  ${user.last_name}`}
                  hometown={user.profile.hometown}
                  age={user.profile__age}
                  gender={user.profile.gender}
                  extras={
                    user.education
                      ? user.profile.education
                      : user.profile.work
                      ? user.profile.work
                      : user.profile.relationship_status
                  }
                  key={`${user.first_name}-id-${user.id}`}
                />
              ))}
            </div>
          </Col>
        </Row>
      </ProfileContainer>
    </div>
  );
};

export default Search;
