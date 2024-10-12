import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Form from "@/components/Form";
import AnimatedText from "@/components/AnimatedText";

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact Harshith</title>
        <meta
          name="description"
          content="This page is to contact Harshit Kumar Jain"
        />
      </Head>
      <main className="flex items-center text-dark w-full justify-center dark:text-light">
        <Layout className="pt-16">
          <article
            className="w-full flex flex-col items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid
border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
          >
            <AnimatedText
              text="Get in Touch!"
              className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
            />
            <Form />
          </article>
        </Layout>
      </main>
    </>
  );
};

export default contact;

<article
  className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid
border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
>
  <div className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-[100%] xs:rounded-[1.5rem]" />
  <AnimatedText
    text="Get in Touch!"
    className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
  />
  <Form />
</article>;
