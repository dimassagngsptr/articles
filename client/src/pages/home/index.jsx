import {
  Card,
  Typography,
  Button,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import Header from "../../components/Header";
import Body from "../../components/Body";
import { useEffect, useState } from "react";
import { api } from "../../configs/api";
import { useSearchParams } from "react-router-dom";

function Home() {
  const TABS = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Publish",
      value: "Publish",
    },
    {
      label: "Draft",
      value: "Draft",
    },
    {
      label: "Trash",
      value: "Trash",
    },
  ];
  const TABLE_HEAD = ["Title", "Content", "Category", "Status", "", ""];
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const limit = searchParams.get("limit");
  const [posts, setPosts] = useState();
  const [totalPage, setTotalPage] = useState(null);
  const [keywords, setKeywords] = useState("");

  const params = Object.fromEntries([...searchParams]);

  const handleStatus = (status) => {
    setSearchParams({ ...params, status: status });
  };

  const handleSearch = () => {
    setSearchParams({ ...params, search: keywords });
  };
  const handleLimit = (limit) => {
    setSearchParams({ ...params, limit: limit });
  };
  const handleNextPage = () => {
    setSearchParams({ ...params, page: parseInt(page) + 1 });
  };
  const handlePrevPage = () => {
    setSearchParams({ ...params, page: parseInt(page) - 1 });
  };
  const getAllPost = async () => {
    try {
      const res = await api.get("/", {
        params: {
          search,
          status,
          page,
          limit,
        },
      });
      setPosts(res?.data?.data);
      setTotalPage(res?.data?.totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, [search, status, limit, page]);
  return (
    <div className="p-5">
      <Card className="h-full w-full">
        <Header
          TABS={TABS}
          handleStatus={handleStatus}
          keywords={keywords}
          setKeywords={setKeywords}
          handleSearch={handleSearch}
          getAllPost={getAllPost}
        />
        <Body TABLE_HEAD={TABLE_HEAD} posts={posts} getAllPost={getAllPost} />
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page {page} of {totalPage}
          </Typography>
          <div>
            <Select label="Limit data" onChange={(val) => handleLimit(val)}>
              <Option value={3}>3</Option>
              <Option value={5}>5</Option>
              <Option value={10}>10</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              size="sm"
              onClick={handlePrevPage}
              disabled={page <= 1}
            >
              Previous
            </Button>

            <Button
              variant="outlined"
              size="sm"
              onClick={handleNextPage}
              disabled={page >= totalPage}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Home;
