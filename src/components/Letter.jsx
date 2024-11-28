import React from "react";
import { FaHeart, FaSmile, FaFrown } from "react-icons/fa";

const Letter = ({ transcript, theme, font }) => {
  const themeStyles = {
    love: {
      card: "bg-pink-100 border-pink-300",
      text: "text-pink-800",
      signature: "text-pink-700",
      decorations: (
        <>
          <FaHeart className="absolute top-2 left-2 text-pink-300 opacity-60 text-xl" />
          <FaHeart className="absolute bottom-2 right-2 text-pink-300 opacity-60 text-xl" />
        </>
      ),
    },
    happy: {
      card: "bg-green-100 border-green-300",
      text: "text-green-800",
      signature: "text-green-700",
      decorations: (
        <>
          <FaSmile className="absolute top-2 left-2 text-green-300 opacity-60 text-xl" />
          <FaSmile className="absolute bottom-2 right-2 text-green-300 opacity-60 text-xl" />
        </>
      ),
    },
    sad: {
      card: "bg-blue-100 border-blue-300",
      text: "text-blue-800",
      signature: "text-blue-700",
      decorations: (
        <>
          <FaFrown className="absolute top-2 left-2 text-blue-300 opacity-60 text-xl" />
          <FaFrown className="absolute bottom-2 right-2 text-blue-300 opacity-60 text-xl" />
        </>
      ),
    },
    default: {
      card: "bg-white border-gray-300",
      text: "text-black",
      signature: "text-black",
      decorations: null,
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.love;

  return (
    <div
      style={{ fontFamily: font }}
      className={` flex justify-center items-center py-8 min-w-max ${currentTheme.container}`}
    >
      <div
        className={`relative shadow-lg rounded-lg p-6 border w-full max-w-md ${currentTheme.card}`}
      >
        {/* Decorative Icons */}
        {currentTheme.decorations}

        {/* Letter Content */}
        <div
          className={`underline underline-offset-8 text-2xl leading-relaxed ${currentTheme.text}`}
        >
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

// import React from "react";

// const Letter = ({ transcript, theme }) => {
//   return (
//     <div className=" flex justify-center items-center py-8 min-w-max">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-full  max-w-md">
//         <div className="font-comic underline  underline-offset-8 text-2xl leading-relaxed">
//           {transcript ? (
//             transcript.split("\n").map((line, index) => (
//               <p key={index} className="mb-4 first:mt-0">
//                 {line}
//               </p>
//             ))
//           ) : (
//             <p className="text-opacity-40 text-black">
//               What do you want to tell your mom?
//             </p>
//           )}
//         </div>
//         <div className="text-right mt-8 font-cursive text-xl">
//           <p>- Your Child</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Letter;
