import Head from "next/head";
import Layout from "@/components/Layout";
import profilePic from "../../public/images/homeImage.png";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import { ParticlesContainer } from "@/components/ParticlesContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Harsh Portfolio</title>
        <meta name="description" content="A portfolio describing my projects" />
      </Head>
      <main className="flex items-center text-dark w-full dark:text-light ">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div
            className="flex items-center justify-between w-full lg:flex-col rounded-br-2xl rounded-3xl border border-solid
border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light  lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
          >
            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center ">
              <AnimatedText
                text="Hi! Nice to meet you :)"
                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text=6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                I am Harshith, a graduate student majoring in Computer Science
                at University of Southern California. I also play Tennis for the
                the USC Club Tennis Team wherein I represent USC across various
                tournaments.
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  name="Resume-Link"
                  href="/Harshit_Resume_2024.pdf"
                  target={"_blank"}
                  className="flex items-center dark:bg-light dark:text-dark hover:dark:border-light hover:dark:bg-dark hover:dark:text-light bg-dark text-light p-2.5 px-6 
                  rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark md:p-2 md:px-4 md:text-base"
                >
                  Resume <LinkArrow className={"w-6 ml-1"} />
                </Link>
              </div>
            </div>
            <div className="w-1/2 md:w-full relative">
              <ParticlesContainer />
              <Image
                src={profilePic}
                alt="Harshith"
                className="w-full h-auto lg:hidden md:inline-block md:w-full rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
