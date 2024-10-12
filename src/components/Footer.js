import Link from "next/link";
import React from "react";
import Layout from "./Layout";
import { LinkedInIcon } from './Icons'
import { motion } from "framer-motion";


const Footer = () => {
  return (
    <footer className="w-full  border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base ">
      <Layout className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <div className="flex items-center gap-2">
          {/* <span className="text-primary dark:text-primaryDark text-2xl px-1">
            &hearts;
          </span>
          by&nbsp; */}
          <Link
            href="https://www.linkedin.com/in/harshitkumarjain/"
            target={"_blank"}
            className="underline underline-offset-2"
          >
            Let's connect on LinkedIn
          </Link>
          <motion.a
            href="https://www.linkedin.com/in/harshitkumarjain/"
            target={"_blank"}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mr-3"
          >
            <LinkedInIcon />
          </motion.a>
        </div>

        <Link href="/contact" className="underline underline-offset-2">
          Say Hello!
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
