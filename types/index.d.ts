export type Student = {
  id: number;
  name: string;
  placeOfBirth: string;
  dateOfBirth: string;
  class: string;
  address: string;
  fathername: string;
  mothername: string;
  phone: string;
  program: string;
};

export type Program = {
  value: string;
  isCheck: boolean;
};

export type Form = {
  name?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  class?: string;
  address?: string;
  fathername?: string;
  mothername?: string;
  phone?: string;
  program?: Program[];
};

export type Calendar = {
  id: string;
  title: string;
  date: string;
  color: string;
  display?: string;
};

export type StudentProps = {
  student: Student;
};

export type Form = {
  name?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  class?: string;
  address?: string;
  fathername?: string;
  mothername?: string;
  phone?: string;
  program?: string[];
};
