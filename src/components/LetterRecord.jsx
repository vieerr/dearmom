import { FaDownload, FaTrash } from "react-icons/fa";

const LetterRecord = ({letters,setLetters}) => {
	
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
			<div className="p-3">
				<ul className="space-y-7 max-h-62 p-2">
					{letters.length === 0 ? (
						<p className="text-center font-light">No letters were sended yet</p>
					) : (
						letters.map((letter, index) => (
						<li key={index} className="capitalize p-2 shadow-md text-white border-2 border-gray-300 rounded-md justify-between items-center">
							<h2>Letter sent on: {letter.sendedDate}</h2>
							<p>To: {letter.name}</p>
							<p>Phone: {letter.phone}</p>
							<img className="pl-4 pr-4" src={letter.content} alt="" />
							<button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this contact?")) {
                    setLetters(
                      letters.filter((letter) => letter !== letters[index])
                    );
                  }
                }}
                className="btn btn-square border-red-600 mr-2 w-28 bg-red-500 text-white hover:bg-red-700"
              >
                <FaTrash size={14} className="inline-block"/> DELETE
              </button>
							<button
								className="btn btn-square border-blue-600 mr-2 w-28 bg-blue-500 text-white hover:bg-blue-700"
								onClick={() => saveAsImage(letter.content)}
							>
								<FaDownload size={14} /> SAVE
							</button>
						</li>
					  ))
				  )}
				</ul>
			</div>
		</>
	);
};

export default LetterRecord;