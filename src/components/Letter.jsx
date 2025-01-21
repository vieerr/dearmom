import React from "react";
import { getUserLocationAndDate } from "../utils/LetterInfo";
import { useEffect } from "react";
import { useState } from "react";
import themeStyles from "../utils/themeStyles.jsx";

const Letter = ({ transcript, theme, font, letterRef, parent }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const currentTheme = themeStyles[theme] || themeStyles.love;

  useEffect(() => {
    getUserLocationAndDate().then(setLocation).catch(setError);
  }, []);

  return (
    <div
      ref={letterRef}
      style={{ fontFamily: font }}
      className={` flex justify-center items-center md:py-8 md:min-w-max ${currentTheme.container}`}
    >
      <div
        className={`shadow-lg rounded-lg p-6 border md:w-full md:max-w-md ${currentTheme.card}`}
      >
        {currentTheme.decorations}

        {location && (
          <p className="font-light text-sm text-gray-400">
            {location?.city}, {location?.day} {location?.month} {location?.year}
          </p>
        )}
        <div
          className={`underline underline-offset-8 text-2xl leading-relaxed ${currentTheme.text}`}
        >
          <p className="text-red-400 2">Dear {parent},</p>
          {transcript ? (
            transcript.split("\n").map((line, index) => (
              <p key={index} className="mb-4 first:mt-0">
                {line}
              </p>
            ))
          ) : (
            <p className="text-opacity-40">
              What do you want to tell your mom?
            </p>
          )}
        </div>

        {/* Signature */}
        <div className={`text-right mt-8 text-xl ${currentTheme.signature}`}>
          <p>- Your Child</p>
        </div>
      </div>
    </div>
  );
};

export default Letter;
