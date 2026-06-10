import React, { useState } from "react";

function CropRecommendation() {

  const [season, setSeason] = useState("");
  const [soilType, setSoilType] = useState("");
  const [state, setState] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const getRecommendations = async () => {

    if (!season || !soilType || !state) {
      alert("Please select all fields");
      return;
    }

    setLoading(true);

    const prompt = `
You are an agricultural expert.

Season: ${season}
Soil Type: ${soilType}
State: ${state}

Recommend:

1. Best crops
2. Water requirement
3. Fertilizer recommendation
4. Expected yield
5. Advantages

Give the answer in a simple farmer-friendly format.
`;

    try {

      const response = await fetch(
        "http://localhost:8081/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: prompt
          })
        }
      );

      const data = await response.json();

      setResult(data.reply);

    } catch (error) {

      console.error(error);

      setResult(
        "Unable to fetch recommendations. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "30px"
      }}
    >
      <h2>
        🌱 Crop Advice
      </h2>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          marginTop: "20px"
        }}
      >

        <h3>
          🌿 Find Best Crops For Your Farm
        </h3>

        <br />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "20px"
          }}
        >

          <div>
            <label>Season</label>

            <select
              value={season}
              onChange={(e) =>
                setSeason(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px"
              }}
            >
              <option value="">Select Season</option>
<option value="Kharif">🌾 Kharif (Monsoon)</option>
<option value="Rabi">🌿 Rabi (Winter)</option>
<option value="Zaid">☀️ Zaid (Summer)</option>
<option value="All">🔄 All Seasons</option>

            </select>
          </div>

          <div>
            <label>Soil Type</label>

            <select
              value={soilType}
              onChange={(e) =>
                setSoilType(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px"
              }}
            >
              <option value="">
                Select Soil
              </option>

              <option>
                Black Soil
              </option>

              <option>
                Red Soil
              </option>

              <option>
                Sandy Soil
              </option>

              <option>
                Clay Soil
              </option>

              <option>
                Loamy Soil
              </option>

            </select>
          </div>

          <div>
            <label>State</label>

            <select
              value={state}
              onChange={(e) =>
                setState(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px"
              }}
            >
              <option value="">
                Select State
              </option>

              <option>
                Telangana
              </option>

              <option>
                Andhra Pradesh
              </option>

              <option>
                Karnataka
              </option>

              <option>
                Maharashtra
              </option>

              <option>
                Tamil Nadu
              </option>

            </select>
          </div>

        </div>

        <br />

        <button
          onClick={getRecommendations}
          style={{
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding:
              "15px 30px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          {loading
            ? "Loading..."
            : "🔍 Get Recommendations"}
        </button>

      </div>

      {result && (

        <div
          style={{
            background: "white",
            marginTop: "25px",
            padding: "25px",
            borderRadius: "15px"
          }}
        >

          <h3>
            🌾 AI Crop Recommendation
          </h3>

          <hr />

          <pre
            style={{
              whiteSpace:
                "pre-wrap",
              fontFamily:
                "inherit"
            }}
          >
            {result}
          </pre>

        </div>

      )}

    </div>
  );
}

export default CropRecommendation;