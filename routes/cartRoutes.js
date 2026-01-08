const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// GET cart for user
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId"
    );
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add product to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity required" });
    }
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// Update quantity
router.put("/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity required" });
    }
    const cart = await Cart.findOne({ userId: req.user.id });
    console.log("Cart found:", cart);
    console.log("User ID:", req.user.id);
    console.log("Product ID:", req.params.productId);
    console.log(
      "Cart items IDs:",
      cart ? cart.items.map((item) => item._id.toString()) : "No cart"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const item = cart.items.find(
      (item) => item.productId.toString() === req.params.productId
    );
    console.log("Item:", item);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// Delete cart item
router.delete("/:productId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === req.params.productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error deleting from cart" });
  }
});

module.exports = router;
