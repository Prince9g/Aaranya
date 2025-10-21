// src/API.tsx
export async function generateItineraryAPI(formData: {
  duration: string;
  travelers: string;
  interests: string[];
  budget: string;
  pace: string;
}) {
  try {
    console.log("Sending request to OpenRouter API with data:", formData);
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`, // ⚠️ move this to backend later
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Jharkhand Tourism Itinerary Generator",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content: "You are a professional travel planner specializing in Jharkhand tourism. Reply ONLY with valid JSON, no extra text. Create detailed itineraries with specific activities, timings, and locations."
          },
          {
            role: "user",
            content: `Plan a ${formData.duration} trip for ${formData.travelers} travelers in Jharkhand.
              Interests: ${formData.interests.length ? formData.interests.join(", ") : "general sightseeing"}.
              Budget: ${formData.budget || "flexible"}.
              Travel pace: ${formData.pace || "balanced"}.
              Format response STRICTLY as JSON with this structure:
              [
                {
                  "day": number,
                  "title": string,
                  "activities": [
                    { "time": string, "activity": string, "location": string, "transport"?: string, "guide"?: string }
                  ]
                }
              ]`
          }
        ]
      }),
    });

    console.log("API Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response data:", data);

    // Check for API errors
    if (data.error) {
      throw new Error(`API Error: ${data.error.message || 'Unknown API error'}`);
    }

    // ✅ Handle both message.content and text
    let text =
      data.choices?.[0]?.message?.content ??
      data.choices?.[0]?.text ??
      "[]";

    console.log("Raw response text:", text);

    // ✅ Clean ```json ... ``` wrappers + trim
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // ✅ Extract only JSON part (remove extra text if AI misbehaves)
    const match = text.match(/\[.*\]/s);
    if (match) text = match[0];

    console.log("Cleaned JSON text:", text);

    const parsedItinerary = JSON.parse(text);
    console.log("Parsed itinerary:", parsedItinerary);
    
    // Validate the parsed itinerary structure
    if (!Array.isArray(parsedItinerary)) {
      throw new Error("Invalid itinerary format: Expected an array of days");
    }
    
    if (parsedItinerary.length === 0) {
      throw new Error("Empty itinerary received from API");
    }
    
    // Validate each day has required structure
    for (let i = 0; i < parsedItinerary.length; i++) {
      const day = parsedItinerary[i];
      if (!day.day || !day.title || !Array.isArray(day.activities)) {
        throw new Error(`Invalid day structure at index ${i}: Missing required fields`);
      }
    }
    
    return parsedItinerary; // structured itinerary
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse itinerary response. The API returned invalid JSON.");
    }
    
    // If it's a network error or API error, provide a fallback
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('API'))) {
      console.log("API failed, providing fallback itinerary");
      return getFallbackItinerary(formData);
    }
    
    throw error; // Re-throw to let the calling component handle it
  }
}

// Fallback itinerary in case API fails
function getFallbackItinerary(formData: any) {
  const duration = formData.duration || "3-5 days";
  const interests = formData.interests.length > 0 ? formData.interests : ["Nature & Wildlife"];
  
  console.log(`Creating fallback itinerary for ${duration} with interests: ${interests.join(", ")}`);
  
  return [
    {
      day: 1,
      title: "Arrival and Local Exploration",
      activities: [
        {
          time: "9:00 AM",
          activity: "Arrive in Ranchi",
          location: "Birsa Munda Airport, Ranchi",
          transport: "Airport pickup"
        },
        {
          time: "11:00 AM",
          activity: "Check-in and refresh",
          location: "Hotel in Ranchi",
          transport: "Hotel transfer"
        },
        {
          time: "2:00 PM",
          activity: "Visit Rock Garden",
          location: "Rock Garden, Ranchi",
          transport: "Local transport"
        },
        {
          time: "4:00 PM",
          activity: "Explore Tribal Museum",
          location: "Tribal Research Institute Museum",
          transport: "Walking"
        }
      ]
    },
    {
      day: 2,
      title: "Nature and Wildlife",
      activities: [
        {
          time: "6:00 AM",
          activity: "Early morning bird watching",
          location: "Hundru Falls area",
          transport: "Private vehicle"
        },
        {
          time: "9:00 AM",
          activity: "Visit Hundru Falls",
          location: "Hundru Falls, Ranchi",
          transport: "Private vehicle"
        },
        {
          time: "12:00 PM",
          activity: "Lunch at local restaurant",
          location: "Near Hundru Falls",
          transport: "Walking"
        },
        {
          time: "3:00 PM",
          activity: "Explore Jonha Falls",
          location: "Jonha Falls, Ranchi",
          transport: "Private vehicle"
        }
      ]
    }
  ];
}
