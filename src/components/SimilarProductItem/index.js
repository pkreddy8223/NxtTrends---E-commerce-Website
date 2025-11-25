// Write your code here
import "./index.css";

const SimilarProductItem = (props) => {
  const { productDetails } = props;
  const {
    imageUrl,
    title,
    style,
    price,
    description,
    brand,
    totalReviews,
    rating,
    availability,
  } = productDetails;
  return (
    <li className="similar-item-item">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-item-image"
      />
      <div className="similar-item-content-container">
        <p className="similar-item-name">{title}</p>
        <p className="similar-item-brand">by {brand}</p>
        <div className="similar-item-rating-and-price-container">
          <p className="similar-item-price">Rs {price}/-</p>
          <div className="similar-item-review-container">
            <p className="similar-item-review">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-item-review-image"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SimilarProductItem;
