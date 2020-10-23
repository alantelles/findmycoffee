// eslint-disable-next-line
import React, { Fragment, useState, useEffect} from 'react';
// eslint-disable-next-line
import RatingService from '../../../services/ratings';
import Form from './Form';

const Ratings = (props) => {
  return (
    <Fragment>
      <Form place={props.place}/>
    </Fragment>
  )
}

export default Ratings;
