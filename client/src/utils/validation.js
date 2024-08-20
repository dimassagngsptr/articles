import * as Yup from "yup";
export const addArticleSchema = Yup.object().shape({
  title: Yup.string().min(20).required("Title is required"),
  content: Yup.string().min(200).required("Content is required"),
  category: Yup.string().required("Category is required"),
});
