import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('articles', 'root', 'unitedboeing', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false //  pentru acest scenariu nu sunt necesare campurile createdAt si updatedAt create automat de Sequelize, de aceea atributul va fi setat cu false
    }
});

const Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    article_no: {
        type: Sequelize.STRING,
        allowNull: false
    },

    article_short_description: {
        type: Sequelize.STRING
    },

    article_date: {
        type: Sequelize.DATE
    },

    collection_date: {
        type: Sequelize.DATE
    },

    article_body: {
        type: Sequelize.STRING
    },

    article_source: {
        type: Sequelize.STRING
    },

    article_url: {
        type: Sequelize.STRING
    },

    location: {
        type: Sequelize.STRING
    },

    article_keywords: {
        type: Sequelize.STRING
    },

    article_weight: {
        type: Sequelize.INTEGER
    },

    article_citations: {
        type: Sequelize.STRING
    }
});

sequelize.sync();

async function init() {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
}

export { Article, init }