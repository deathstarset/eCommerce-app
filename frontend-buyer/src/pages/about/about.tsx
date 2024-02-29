import hero from "../../assets/about/hero.jpg";
import { Info } from "./info";
import { Testimonials } from "./testimonials";
import { Button } from "@/components/ui/button";
const info = [
  {
    title: "Our Mission",
    description:
      "Our mission is to create products that enrich people's lives. We are passionate about technology and the ways it can improve our daily experiences. From smartphones to smart home devices, we strive to make each product an intuitive and seamless part of your life. Our commitment to quality, design, and innovation is evident in everything we create",
  },
  {
    title: "Our Values",
    description:
      "At our core, we believe in three values: quality, innovation, and community. Quality is the foundation of everything we do. We believe that every product should be built to last and should deliver an exceptional experience. Innovation is the spark that drives us forward. We are constantly seeking new ways to create smarter, more intuitive products. Community is the heartbeat of our brand. We value the feedback and insights of our customers, and we seek to build a community that shares our passion for technology and design.",
  },
  {
    title: "Our Products",
    description:
      "We offer a wide range of products, from smartphones to smart home devices. Our products are designed to be intuitive, seamless, and beautiful. Each product is rigorously tested to ensure it meets our high standards for quality and performance.",
  },
  {
    title: "Quality Assurance",
    description:
      "Our products are rigorously tested for quality and performance. We use premium materials and cutting-edge technology to ensure that each product is built to last. We stand behind the quality of our products, and we offer a 1-year warranty on all products",
  },
  {
    title: "Customer Service",
    description:
      "We are committed to providing exceptional customer service. Our team is available to answer any questions you may have about our products. We offer free shipping on all orders, and we provide a 30-day money-back guarantee. If you are not satisfied with your purchase, you can return it for a full refund",
  },
  {
    title: "Our Team",
    description:
      "Our team is made up of passionate, creative individuals who are dedicated to creating the best products possible. We are driven by a shared love of technology and design, and we are committed to pushing the boundaries of what's possible. We are always seeking new talent to join our team.",
  },
  {
    title: "Sustainability",
    description:
      "We are committed to minimizing our environmental impact. Our products are designed to be energy-efficient and long-lasting. We use recycled and sustainable materials whenever possible, and we are continually seeking ways to reduce our carbon footprint. We also partner with organizations that share our commitment to sustainability.",
  },
  {
    title: "Community Engagement",
    description:
      "We believe in giving back to the community. We support local charities and organizations that are making a positive impact. We also host events and workshops to engage with our customers and share our love of technology. We are always looking for new ways to connect with our community.",
  },
];
export const About = () => {
  return (
    <div className="min-h-[86.5vh] h-auto py-4 w-[95%] mx-auto flex flex-col gap-5">
      <div
        style={{ backgroundImage: `url(${hero})` }}
        className="rounded text-white p-4 h-[50vh] bg-bottom bg-cover flex flex-col justify-end gap-5"
      >
        <h1 className="text-3xl font-semibold">Our Story</h1>
        <p>
          Since 2010, we've been curating the most innovative and beautifully
          designed products in the electronics industry. We take great pride in
          selecting high-quality items to offer our customers. At every step of
          the process, we aim to exceed expectations. Our goal is to make
          cutting-edge technology more accessible, more intuitive, and more
          enjoyable for everyone.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {info.map((info, index) => {
          return (
            <Info
              title={info.title}
              description={info.description}
              key={index}
            />
          );
        })}
      </div>
      <Testimonials />
      <Button className="w-fit">Explore Our Products</Button>
    </div>
  );
};
