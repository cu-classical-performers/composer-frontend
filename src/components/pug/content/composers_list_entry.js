import React from 'react';
import {Link} from 'react-router-dom';

const ComposersListEntry = (props) => <> 
    <Link className="composers-list-entry" to={`/composers/${props.composer_url}`}>
      <div className="img-container">
        <img src={props.avatar_url}></img>
      </div>
      <div className="text-copy">
        <h3>{props.composer_name}</h3>
        <p>{props.composer_bio}</p>
      </div>
    </Link>
</>;

export default ComposersListEntry;
    
    