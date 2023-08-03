import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as BookService from "./book.service";

export const bookRouter = express.Router();

//GET: all books
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const books = await BookService.listBooks();
    return res.status(200).json(books);
  } catch (error: any) {
    return res.status(500).json(error);
  }
});

//GET: book by ID
bookRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const book = await BookService.getBook(id);
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(500).json("ID doesen't exists");
    }
  } catch (error: any) {
    return res.status(500).json(error);
  }
});

//POST: create a book
bookRouter.post(
  "/",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    try {
      const book = req.body;
      const newBook = await BookService.createBook(book);
      return res.status(201).json(newBook);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
);

//PUT: update a book
bookRouter.put(
  "/:id",
  body("title").isString(),
  body("authorId").isInt(),
  body("datePublished").isDate().toDate(),
  body("isFiction").isBoolean(),
  async (req: Request, res: Response) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const book = req.body;
      const updateBook = await BookService.updateBook(book, id);
      return res.status(200).json(updateBook);
    } catch (error: any) {
      return res.status(400).json(error);
    }
  }
);

//DELETE: delete a book
bookRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await BookService.deleteBook(id);
    return res.status(204).json("Book was successfully deleted");
  } catch (error: any) {
    return res.status(400).json(error);
  }
});
