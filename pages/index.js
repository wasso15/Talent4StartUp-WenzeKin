import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { bannerQuery, productQuery } from "@/lib/Query";
import client from "@/lib/client";
import BannerHero from "@/components/BannerHero";
import Title from "@/components/Title";
import Product from "@/components/Product";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import HowItWorks from "@/components/HowItWorks";
import SliderCards from "@/components/SliderCards";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ productData, bannerData }) {
  const banner = bannerData[0];
  return (
    <>
      <Head>
        <title>WenzeKin-Le marché local a votre portée</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <BannerHero data={banner} />
      </header>
      <main className="">
        <div className=" flex flex-row items-center w-[90%] my-10 mx-auto">
          
          <SliderCards productData={productData}>Le plus populaire</SliderCards>
          
        </div>

        <div className=" w-[80%]  mx-auto py-5">
            <Title>Nos produits</Title>
            <div className=" flex flex-row items-center space-x-5 mt-6">
              <div className="m-auto  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {productData.map((item) => (
                  <Product data={item} key={item._id} />
                ))}
              </div>
            </div>
          </div>
      </main>
      <HowItWorks/>
    </>
  );
}

export const getServerSideProps = async () => {
  const productData = await client.fetch(productQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productData, bannerData },
  };
};
