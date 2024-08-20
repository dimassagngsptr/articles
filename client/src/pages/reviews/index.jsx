import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../configs/api";
import { Button } from "@material-tailwind/react";

const Reviews = () => {
  const [article, setArticle] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetailArticle = async () => {
    try {
      const res = await api.get(`/${id}`);
      setArticle(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailArticle();
  }, []);
  return (
    <section className="w-full h-screen flex flex-col items-center px-10 py-5 gap-y-10 text-justify">
      <div className="text-center">
        <h1 className="font-semibold text-4xl">{article?.title}</h1>
        <p className="text-gray-500">{article?.category}</p>
      </div>
      <p className="w-[700px]">{article?.content}</p>
      <Button className="bg-blue-500" onClick={() => navigate("/")}>
        Back
      </Button>
    </section>
  );
};
export default Reviews;
