import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  CardBody,
  Chip,
  IconButton,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import Popup from "./Pupop";
import { useFormik } from "formik";
import { addArticleSchema } from "../utils/validation";
import { api } from "../configs/api";
import { useNavigate } from "react-router-dom";

const Body = ({ TABLE_HEAD, posts, getAllPost }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const postId = localStorage.getItem("id");

  const handleOpen = (item) => {
    formik.setErrors({});
    localStorage.setItem("id", item.ID);
    formik.setValues({
      title: item?.title || "",
      content: item?.content || "",
      category: item?.category || "",
    });
    setOpen(!open);
  };
  const handleOpenDelete = (item) => {
    formik.setErrors({});
    localStorage.setItem("id", item.ID);
    formik.setValues({
      title: item?.title || "",
      content: item?.content || "",
      category: item?.category || "",
      status: "Trash",
    });
    setOpenDelete(!openDelete);
  };
  const handleFormSubmit = (status) => {
    formik.setFieldValue("status", status);
    formik.handleSubmit();
    setOpen(!open);
  };
  const handleDelete = () => {
    formik.handleSubmit();
    setOpenDelete(!openDelete);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
      status: "",
    },
    validationSchema: addArticleSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.put(`/${postId}`, values);
        getAllPost();
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });
  return (
    <CardBody className="overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD?.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts?.map((item, index) => {
            const isLast = index === posts?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr
                key={item?.title}
                className="hover:bg-gray-200 cursor-pointer"
              >
                <td
                  className={classes}
                  onClick={() => navigate(`/detail/${item?.ID}`)}
                >
                  <Tooltip content={item?.title}>
                    <p className="truncate max-w-[250px]">{item?.title}</p>
                  </Tooltip>
                </td>
                <td className={classes}>
                  <Tooltip content={item?.content} className="max-w-[300px]">
                    <p className="truncate max-w-[220px]">{item?.content}</p>
                  </Tooltip>
                </td>
                <td className={classes}>
                  <p className="truncate max-w-[100px]">{item?.category}</p>
                </td>
                <td className={classes}>
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={item?.status}
                      color={
                        item?.status == "Publish"
                          ? "green"
                          : item?.status == "Draft"
                          ? "blue"
                          : "red"
                      }
                    />
                  </div>
                </td>
                <td className={classes}>
                  <Tooltip content="Edit article">
                    <IconButton variant="text" onClick={() => handleOpen(item)}>
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
                <td className={classes}>
                  <Tooltip content="Move to trash">
                    <IconButton
                      variant="text"
                      onClick={() => handleOpenDelete(item)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Popup
        btnTitle={"Submit"}
        handleOpen={handleOpen}
        open={open}
        draft
        popupTitle={"Edit article"}
        btnFunc={handleFormSubmit}
      >
        <div className="px-5">
          <div className="flex flex-col gap-y-3">
            <Input
              label="Title"
              name="title"
              value={formik?.values?.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-[12px]">
                {formik.errors.title}
              </div>
            )}
            <Input
              label="Category"
              name="category"
              value={formik?.values?.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 text-[12px]">
                {formik.errors.category}
              </div>
            )}
            <Textarea
              label="Content"
              className="min-h-64"
              name="content"
              value={formik?.values?.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-[12px]">
                {formik.errors.content}
              </div>
            )}
          </div>
        </div>
      </Popup>
      <Popup
        handleOpen={handleOpenDelete}
        open={openDelete}
        btnTitle={"Move"}
        popupTitle={"Move to trash"}
        btnFunc={handleDelete}
        trash
      >
        <div className="flex justify-center items-center">
          <p>Are you sure want to move article to the trash?</p>
        </div>
      </Popup>
    </CardBody>
  );
};

export default Body;
