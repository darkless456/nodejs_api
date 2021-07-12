const xss = require('xss');
const { ArticleModels, ResponseModels } = require('../models');
const { exec } = require('../utils/database');

const getAllArticles = async () => {
  const result = await exec('select * from nodejs_blog.article');
  let data;
  if (result.length > 0) {
    data = result.map((item) => new ArticleModels.ArticleModel(item));
  }
  return new ResponseModels.SuccessModel(data);
};

const getArticleById = async (articleId) => {
  const intArticleId = parseInt(articleId, 10);
  const result = await exec('select * from nodejs_blog.article where id=? limit ?', [intArticleId, 1]);
  const data = result.length > 0 ? result[0] : {};
  return new ArticleModels.ArticleModel(data);
};

const addArticle = async (data) => {
  const { title, content } = data;
  const result = await exec('insert into nodejs_blog.article (title, content) values (?, ?)', [xss(title), xss(content)]);
  return result.affectedRows === 1 ? new ResponseModels.SuccessModel()
    : new ResponseModels.ErrorModel();
};

const deleteArticleById = async (articleId) => {
  const intArticleId = parseInt(articleId, 10);
  const result = await exec('delete from nodejs_blog.article where id=? limit ?', [intArticleId, 1]);
  return result.affectedRows === 1 ? new ResponseModels.SuccessModel()
    : new ResponseModels.ErrorModel();
};

const updateArticle = async (data) => {
  const { id: articleId, title, content } = data;
  const intArticleId = parseInt(articleId, 10);
  const result = await exec('update nodejs_blog.article set title=?, content=? where id=? limit ?', [xss(title), xss(content), intArticleId, 1]);
  return result.affectedRows === 1 ? new ResponseModels.SuccessModel()
    : new ResponseModels.ErrorModel();
};

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
  deleteArticleById,
  updateArticle,
};
