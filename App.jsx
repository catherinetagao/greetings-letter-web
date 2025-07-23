import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Analytics from "./Analytics";

const icons = [
  "./img/1.png",
  "./img/2.png",
  "./img/3.png",
  "./img/4.png",
];

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [closing, setClosing] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const letterBoxRef = useRef(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((images) => setUploadedImages(images));
  };

  // Download letter as image
  const downloadLetter = () => {
    if (letterBoxRef.current) {
      html2canvas(letterBoxRef.current, { useCORS: true }).then((canvas) => {
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.download = "my-letter.png";
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 min-h-screen">
      <div className="max-w-2xl mx-auto border border-black rounded-md p-4 relative bg-white">
        {/* Title */}
        <div className="text-3xl text-center mb-4">
          <span>Loveable</span> <span>App</span>
        </div>

        {/* Draggable Icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {icons.map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="w-10 h-10"
              alt={`icon-${idx + 1}`}
              draggable={false}
              style={{ cursor: "not-allowed", opacity: 0.5 }}
            />
          ))}
        </div>

        {/* Letter Area */}
        <div
          ref={letterBoxRef}
          className="border border-black rounded-md bg-gray-100 p-4 mb-4 min-h-[300px] relative overflow-hidden"
        >
          <div className="whitespace-pre-wrap min-h-[150px] mb-2 text-lg text-black">
            {message}
          </div>
          <div className="text-right text-sm text-gray-700">
            {closing}
            <br />
            {name}
          </div>
          <div className="flex gap-2 mt-2">
            {uploadedImages.map((img, idx) => (
              <div
                key={idx}
                className="bg-white rounded shadow-lg p-2 flex flex-col items-center w-28"
              >
                <img
                  src={img}
                  alt={`uploaded-${idx}`}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <div className="text-xs text-gray-700 text-center mt-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            multiple
            className="mb-4 block"
            onChange={handleImageUpload}
          />
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Closing message (e.g., Love, From)"
            value={closing}
            onChange={(e) => setClosing(e.target.value)}
          />
          <button
            onClick={() => {}}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full"
          >
            Update Letter
          </button>
          <button
            onClick={downloadLetter}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Download as Image
          </button>
        </div>
      </div>
      <Analytics />
    </div>
  );
}

export default App;