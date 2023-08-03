import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

//GET: List of all Author
authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(500).json(error);
  }
});

//GET a single author ID
authorRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return res.status(200).json(author);
    }
    return res.status(404).json("Author could nopt be found");
  } catch (error: any) {
    return res.status(500).json(error);
  }
});

//POST: create a aauthor
//Params: Fname & Lname
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    try {
      const author = req.body;
      const newAuthor = await AuthorService.createAuthor(author);
      return res.status(201).json(newAuthor);
    } catch (error: any) {
      return res.status(500).json(error);
    }
  }
);

//PUT: updating an aauthor
//Params: Fname & Lname
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (req: Request, res: Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const id: number = parseInt(req.params.id, 10);
    try {
      const author = req.body;
      const updateAuthor = await AuthorService.updateAuthor(author, id);
      return res.status(200).json(updateAuthor);
    } catch (error: any) {
      return res.status(500).json(error);
    }
  }
);

//DELETE: delete an aauthor based on the ID
authorRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    await AuthorService.deleteAuthor(id);
    return res.status(204).send("Author has been successfully delected!");
  } catch (error: any) {
    return res.status(500).json(error);
  }
});
