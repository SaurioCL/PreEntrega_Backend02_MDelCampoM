export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;
    if(
        title === undefined ||
        description === undefined ||
        code === undefined ||
        price === undefined ||
        stock === undefined ||
        category === undefined
    ){
        return res.status(400).json({ message: 'Invalid body' });
    }
    else next();
};
