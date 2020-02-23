import React from 'react';
import ComposersListEntry from './composers_list_entry';
import {useSelector, useDispatch} from 'react-redux';
import { userActions } from '../../../redux/actions';

const Composers = () => {

  const users = useSelector(state => state.users.items);
  const dispatch = useDispatch();
  
  if (!users) {
    dispatch(userActions.getAll());
  }
  
  const filteredUsers = users ? users.filter((user) => {
    return user && user.first_name && user.last_name && !user.is_deleted && !user.is_admin && !user.is_curator;
  }) : [];

  return <>
  <h2>Composers</h2>
  <p>Students registered to submit scores!</p>
  
  <div className="composers-list">
    {filteredUsers.map((user, i) => {
      return <ComposersListEntry composer_name={`${user.first_name} ${user.last_name}`} composer_bio={user.bio} 
              composer_url={`${user.id}`} avatar_url={user.photo} key={i}/>
    })}    
  </div>
</>};

export default Composers