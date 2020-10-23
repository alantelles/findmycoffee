import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const Form = (props) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [value, setValue] = useState(1);

  return (
    <div>
      <form>
        <input 
          name="name"
          type="text"
          placeholder="Seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <textarea
          name="review"
          placeholder="Sua opinião"
          onChange={(e) => setReview(e.target.value)}
          value={review}
        />
        <div>
          <ReactStars
            count={5}
            value={value}
            size={24}
            activeColor="#ffd700"
            onChange={(newValue) => setValue(newValue)}
          />
          <button
            type="submit"
            className="button is-danger"
          >Enviar</button>
        </div>
      </form>

    </div>
  )
}

export default Form;