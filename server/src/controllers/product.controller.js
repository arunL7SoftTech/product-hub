import Product from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProductSchema,
  updateProductSchema,
  parseProductPayload,
} from "../validators/product.validator.js";

export const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const validatedData = parseProductPayload(createProductSchema, {
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  });

  const product = await Product.create(validatedData);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const validatedData = parseProductPayload(updateProductSchema, {
    ...req.body,
    price:
      req.body.price !== undefined && req.body.price !== null
        ? Number(req.body.price)
        : undefined,
    stock:
      req.body.stock !== undefined && req.body.stock !== null
        ? Number(req.body.stock)
        : undefined,
  });

  const product = await Product.findByIdAndUpdate(req.params.id, validatedData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    throw error;
  }

  res.status(204).send();
});

