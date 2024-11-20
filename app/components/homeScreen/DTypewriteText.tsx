"use client";

import {useEffect, useState} from "react";

interface TypewriterProps {
  text: string;
}

const Typewriter = ({text}: TypewriterProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return (
    <span>
      {currentText} {currentIndex != text.length && "|"}
    </span>
  );
};

export default Typewriter;
