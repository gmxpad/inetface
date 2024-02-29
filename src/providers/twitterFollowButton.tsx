import React, { useEffect } from "react";

const TwitterFollowButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <a
        href="https://twitter.com/gmxpad?ref_src=twsrc%5Etfw"
        className="twitter-follow-button"
        data-size="large"
        data-show-screen-name="false"
        data-show-count="false">
        Follow @gmxpad
      </a>
    </>
  );
};

export default TwitterFollowButton;
