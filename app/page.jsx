import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" type="image/x-icon" />
      </Head>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
