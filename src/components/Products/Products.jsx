import React, { useState, useEffect, useCallback } from "react";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import "./Products.css";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationMessage, setOperationMessage] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (!operationMessage) return;
    const timeout = setTimeout(() => setOperationMessage(null), 4000);
    return () => clearTimeout(timeout);
  }, [operationMessage]);

  const handleAddProduct = useCallback(async (newProduct) => {
    setError(null);
    try {
      const created = await createProduct(newProduct);
      setProducts((prev) => [created, ...prev]);
      setOperationMessage("Product added successfully");
      setShowAddForm(false);
    } catch (err) {
      setError(err.message || "Failed to add product");
      throw err;
    }
  }, []);

  const handleUpdateProduct = useCallback(async (updatedProduct) => {
    setError(null);
    try {
      const saved = await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.id === saved.id ? saved : product))
      );
      setOperationMessage("Product updated successfully");
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || "Failed to update product");
      throw err;
    }
  }, []);

  const handleDeleteProduct = useCallback(async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setError(null);
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setOperationMessage("Product deleted successfully");
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  }, []);

  const handleEditProduct = (product) => {
    setShowAddForm(false);
    setEditingProduct(product);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Product Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm || editingProduct}
        >
          Add New Product
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {operationMessage && (
        <div className="alert alert-success">{operationMessage}</div>
      )}

      {showAddForm && (
        <AddProduct onAddProduct={handleAddProduct} onCancel={handleCancel} />
      )}

      {editingProduct && (
        <UpdateProduct
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onCancel={handleCancel}
        />
      )}

      <ProductList
        products={products}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default Products;
