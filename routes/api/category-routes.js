const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get route for all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get route for specific category id with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route for creating a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route for updating a category name
router.put('/:id', async (req, res) => {
  try {
    await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json("Category name updated!")
  } catch (err) {
    res.status(500).json(err);
  }
});
// route for deleting a category
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy(
      { where: { id: req.params.id } }
    );
    res.status(200).json("Category deleted!")
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
