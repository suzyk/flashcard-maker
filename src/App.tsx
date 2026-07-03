import { useState } from "react";
import Button from "./components/ui/Button";

function App() {
  type Flashcard = {
    id: string;
    image: File;
    vocab: string;
  };

  const [cardType, setCardType] = useState<string>("imageCard");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardType(event.target.value);
  };

  const handleMakeFlashcard = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("button clicked");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //setImages(Array.from(e.target.files));
      const newCards = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        image: file,
        vocab: "",
      }));

      setFlashcards((prev) => [...prev, ...newCards]);
    }
  };

  const handleRemove = (cardIdToRemove: string) => {
    //setImages((prev) => prev.filter((image) => image !== imagetoRemove));
    setFlashcards((prev) => prev.filter((card) => card.id !== cardIdToRemove));
  };

  return (
    <div className="min-h-screen">
      <h1 className="p-10 text-4xl bg-indigo-400 font-bold text-white">
        Flashcard Maker
      </h1>
      <div className="w-full">
        <div className="flex gap-5 p-5">
          <h3 className="text-xl text-indigo-500">Choose a template : </h3>
          <select
            className="text-gray-500"
            value={cardType}
            onChange={handleCardChange}
          >
            <option value="imageCard">Front Image Back Text</option>
            <option value="imageTextCard">Front Image/Text</option>
          </select>
        </div>

        {/** Add Images and Text */}
        <div className="flex flex-col p-5">
          <h3 className="text-xl text-indigo-500">Add image and text : </h3>
          {/* Hidden real input */}
          <input
            id="image-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Custom upload area */}
          <div>
            <label
              htmlFor="image-upload"
              className=" flex flex-col items-center justify-center mt-3.5 mb-5
                        max-w-full h-40 border-2 border-dashed border-indigo-300 
                        rounded-2xl cursor-pointer hover:border-indigo-500 
                        hover:bg-indigo-50 transition"
            >
              <p className="text-lg font-medium text-gray-700">
                Click to upload
              </p>

              <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP</p>
            </label>
          </div>
          {/** Images grid */}
          <ul className="flex flex-wrap gap-4">
            {flashcards.map((card, index) => (
              <li key={index} className="max-w-48 m-3.5">
                <img
                  src={URL.createObjectURL(card.image)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-2xl"
                />
                <div className="flex-col justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">
                    {card.image.name}
                  </p>

                  <Button
                    variant="danger"
                    onClick={() => handleRemove(card.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/** Make Flahscards button */}
        <div className="flex justify-center m-2.5">
          <button
            className="bg-indigo-500 rounded-4xl p-3.5 w-2xs text-white font-medium hover:bg-indigo-600"
            onClick={handleMakeFlashcard}
          >
            Make Flashcards
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
