import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = Router();

app.get("/hello", (_req: Request, res: Response) => {
  res.status(200).json({ message: "hello from expres" });
});

app.post("/add-student", async (req: Request, res: Response) => {
  const {
    name,
    placeOfBirth,
    dateOfBirth,
    class: cl,
    address,
    fathername,
    mothername,
    phone,
    program,
  } = req.body;

  const result = await prisma.student.create({
    data: {
      name,
      placeOfBirth,
      dateOfBirth,
      class: cl,
      address,
      fathername,
      mothername,
      phone,
      program,
    },
  });

  res.status(200).json(result);
});

app.get("/students", async (_req: Request, res: Response) => {
  const students = await prisma.student.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  res.status(200).json(students);
});

app.get("/student/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const student = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(student);
});

app.delete("/student-delete", async (req: Request, res: Response) => {
  const { id } = req.body;

  const deleteStudent = await prisma.student.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({ deleteStudent });
});

export default app;
