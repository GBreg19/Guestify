import Social from "@/components/social";

const Footer = () => {
  return (
    <>
      <div className="bg-indigo-600">
        <Social className="flex justify-center py-7 gap-2" />
      </div>
      <div className="bg-indigo-700 flex justify-center py-3">
        <p className="text-white font-Noto-LightIta">
          {" "}
          &copy; <em id="date">2023</em> Copyright - Giorgi Bregvadze
        </p>
      </div>
    </>
  );
};

export default Footer;
