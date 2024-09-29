import React from "react";
import Head from "next/head";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import eventSearchImage from "../../public/images/eventSearchImage.png";
import eventSearchStaticImage from "../../public/images/eventSearchStaticImage.png";
import eventSearchiOSImage from "../../public/images/eventSearchiOSImage.png";

import { motion } from "framer-motion";

const FramerImage = motion(Image);

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link = "/",
  liveLink,
}) => {
  return (
    <article
      className="w-full flex items-center justify-between relative rounded-br-2xl rounded-3xl border border-solid
     border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <Link
        href={liveLink}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
          {type}
        </span>
        <Link
          href={liveLink}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
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
            target="_blank"
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Projects of Harshith</title>
        <meta
          name="description"
          content="This page is about the Projects of Harshit Kumar Jain"
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="My Projects"
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                type="Full Stack Application"
                link="https://drive.google.com/file/d/1tX6EJdnitAjyxRa_8RNsL1iAfExv2LZO/view"
                img={eventSearchImage}
                title="Event Search Website"
                liveLink="https://user-381507.wl.r.appspot.com/home"
                summary="A Event Search website which has rich features right from user input to cater user requests to fetch events from Ticketmaster API, Spotify API and many others. Backend is in Node.js and front-end in Angular."
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="Full Stack Application"
                link="https://drive.google.com/file/d/1_jWS5O3D0IISfjG7HKxrBVBqZ36Mai9H/view"
                img={eventSearchStaticImage}
                title="Event Search Webpage (Static)"
                liveLink="https://trojansrock.wl.r.appspot.com/"
                summary="A Event Search website which has rich features right from user input to cater user requests to fetch events from Ticketmaster API, and many others. Backend is in Flask and front end is pure HTML, CSS and without any bootstrap."
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                type="iOS App"
                link="https://drive.google.com/file/d/11qdMBFhenGhVQ0tYVutUJ7DNUsbxwEDM/view"
                img={eventSearchiOSImage}
                title="An iOS app for Event Search"
                liveLink="https://drive.google.com/file/d/11qdMBFhenGhVQ0tYVutUJ7DNUsbxwEDM/view"
                summary="A Event Search iOS app which has rich features right from user input to cater user requests to fetch events from Ticketmaster API, Spotify API and many others. It has a backend in Node.js and the app was built using SwiftUI."
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
