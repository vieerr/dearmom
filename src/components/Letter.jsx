import React from "react";

const Letter = ({ transcript }) => {
  return (
    <div className=" flex justify-center items-center py-8 min-w-max">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-full  max-w-md">
        <div className="font-comic underline  underline-offset-8 text-2xl leading-relaxed">
          {transcript ? (
            transcript.split("\n").map((line, index) => (
              <p key={index} className="mb-4 first:mt-0">
                {line}
              </p>
            ))
          ) : (
            <p className="text-opacity-40 text-black">
              What do you want to tell your mom?
            </p>
          )}
        </div>
        <div className="text-right mt-8 font-cursive text-xl">
          <p>- Your Child</p>
        </div>
      </div>
    </div>
  );
};

export default Letter;
