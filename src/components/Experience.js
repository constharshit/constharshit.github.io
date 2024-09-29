import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ListIcon from "./ListIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <ListIcon  />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm text-justify">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />

        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Head Teaching Assistant"
            company="USC - Viterbi"
            companyLink="www.usc.edu"
            time="August 2023 - Present"
            address="Los Angeles, CA"
            work="Guiding a class of 310 students, in developing large-scale,
            graphical Java applications encompassing concurrency,
            animations, web integration, and database backends."
          />
          <Details
            position="Software Engineer Intern"
            company="Dottwav"
            companyLink="https://dottwav.com/"
            time="May 2023-June 2023"
            address="Los Angeles, CA"
            work="Enhanced song loading speed by 10% on Dottwav's music platform by optimizing the mobile app."
          />

          <Details
            position="Software Engineer"
            company="Shantilal & Company"
            companyLink=""
            time="May 2017-December 2022"
            address="Vijayawada, India"
            work="Engineered Angular web app, yielding 20% user engagement and 10% revenue growth in initial 6 months. Integrated front-end with Node.js back-end, achieving 25% faster response times and a 20% rise in user satisfaction. Built and deployed a Node.js-based RESTful API, slashing response times by 25% and elevating user satisfaction by 15%. Guided development team in enhancing web app performance with Angular, reaching target of 30% faster page load. Collaborated on a team to refactor codebase, reducing bug-related delays by 40% and enhancing overall code quality by 25%. Developed & executed unit/integration tests for web app, cutting bug-related delays by 30%, enhancing code quality by 15%. Led stakeholder collaboration on tech roadmap, aligning engineering with company goals for a 40% increase in team efficiency. Directed Agile framework adoption to ensure seamless, nonstop application development and optimal cross-team collaboration."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
