import React from 'react';
import { Link } from 'react-router';
import Review from './Review'


export default class AllProducts extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
      editForm: false,
      reviewTitle: '',
      reviewContent: '',
      rating: '0'
    }
    this.newReview = this.newReview.bind(this);
    this.reviewContentChange = this.reviewContentChange.bind(this);
    this.reviewTitleChange = this.reviewTitleChange.bind(this);
    this.cartClickHandler = this.cartClickHandler.bind(this);
  }

  cartClickHandler() {
    this.props.addToCart(this.props.product)
  }

  newReview(evt) {
    evt.preventDefault();
    let bodyObj = {
      rating: this.state.rating,
      title: this.state.reviewTitle,
      content: this.state.reviewContent,
      ProductId: this.props.product.id,
      UserId: this.props.loggedInUser.id
    }
    this.props.submitNewReview(bodyObj)
    this.setState({'editForm': false})
  }

  reviewContentChange(evt) {this.setState({'reviewContent': evt.target.value})}

  reviewTitleChange(evt) {this.setState({'reviewTitle': evt.target.value})}


  render() {
    const fish = this.props.product;
    const reviews = this.props.reviews;
    const star = <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true"></span>

    let avg = 0.0;
    let stars = [];
    if ((reviews != undefined && reviews.length)) {
      reviews.map((review) =>{
        avg += +review.rating;
      })
      avg = avg/reviews.length;

      for (let i = 0; i < avg; i++) {
        stars.push(<span className="ratingStar glyphicon glyphicon-star" aria-hidden="true"></span>)
      }
    }

    return (
      <div className="default-container">
        <div className="row">
            <div className="col-xs-5" key={ fish.id }>
                <img id="single-product-img" src={ fish.imageUrl } />
            </div>
            <div className="caption col-xs-6">
              <h2 id="product-title" className="fancy-type">{ fish.title }</h2>
              <h3>{ stars }</h3>
              <h5>
                <h4 className ="region fancy-type">{ fish.region }</h4>
                <p className="description"><span id="field-notes">Field Notes:</span> { fish.description }</p>
                <p className ="price fancy-type yellow">${ fish.price }</p>
              </h5>
              {
                this.props.flashMessage &&
                <div className="alert alert-success" role="alert">
                  <strong>Success!</strong> { this.props.flashMessage }
                </div>
              }

              {
                (fish.outOfStock) ? <div>
                  <button onClick ={ this.cartClickHandler } className='btn btn-primary' id="product-add" disabled>
                    <span className="glyphicon glyphicon-shopping-cart"/>
                  </button> <span> Sorry, this item is out of stock!</span>
                </div>
                : <button onClick ={ this.cartClickHandler } className='btn btn-primary' id="product-add">
                    <span className="glyphicon glyphicon-shopping-cart"/>
                </button>
              }

            </div>
        </div>

        <div className="row">
          <div className='col-md-3'>
          </div>
          <div className="panel panel-default col-md-6 review-panel">
              <div className="panel-body review-inner-panel">
                <div className="reviews">
                  <h2 className="fancy-type">User Reviews</h2>
                  {
                    (reviews != undefined && reviews.length) ?
                    reviews.map((review) =>{
                      return <Review className="single-review" key={ review.id } review={ review } />
                    })
                    : <h4>No users have reviewed this product yet!</h4>
                  }
                  {
                    (!this.state.editForm) ? (this.props.loggedInUser.id) ? <button type="button" id="leave-review" className="btn btn-primary" onClick={ () => this.setState({'editForm': 'true'}) }>Leave a Review</button>
                      : <div><button type="button" className="btn btn-primary" id="leave-review-disabled" disabled>Leave a Review</button>
                          <p className='yellow'>You must be <Link className="login-review-link" to="/login">logged in</Link> to leave a review.</p>
                        </div>
                    : <div className='form-group'>
                      <form onSubmit={ this.newReview} >
                        Rating (1-5):
                        {(this.state.rating>='1') ?
                            <span className="glyphicon glyphicon-star ratingStar btn-lg text-shadow" aria-hidden="true" onClick={() => this.setState({'rating': '1'})}></span>
                            : <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '1'})}></span>
                        }
                        {(this.state.rating>='2') ?
                            <span className="glyphicon glyphicon-star ratingStar text-shadow btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '2'})}></span>
                            : <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '2'})}></span>
                        }
                        {(this.state.rating>='3') ?
                            <span className="glyphicon glyphicon-star ratingStar text-shadow btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '3'})}></span>
                            : <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '3'})}></span>
                        }
                        {(this.state.rating>='4') ?
                            <span className="glyphicon glyphicon-star ratingStar text-shadow btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '4'})}></span>
                            : <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '4'})}></span>
                        }
                        {(this.state.rating>='5') ?
                            <span className="glyphicon glyphicon-star ratingStar text-shadow btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '5'})}></span>
                            : <span className="glyphicon glyphicon-star-empty btn-lg" aria-hidden="true" onClick={() => this.setState({'rating': '5'})}></span>
                        }

                        <input type="text" className="form-control" value={ this.state.reviewTitle }
                               onChange={ this.reviewTitleChange } placeholder="Review Title" />
                        <textarea height='100' width='100' className='form-control' value={ this.state.reviewContent }
                                  placeholder="Type your review here..." onChange={ this.reviewContentChange }></textarea>
                        {
                          (this.state.rating=='0') ? <button type="submit" className="btn btn-primary" id="review-submit-disabled" disabled>Submit Review</button>
                          : <button type="submit" className="btn btn-primary" id="review-submit">Submit Review</button>
                        }

                      </form>
                      </div>
                  }

                </div>

              </div>
            </div>
            <div className='col-md-3'>
            </div>
        </div>

      </div>
      )
  }
}

