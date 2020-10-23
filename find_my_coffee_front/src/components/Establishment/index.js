import React, { useState, useEffect } from 'react';
import EstablishmentsService from '../../services/establishment_service';
import Ratings from './Ratings'

import styled from 'styled-components';

const LeftBar = styled.div`
  background-color: #574d41;
  color: white;
  height: 100%; width: 250px;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 60px;
  position: absolute;
`

const Title = styled.h1`
  font-size: 1.4em;
  color: #f5efe9;
`
const Paragraph = styled.p`
  font-size: 0.9em;
  line-height: 20px;
`

const Image = styled.img`
  height: 150px; width: 100%;
`

const Establishment = (props) => {
  const [establishment, setEstablishment] = useState([]);
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    getEstablishmentInfo();
  }, [props.place]) // eslint-disable-line react-hooks/exhaustive-deps

  async function getEstablishmentInfo() {
    try {
      const response = await EstablishmentsService.show(props.place.place_id);
      setEstablishment(response.data.result);
    }
    catch (error) {
      setEstablishment([])
    }
  }
  return (
    <LeftBar>
      {
        (establishment.photos) ?
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${establishment.photos[0].photo_reference}&maxwidth=400&key=${REACT_APP_GOOGLE_API_KEY}`}
            alt="Coffee Photo"
          />
        : 
        <Image
          src="/images/no_photo.jpg"
          alt="No photo"
        />
        
      }
      <Title>{establishment.name}</Title>
      {
        (establishment.opening_hours) ?
          <div>
            {(establishment.opening_hours.open_now === true) ? "Aberto" : "Fechado"}
            <hr/>
            {
              establishment.opening_hours.weekday_text.map((schedule, index) => <Paragraph key={index}>{schedule}</Paragraph>)
            }
          </div>
          
        : <Paragraph>Dias de funcionamento não informados</Paragraph>
      }
      <hr/>
      <Paragraph>{establishment.formatted_address}</Paragraph>
      <Ratings place={props.place} />
    </LeftBar>
  )
}

export default Establishment;