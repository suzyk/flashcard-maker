import { useState } from "react";
import Button from "./components/ui/Button";
import { jsPDF } from "jspdf";

function App() {
  type Flashcard = {
    id: string;
    image: File;
    vocab: string;
  };

  // union type
  //type CardType = "image" | "imageTextBack" | "imageTextFront";

  // as const makes the items in array as readonly values that are visible everywhere
  const CARD_TYPES = ["image", "imageTextBack", "imageTextFront"] as const;
  // takes the content of this const as type
  type CardType = (typeof CARD_TYPES)[number];

  const [cardType, setCardType] = useState<CardType>("image");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const handleCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardType(event.target.value as CardType);
  };

  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
      // start the process
      fileReader.readAsDataURL(file);
    });

  const handleMakeFlashcard = async (
    _event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const cardWidth = pdfWidth / 2 - 10;
    const cardHeight = pdfHeight / 4 - 10;

    // foreach is not safe for "await"
    // for (const card of flashcards) => also SAFE : sequential, waits properly
    for (let i = 0; i < flashcards.length; i++) {
      const card = flashcards[i];

      const imgData = await convertToBase64(card.image);

      // add a new page after every 4 cards
      if (i > 0 && i % 4 == 0) pdf.addPage();

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        (i % 4) * cardHeight,
        cardWidth,
        cardHeight,
      );
    }

    // Save/Download the file locally
    pdf.save("converted_images.pdf");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    //setImages(Array.from(e.target.files));
    const newCards = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      image: file,
      vocab: "",
    }));

    setFlashcards((prev) => [...prev, ...newCards]);
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
            {CARD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
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
            accept=".jpg,.jpeg,.png"
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

              <p className="text-sm text-gray-400 mt-2">PNG, JPG, JPEG</p>
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
            className="rounded-4xl p-3.5 w-2xs font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500"
            onClick={handleMakeFlashcard}
            disabled={flashcards.length === 0}
          >
            Make Flashcards
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
