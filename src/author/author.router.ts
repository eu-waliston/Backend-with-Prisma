import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

//GET: List of all Author
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json(error);
  }
});

//GET a single author ID
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return response.status(200).json(author);
    }
    return response.status(404).json("Author could nopt be found");
  } catch (error: any) {
    return response.status(500).json(error);
  }
});

//POST: create a aauthor
//Params: Fname & Lname
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
      return response.status(400).json({ erros: erros.array() });
    }

    try {
      const author = request.body;
      const newAuthor = await AuthorService.createAuthor(author);
      return response.status(201).json(newAuthor);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }
);

//PUT: updating an aauthor
//Params: Fname & Lname
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const erros = validationResult(request);
    if (!erros.isEmpty()) {
      return response.status(400).json({ erros: erros.array() });
    }

    const id: number = parseInt(request.params.id, 10);
    try {
      const author = request.body;
      const updateAuthor = await AuthorService.updateAuthor(author, id);
      return response.status(200).json(updateAuthor);
    } catch (error: any) {
      return response.status(500).json(error);
    }
  }
);


//DELETE: delete an aauthor based on the ID
authorRouter.delete("/:id", async(request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    await AuthorService.deleteAuthor(id);
    return response.status(204).send("Author has been successfully delected!")
  } catch (error: any) {
    return response.status(500).json(error);
    
  }

})