import { Article } from "../model/repository.js";

async function getArticles(request, response) {
    try {
        const articles = await Article.findAll();

        if (articles.length > 0) {
            response.status(200).json(articles);
        }
        else {
            response.status(204).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function getArticle(request, response) {
    try {
        if (request.params.id) {
            const article = await Article.findByPk(request.params.id);

            if (article) {
                response.json(article);
            }
            else {
                response.status(404).send(`Article with id ${request.params.id} not found! Please introduce a valid id.`);
            }
        }
        else {
            response.status(400).send(); // se va afisa daca id-ul introdus este incorect
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function addArticle(request, response) {
    const existingArticle = await Article.findAndCountAll({
        where: {
            article_no: request.body.article_no
        },
        attributes: ['article_no']
    });

    try {
        if (request.body.article_no && existingArticle['count'] < 1) {
            await Article.create(request.body);
            response.status(201).send(`Article with title ${request.body.article_no} has been created!`);
        }
        else {
            // daca articolul exista deja, serverul va notifica utilizatorul privind acest aspect
            if (existingArticle['count'] == 1) {
                response.status(400).send(`Article with title ${request.body.article_no} already exists!`);
            }
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function updateArticle(request, response) {
    try {
        const article = await Article.findByPk(request.params.id);

        if (article) {
            Object.entries(request.body).forEach(([body, value]) => article[body] = value); // actualizeaza continutul elementului de modificat

            await article.save();
            response.send(`Article with id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send(`Article with id ${request.params.id} not found! Please introduce a valid id.`);
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function deleteArticle(request, response) {
    try {
        if (request.params.id) {
            const article = await Article.findByPk(request.params.id);

            if (article) {
                await article.destroy();
                response.send(`Article with id ${request.params.id} has been removed!`);
            }
        }
        else {
            response.status(400).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

export { getArticles, getArticle, addArticle, updateArticle, deleteArticle }