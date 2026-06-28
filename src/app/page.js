import Image from "next/image";
import Banner from "./component/Banner";
import TopDoc from "./component/home/topdoc";
import Specializations from "./component/home/special";

export default function Home() {
  return (
   <>
   <Banner></Banner>
   <TopDoc></TopDoc>
   <Specializations></Specializations>
   </>
  );
}
