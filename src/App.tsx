import { useState } from "react";
import Button from "./components/ui/Button";

function App() {
  const [cardType, setCardType] = useState<string>("imageCard");
  //const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleCardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCardType(event.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Access the first selected file
      //console.log(e.target.files);
      //setImage(e.target.files[0]);
      setImages(Array.from(e.target.files));
    }
  };

  const doSomething = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    //do something
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
          {images.length == 0 ? (
            <div>
              <label
                htmlFor="image-upload"
                className=" flex flex-col items-center justify-center 
                        max-w-2xs h-64 border-2 border-dashed border-indigo-300 
                        rounded-2xl cursor-pointer hover:border-indigo-500 
                        hover:bg-indigo-50 transition"
              >
                <p className="text-lg font-medium text-gray-700">
                  Click to upload
                </p>

                <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP</p>
              </label>
            </div>
          ) : (
            <ul className="max-w-2xs">
              {images.map((image, index) => (
                <li key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500 truncate">
                      {image.name}
                    </p>

                    <Button variant="danger" onClick={() => doSomething}>
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
