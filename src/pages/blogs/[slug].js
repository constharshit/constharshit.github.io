// pages/blogs/[slug].js
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";

// Blog post data with JSX content
const blogData = {
  "web-for-all": {
    title: "Best Practices for Web Accessibility",
    content: (
      <div className="text-justify">
        <p>
          When visiting a website, one of the first things I check is whether I
          can navigate using only the keyboard. Tab navigation is a critical
          part of accessibility, and it&apos;s essential that users can easily
          move through interactive elements such as links, buttons, and forms
          without relying on a mouse. As I navigate via the keyboard, I also
          ensure that there&apos;s a clear, visible indicator showing where I am
          on the page—whether that&apos;s through highlighting, underlining, or
          another visual cue. This small but crucial feature significantly
          enhances the experience for keyboard users, especially those with
          mobility impairments or visual disabilities.
        </p>
        <p>
          Another key step is disabling CSS (Cascading Style Sheets) to
          determine whether the site remains meaningful and navigable when
          stripped of its visual design. This tests how well-structured the
          site&apos;s HTML is, ensuring that it conveys information logically
          without relying purely on styles. After this, I run through the site
          with a screen reader—both with CSS enabled and disabled—to ensure the
          content makes sense in all scenarios. Screen readers provide valuable
          insight into how well the site is experienced by visually impaired
          users.
        </p>

        <h2 className="font-semibold text-xl lg:text-md w-full mt-2">
          Accessibility Starts with the Right Mindset
        </h2>
        <p>
          Accessibility isn&apos;t just about testing at the end of development.
          It needs to be woven into the entire process from the start. Too
          often, accessibility is treated as an afterthought—something bolted on
          after the core components are built. This approach needs to change.
        </p>
        <p>
          Every component should be built with the idea that people of all
          abilities deserve a great experience. It&apos;s not just about
          accommodating disabilities but recognizing that everyone has different
          abilities and ways of interacting with technology. Personally, I
          prefer not to use the term &quot;disability&quot;, as I believe that
          all of us are &quot;differently abled&quot;—each with our own
          strengths and challenges. Shifting our mindset toward inclusivity
          helps us build components that serve everyone better.
        </p>

        <h2 className="font-semibold text-xl lg:text-md w-full mt-2">
          Tools and Resources for Accessibility
        </h2>
        <p>
          When building accessible components, two key resources I often
          reference are Deque University and the WCAG 2.2 guidelines. These
          provide comprehensive, practical insights into how to make digital
          content accessible to all. The Web Content Accessibility Guidelines
          (WCAG) are particularly valuable as they break down accessibility into
          levels (A, AA, and AAA), allowing developers to progressively improve
          accessibility depending on their project&apos;s needs.
        </p>

        <h2 className="font-semibold text-xl lg:text-md w-full mt-2">
          ARIA: Use with Care
        </h2>
        <p>
          Another essential consideration is how and when to use ARIA
          (Accessible Rich Internet Applications). While ARIA can be an
          effective tool for enhancing accessibility, it should be used
          sparingly. Whenever possible, it&apos;s best to rely on native HTML
          elements, as these come with built-in accessibility. ARIA should be
          reserved for situations where there&apos;s no natural way to make a
          component accessible through standard HTML. Overusing ARIA can lead to
          more complexity and potential issues with screen readers, so it&apos;s
          vital to strike a balance.
        </p>

        <h2 className="font-semibold text-xl lg:text-md w-full mt-2">
          Accessibility as a Natural Practice
        </h2>
        <p>
          Accessibility is not something to be &quot;overdone&quot; or
          &quot;underdone&quot;—it should simply be part of how we build
          websites. It’s not an add-on but rather a fundamental practice
          integrated into the development process. By making accessibility a
          natural part of writing code and designing interfaces, we create
          digital experiences that are more inclusive, functional, and enjoyable
          for everyone.
        </p>

        <p className="mt-2">
          <strong>Acknowledgment</strong>
        </p>
        <p>
          I would like to extend my gratitude to my manager, Song, from whom I
          have learned so much about accessibility and its importance in web
          development. Their guidance has greatly influenced my understanding
          and practice of creating inclusive digital experiences.
        </p>
        <p className="text-right">
          <em>
            - <strong>Harshit Kumar Jain</strong>
            <br />
            Software Engineer
          </em>
        </p>
      </div>
    ),
  },
};

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const blog = blogData[slug];
  // If fallback is true, this will show a loading state while the static page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta
          name="description"
          content={`This page is a ${blog.title} written by Harshit Kumar Jain`}
        />
      </Head>
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <article
                className="w-full flex items-center justify-between relative 
      bg-light p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
              >
                <div className="w-full flex flex-col items-center justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
                  <AnimatedText
                    text={blog.title}
                    className="mb-16 !text-4xl lg:!text-2xl"
                  />
                  {blog.content}
                </div>
              </article>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

// Use getStaticPaths to tell Next.js which pages to generate at build time
export async function getStaticPaths() {
  // Generate paths for all blog posts
  const paths = Object.keys(blogData).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Only allow pre-defined paths, others will return 404
  };
}

// Use getStaticProps but avoid returning the content as a prop
export async function getStaticProps({ params }) {
  // Since the content is already in the component, just pass the slug
  const { slug } = params;

  // Return the slug so it can be used in the component to select the blog post
  return {
    props: {
      slug,
    },
  };
}

export default BlogPost;
