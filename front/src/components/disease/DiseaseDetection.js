import { useState } from "react";

function DiseaseDetection() {
  const [file, setFile] = useState(null);

  return (
    <div className="main">
      <h1>🌱 Crop Disease</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      {file && <p>{file.name}</p>}
    </div>
  );
}

export default DiseaseDetection;