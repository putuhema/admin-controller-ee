-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fathername" TEXT NOT NULL,
    "mothername" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "program" TEXT NOT NULL
);
