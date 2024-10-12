import AnimatedText from "@/components/AnimatedText";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import profilePic from "../../public/images/aboutImage.jpg";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Skill from "@/components/Skill";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import { ParticlesContainer } from "@/components/ParticlesContainer";



const about = () => {
  return (
    <>
      <Head>
        <title>About Harshith</title>
        <meta
          name="description"
          content="This page is about the History of Harshit Kumar Jain"
        />
      </Head>
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <div
            className="flex flex-col items-center justify-between w-full lg:flex-col rounded-br-2xl rounded-3xl border border-solid
border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light  lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
          >
            <AnimatedText
              text="About Me"
              className="mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
            />
            <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
              <div className="col-span-12 relative flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
                <ParticlesContainer />

                <p className="font-medium text-justify">
                  Hi, I am Harshith, a Computer Science grad student at USC with
                  a 4.0 GPA. I am skilled in C++, Python, Java, JavaScript, and
                  web development frameworks like Angular, Node.js, and
                  Express.js. I have experience with MySQL, MongoDB, DynamoDB,
                  and cloud platforms like Google Cloud and AWS.
                </p>
                <p className="my-4 font-medium text-justify">
                  Currently a Teaching Assistant at USC, teaching Java to over
                  300 students. Previously a Software Engineer at Shantilal and
                  Company for 5+ years, leading full-stack web development,
                  optimizing performance, integrating APIs, building RESTful
                  services, implementing tests, and adopting Agile. Known for
                  improving efficiency and user satisfaction.
                </p>
                <p className="font-medium text-justify">
                  Beyond academics, I am a competitive tennis player for USC and
                  the Deputy Director of Publicity for the Association of Indian
                  Students. I have leadership experience in event planning and
                  am eager to use my skills to innovate and advance my software
                  engineering career.
                </p>
              </div>
              {/* <div
                className="col-span-3 relative h-max  bg-light p-8 dark:bg-dark dark:border-light
            xl:col-span-4 md:order-1 md:col-span-8"
              >
                <Image
                  src={profilePic}
                  alt="Harshith"
                  className="w-full h-auto rounder-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div> */}
            </div>
          </div>

          <Skill />

          <Experience />

          <Education />
        </Layout>
      </main>
    </>
  );
};

export default about;
