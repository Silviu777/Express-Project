import express from 'express';
import { getArticles, getArticle, addArticle, updateArticle, deleteArticle } from '../service/service.js';

const router = express.Router();

router.route('/articles').get((request, response) => getArticles(request, response));
router.route('/articles/:id').get((request, response) => getArticle(request, response));
router.route('/articles/add').post((request, response) => addArticle(request, response));
router.route('/articles/update/:id').put((request, response) => updateArticle(request, response));
router.route('/articles/delete/:id').delete((request, response) => deleteArticle(request, response));

export default router;