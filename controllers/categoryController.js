const HttpError = require("../helpers/httpError");

const { getCategories, getOneCategory, createCategory, updateCategoryInDb, deleteCategoryById } = require("../services");
const { getOneUser } = require("../services");

exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await getCategories();

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneCategory(id);

    if (!result) {
      return HttpError(404, "Category not found");
    }

    return res.status(200).json(results.rows);
  } catch (er) {
    next(er);
  }
};

exports.createNewCategory = async (req, res, next) => {
  try {
    const categoryData = req.body;

    const isUser = await getOneUser(categoryData.user_id);

    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    const result = await createCategory({
      user_id: categoryData.user_id,
      name: categoryData.name,
      category_type: categoryData.category_type,
    });

    const newCategory = result.rows.pop();

    res.status(201).json({
      msg: "Success",
      category: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

// update

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, name, category_type } = req.body;

    // check if category exists
    const category = await getOneCategory(id);
    if (!category) {
      return HttpError(404, "Category not found");
    }

    // check if user exists
    const isUser = req.body.user_id;
    if (isUser.rowCount < 1) {
      return HttpError(404, "User not found");
    }

    updateCategoryInDb(id, user_id, name, category_type);

    res.status(200).send(`Category modified with ID: ${id}`);
  } catch (er) {
    next(er);
  }
};

// delete
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getOneCategory(id);

    if (!result) {
      return HttpError(404, "category not found");
    }

    deleteCategoryById(id);

    res.status(200).send(`category deleted with ID: ${id}`);
  } catch (error) {
    next(error);
  }
};
