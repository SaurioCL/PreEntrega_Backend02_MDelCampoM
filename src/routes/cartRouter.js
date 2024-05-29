import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import { __dirname } from "../utils.js";

const router = Router();
const cartManager = new CartManager(`${__dirname}/db/carts.json`);

router.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
        const { idProd } = req.params;
        const { idCart } = req.params;
        const response = await cartManager.saveProductToCart(idCart, idProd);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res) => {
    try {
        res.json(await cartManager.createCart());
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/:idCart", async (req, res) => {
    try {
        const { idCart } = req.params;
        const cart = await cartManager.getCartById(idCart);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;