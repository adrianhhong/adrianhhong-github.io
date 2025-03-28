const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Adrian Hong
      </h1>
      <h4 className="text-center md:text-right text-lg mt-5 md:pl-8">
        I am a software engineer.
        <br />I work at{" "}
        <a
          href="https://www.mongodb.com/"
          className="underline hover:text-blue-700 duration-200 transition-colors"
        >
          MongoDB
        </a>{" "}
        in Sydney, AUS.
      </h4>
    </section>
  );
};

export default Intro;
