import { FaDownload, FaTrash } from "react-icons/fa";

const LetterRecord = ({ letters, setLetters }) => {
  const saveAsImage = async (letterLink) => {
    try {
      const response = await fetch(letterLink);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "letter.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error descargando la imagen:", error);
    }
  };

  return (
<>
  <div className="p-6 bg-white rounded-lg  w-full">
    <ul className="space-y-6 mx-10 my-5 max-h-96 overflow-y-auto p-4">
      {letters.length === 0 ? (
        <p className="text-center text-gray-500 font-light text-lg">
          No letters have been sent yet.
        </p>
      ) : (
        letters.map((letter, index) => (
          <li
            key={index}
            className="capitalize p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                <span className="text-primary font-bold">Letter sent on:</span>{" "}
                {letter.sendedDate}
              </h2>
              <p className="text-gray-700">
                <span className="text-primary font-bold">To:</span> {letter.name}
              </p>
              {letter.email && (
                <p className="text-gray-700">
                  <span className="text-primary font-bold">Email:</span>{" "}
                  {letter.email}
                </p>
              )}
              <img
                className="w-full rounded-md border border-gray-200"
                src={letter.content}
                alt="Letter content"
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to delete this letter?")
                    ) {
                      setLetters(
                        letters.filter((letter) => letter !== letters[index])
                      );
                    }
                  }}
                  className="btn btn-error text-white hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash size={14} /> DELETE
                </button>
                <button
                  className="btn btn-primary text-white hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => saveAsImage(letter.content)}
                >
                  <FaDownload size={14} /> SAVE
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</>
  );
};

export default LetterRecord;
