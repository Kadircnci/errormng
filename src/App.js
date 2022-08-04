import { Container, Row, Col } from "reactstrap";
import React, { Component } from 'react'
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";

export default class App extends Component {

  state = { currentCategory: "", products: [] }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {

    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));;
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName })
    this.getProducts(category.id);
  }
  render() {
    let productInfo = { title: "Product List", baskabisey: "baska" }
    let categoryInfo = { title: "Category List" }
    return (
      <div>
        <Container>

          <Row>
            <Navi />
          </Row>

          <Row>
            <Col xs='3'>
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} />
            </Col>

            <Col xs='9'>
              <ProductList products={this.state.products} currentCategory={this.state.currentCategory} info={productInfo} />
            </Col>
          </Row>

        </Container>


      </div>
    );

  }
};
