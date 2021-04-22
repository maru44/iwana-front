import { NextPage } from "next";
import { baseUrl } from "../helper/Helper";

const fetchTest = async () => {
  const res = await fetch(`${baseUrl}/api/test`);
  const ret = await res.json();
  console.log(ret);
  return ret;
};

const Test: NextPage = () => {
  fetchTest();

  return <div></div>;
};

export default Test;
