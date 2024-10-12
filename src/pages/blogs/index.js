import React from "react";
import Head from "next/head";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import eventSearchImage from "../../../public/images/eventSearchImage.png";
import eventSearchStaticImage from "../../../public/images/eventSearchStaticImage.png";
import eventSearchiOSImage from "../../../public/images/eventSearchiOSImage.png";

import { motion } from "framer-motion";

const FramerImage = motion(Image);
const blogs = [
  { id: "1", title: "First Blog", slug: "first-blog" },
  { id: "2", title: "Second Blog", slug: "second-blog" },
  // Add more blogs here
];
export const FeaturedProject = ({
  publishedOn,
  title,
  summary,
  link = "/",
  liveLink,
}) => {
  return (
    <article
      className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid
     border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <div className="w-full flex flex-col items-center justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
          {publishedOn}
        </span>
        <Link href={liveLink} className="hover:underline underline-offset-2">
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm text-justify">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link
            href={link}
            className="rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </article>
  );
};

const Blogs = () => {
  return (
    <>
      {/* <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul> */}
      <Head>
        <title>Blogs by Harshith</title>
        <meta
          name="description"
          content="This page is about the Blogs written by Harshit Kumar Jain"
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="My Blogs"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                publishedOn="Published: 11 October, 2024"
                link="/blogs/web-for-all"
                title="Web Accessibility"
                liveLink="/blogs/web-for-all"
                summary="The article provides practical guidance on improving web accessibility, focusing on keyboard navigation, screen reader usability, inclusive design principles, and the careful use of ARIA, while promoting accessibility as an integral part of the development process."
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Blogs;
