import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link8' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Card Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <div className='cards__item__text'>{props.text1}</div>
          </div>
          <div className='cards__item__info'>
            <div className='cards__item__text0'>🌟최대혜택🌟</div>
          </div>
          <div className='cards__item__info'>
            <div className='cards__item__text1'>{props.text2}</div>
          </div>
          <br></br>
          <div className='cards__item__info'>
            <a href={props.path} className='cards__item__text2'>👉{props.label} 신청하러 가기</a>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;