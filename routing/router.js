import express from 'express';
import { getArticles, getArticle, addArticle, updateArticle, deleteArticle, getCategories, addCategory, updateCategory, deleteCategory, getTokens, getToken, addToken, updateToken, deleteToken } from '../service/service.js';

const router = express.Router();

router.route('/articles').get((request, response) => getArticles(request, response));
router.route('/articles/:id').get((request, response) => getArticle(request, response));
router.route('/articles/add').post((request, response) => addArticle(request, response));
router.route('/articles/update/:id').put((request, response) => updateArticle(request, response));
router.route('/articles/delete/:id').delete((request, response) => deleteArticle(request, response));

router.route('/categories').get((request, response) => getCategories(request, response));
router.route('/categories/add').post((request, response) => addCategory(request, response));
router.route('/categories/update/:id').put((request, response) => updateCategory(request, response));
router.route('/categories/delete/:id').delete((request, response) => deleteCategory(request, response));

router.route('/tokens').get((request, response) => getTokens(request, response));
router.route('/tokens/:id').get((request, response) => getToken(request, response));
router.route('/tokens/add').post((request, response) => addToken(request, response));
router.route('/tokens/update/:id').put((request, response) => updateToken(request, response));
router.route('/tokens/delete/:id').delete((request, response) => deleteToken(request, response));

export default router;