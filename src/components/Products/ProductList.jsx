import React from "react";
import "./ProductList.css";

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found. Add your first product!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Products ({products.length})</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-details">
                <span className="product-price">${product.price}</span>
                <span className="product-category">{product.category}</span>
                <span
                  className={`product-stock ${
                    product.stock < 10 ? "low-stock" : ""
                  }`}
                >
                  Stock: {product.stock}
                </span>
              </div>
            </div>
            <div className="product-actions">
              <button
                className="btn btn-edit"
                onClick={() => onEditProduct(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => onDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
