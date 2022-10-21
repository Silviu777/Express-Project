import { Article, Category, Token } from "../model/repository.js";

async function getArticles(request, response) {
    try {
        const articles = await Article.findAll({
            include: [
                {
                    model: Category,
                    attributes: { exclude: ['id'] }

                }]
        });

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

async function getCategories(request, response) {
    try {
        const categories = await Category.findAll();

        if (categories.length > 0) {
            response.status(200).json(categories);
        }
        else {
            response.status(204).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function addCategory(request, response) {
    const existingCategory = await Category.findAndCountAll({
        where: {
            category_name: request.body.category_name
        },
        attributes: ['category_name']
    });

    try {
        if (request.body.category_name && existingCategory['count'] < 1) {
            await Category.create(request.body);
            response.status(201).send(`Category "${request.body.category_name}" has been created!`);
        }
        else {
            if (existingCategory['count'] == 1) {
                response.status(400).send(`Category "${request.body.category_name}" already exists!`);
            }
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function updateCategory(request, response) {
    try {
        const category = await Category.findByPk(request.params.id);

        if (category) {
            Object.entries(request.body).forEach(([body, value]) => category[body] = value);

            await category.save();
            response.send(`Category "${request.body.category_name}" has been updated!`);
        }
        else {
            response.status(404).send(`Category "${request.body.category_name}" not found! Please introduce a valid name.`);
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function deleteCategory(request, response) {
    try {
        if (request.params.id) {
            const category = await Category.findByPk(request.params.id);

            if (category) {
                await category.destroy();
                response.send(`Category  "${request.body.category_name}" has been removed!`);
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

async function getTokens(request, response) {
    try {
        const tokens = await Token.findAll({
            include: [
                {
                    model: Article,
                    attributes: { exclude: ['token_id'] },
                    include: {
                        model: Category,
                        attributes: { exclude: ['id'] }
                    }
                }]
        });

        if (tokens.length > 0) {
            response.status(200).json(tokens);
        }
        else {
            response.status(204).send();
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function getToken(request, response) {
    try {
        if (request.params.id) {
            const token = await Token.findByPk(request.params.id, {
                include: [
                    {
                        model: Article,
                        attributes: { exclude: ['token_id'] },
                        include: {
                            model: Category,
                            attributes: { exclude: ['id'] }
                        }
                    }]
            });
            if (token) {
                response.json(token);
            }
            else {
                response.status(404).send(`Token with id ${request.params.id} not found! Please introduce a valid id.`);
            }
        } else {
            response.status(400).send();
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

async function addToken(request, response) {
    try {
        if (request.body) {
            await Token.create(request.body);
            response.status(201).send(`Token with body "${request.body.token_body}" has been created!`);
        }
        else {
            response.status(400).send(`Token could not be created!`);
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function updateToken(request, response) {
    try {
        const token = await Token.findByPk(request.params.id);

        if (token) {
            Object.entries(request.body).forEach(([body, value]) => token[body] = value);

            await token.save();
            response.send(`Token with id ${request.params.id} has been updated!`);
        }
        else {
            response.status(404).send(`Token with id ${request.params.id} not found! Please introduce a valid id.`);
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
}

async function deleteToken(request, response) {
    try {
        if (request.params.id) {
            const token = await Token.findByPk(request.params.id);

            if (token) {
                await token.destroy();
                response.send(`Token with id ${request.params.id} has been removed!`);
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

export { getArticles, getArticle, addArticle, updateArticle, deleteArticle, getCategories, addCategory, updateCategory, deleteCategory, getTokens, getToken, addToken, updateToken, deleteToken }