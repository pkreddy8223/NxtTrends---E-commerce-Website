// Write your code here
import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import Header from "../Header";
import SimilarProductItem from "../SimilarProductItem";

import "./index.css";

const productItemApiStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class ProductItemDetails extends Component {
  state = {
    apiStatus: productItemApiStatus.initial,
    productItemDetails: {},
    quantity: 1,
  };

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails = async () => {
    this.setState({ apiStatus: productItemApiStatus.inProgress });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const jwtToken = Cookies.get("jwt_token");
    console.log(jwtToken);

    const url = `https://apis.ccbp.in/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const updatedProductItemDetails = {
        availability: data.availability,
        title: data.title,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products.map((product) => ({
          availability: product.availability,
          brand: product.brand,
          description: product.description,
          id: product.id,
          imageUrl: product.image_url,
          price: product.price,
          rating: product.rating,
          style: product.style,
          title: product.title,
          totalReviews: product.total_reviews,
        })),
      };
      console.log(updatedProductItemDetails);
      this.setState({
        productItemDetails: updatedProductItemDetails,
        apiStatus: productItemApiStatus.success,
      });
    } else {
      this.setState({ apiStatus: productItemApiStatus.failure });
    }
  };

  onClickMinusBtn = () => {
    const { quantity } = this.state;
    this.setState((prevState) => {
      if (quantity === 1) {
        return null;
      }
      return { quantity: prevState.quantity - 1 };
    });
  };

  onClickPlusBtn = () => {
    const { quantity } = this.state;
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderProductItemSuccess = () => {
    const { productItemDetails, quantity } = this.state;
    const {
      imageUrl,
      title,
      price,
      description,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
    } = productItemDetails;
    return (
      <div className="product-success-container">
        <div className="product-item-container">
          <div className="product-item-image-container">
            <img src={imageUrl} alt="product" className="product-item-image" />
          </div>
          <div className="product-item-content-container">
            <h1 className="item-name">{title}</h1>
            <p className="item-price">Rs {price}/-</p>
            <div className="product-item-review-container">
              <div className="product-item-review">
                <p className="item-rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="rating-star-image"
                />
              </div>
              <p className="product-item-review-count">
                {totalReviews} Reviews
              </p>
            </div>
            <p className="product-item-description">{description}</p>
            <p className="item-availability">
              <span className="item-bold-font">Available:</span> {availability}
            </p>
            <p className="item-brand">
              <span className="item-bold-font">Brand: </span>
              {brand}
            </p>
            <hr />
            <div className="product-item-quantity-container">
              <button
                onClick={this.onClickMinusBtn}
                data-testid="minus"
                className="quantity-btn"
              >
                <BsDashSquare className="quantity-btn-img" />
              </button>
              <p className="item-quantity-count">{quantity}</p>
              <button
                onClick={this.onClickPlusBtn}
                data-testid="plus"
                className="quantity-btn"
              >
                <BsPlusSquare className="quantity-btn-img" />
              </button>
            </div>
            <button className="item-add-to-cart-btn">Add To Cart</button>
          </div>
        </div>
        <div className="similar-product-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list-container">
            {similarProducts.map((product) => (
              <SimilarProductItem key={product.id} productDetails={product} />
            ))}
          </ul>
        </div>
      </div>
    );
  };

  onClickContinueShoppingBtn = () => {
    const { history } = this.props;
    history.replace("/products");
  };

  renderProductItemFailure = () => (
    <div className="product-item-failure-container">
      <div className="product-item-failure-content-container">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          className="product-item-failure-image"
        />
        <h1 className="product-item-failure-heading">Product Not Found</h1>
        <button
          onClick={this.onClickContinueShoppingBtn}
          className="product-item-failure-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  renderProductItemLoading = () => (
    <div data-testid="loader" className="product-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  );

  renderProductItem = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case productItemApiStatus.success:
        return this.renderProductItemSuccess();
      case productItemApiStatus.failure:
        return this.renderProductItemFailure();
      case productItemApiStatus.inProgress:
        return this.renderProductItemLoading();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="product-item-main-container">
          {this.renderProductItem()}
        </div>
      </>
    );
  }
}

export default ProductItemDetails;
