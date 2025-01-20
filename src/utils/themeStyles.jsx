import { FaHeart, FaSmile, FaFrown } from "react-icons/fa";
import { FaSun, FaBook } from "react-icons/fa";
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
    beach: {
        card: "bg-yellow-100 border-yellow-300",
        text: "text-yellow-800",
        signature: "text-yellow-700",
        decorations: (
            <>
                <FaSun className="absolute top-2 left-2 text-yellow-300 opacity-60 text-xl" />
                <FaSun className="absolute bottom-2 right-2 text-yellow-300 opacity-60 text-xl" />
            </>
        ),
    },
    scholar: {
        card: "bg-gray-100 border-gray-300",
        text: "text-gray-800",
        signature: "text-gray-700",
        decorations: (
            <>
                <FaBook className="absolute top-2 left-2 text-gray-300 opacity-60 text-xl" />
                <FaBook className="absolute bottom-2 right-2 text-gray-300 opacity-60 text-xl" />
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

export default themeStyles;