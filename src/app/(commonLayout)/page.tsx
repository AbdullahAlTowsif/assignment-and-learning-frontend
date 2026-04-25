import HeroSection from "@/components/modules/Landing/HeroSection";
import HowItWorks from "@/components/modules/Landing/HowItWorks";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Learning Platform</title>
        <meta
          name="description"
          content="On the Learning Platform, instructors can manage assignments and analyze performance, while students can seamlessly track their growth and progress."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <HowItWorks />
      </main>
    </>
  );
}
