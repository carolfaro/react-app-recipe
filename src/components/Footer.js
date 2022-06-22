import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import drinkSvg from '../images/drinkIcon.svg';
import exploreSvg from '../images/exploreIcon.svg';
import mealSvg from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img src={ drinkSvg } alt="drink-icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explore">
        <img src={ exploreSvg } alt="explore-icon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealSvg } alt="fork-spon-icon" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
