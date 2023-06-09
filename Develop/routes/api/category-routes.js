const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const data = await Category.findAll({
      include: Product,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if(!data) {
      res.status(404).json({message: "Nothing was found with this ID!"})
      return
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const data = await Category.create(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }

  // create a new category
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Category.update({
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    })
    if(!data) {
      res.status(404).json({message: "Nothing was found with this ID!"})
      return
    }
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }

  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!data) {
      res.status(404).json({message: "Nothing was found with this ID!"})
      return;
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }

  // delete a category by its `id` value
});

module.exports = router;
