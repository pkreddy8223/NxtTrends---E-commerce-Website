import "./index.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { productData } = props;
  const { id, title, brand, imageUrl, rating, price } = productData;

  return (
    //   Wrap with Link from react-router-dom
    <Link className="product-item-link" to={`/products/${id}`}>
      <li className="product-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
