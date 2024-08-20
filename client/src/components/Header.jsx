import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  CardHeader,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import Popup from "./Pupop";
import { useFormik } from "formik";
import { api } from "../configs/api";
import { addArticleSchema } from "../utils/validation";
const Header = ({
  TABS,
  handleStatus,
  handleSearch,
  keywords,
  setKeywords,
  getAllPost,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleFormSubmit = (status) => {
    formik.setFieldValue("status", status);
    formik.handleSubmit();
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
        const res = await api.post("/", values);
        console.log(res);
        handleOpen();
        getAllPost();
         formik.resetForm();
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Article list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all article
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="flex items-center gap-3"
            size="sm"
            onClick={handleOpen}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> Add article
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleStatus(value)}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            type="search"
            value={keywords}
            onChange={(e) => setKeywords(e?.target?.value)}
            icon={
              <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" onClick={handleSearch} />
            }
          />
        </div>
      </div>
      <Popup
        draft
        btnTitle={"Publish"}
        handleOpen={handleOpen}
        open={open}
        popupTitle={"Add new article"}
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
    </CardHeader>
  );
};
export default Header;
