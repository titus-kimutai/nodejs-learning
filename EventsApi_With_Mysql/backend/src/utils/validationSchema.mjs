import { checkSchema } from "express-validator";

export const eventValidatorSchema = {
  imageUrl: {
    in: ["body"],
    isString: {
      errorMessage: "Image must be a string",
    },
    notEmpty: {
      errorMessage: "Image is required",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title must be a string",
    },
    notEmpty: {
      errorMessage: "Title is required",
    },
  },
  price: {
    in: ["body"],
    notEmpty: {
      errorMessage: "price is required",
    },
  },
  date: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Date is required",
    },
  },
  location: {
    in: ["body"],
    isString: {
      errorMessage: "Location must be a string",
    },
    notEmpty: {
      errorMessage: "Location is required",
    },
  },
  company: {
    in: ["body"],
    isString: {
      errorMessage: "Company must be a string",
    },
    notEmpty: {
      errorMessage: "Company is required",
    },
  },
};

export const eventValidator = checkSchema(eventValidatorSchema);
