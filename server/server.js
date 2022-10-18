import express, { json } from "express";
import cors from "cors";
import { init } from "../model/repository.js";
import router from "../routing/router.js";

express()
    .use(cors({
        origin: "*",
        methods: "GET, POST, PUT, DELETE",
        optionsSuccessStatus: 200
    }))
    .use(json())
    .use('/api', router)
    .listen(8080, async () => {
        try {
            await init();
        }
        catch (error) {
            console.error(error);
        }
    });
