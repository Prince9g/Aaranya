import React, { useState } from "react";

const spots = [
  {
    name: "Jonha Falls",
    description: "A stunning waterfall near Ranchi, surrounded by forests.",
    iframe: `https://www.google.com/maps/embed?pb=!4v1758385527330!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGQ3TUtDWkE.!2m2!1d23.34230689656271!2d85.61020548630665!3f24.382873038430915!4f-14.267815535078384!5f0.7820865974627469`,
    image: "https://seawatersports.com/images/places/jonha-falls.jpg",
  },
  {
    name: "Hundru Falls",
    description: "One of the highest waterfalls in Ranchi, a popular tourist attraction.",
    iframe: `https://www.google.com/maps/embed?pb=!4v1758386385476!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0d0Y3EydGdF!2m2!1d23.45083915561068!2d85.66679860839929!3f35.80873866899299!4f2.473565775799244!5f0.7820865974627469`,
    image: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/08/c8c8f808d4222d9ab8ba5201d0b7ed74_1000x1000.jpg",
  },
  {
    name: "Betla National Park",
    description: "A wildlife-rich national park with tigers, elephants, and historic forts nestled in dense forests.",
    iframe: `https://www.google.com/maps/embed?pb=!4v1758386689860!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRGtrdDJRakFF!2m2!1d23.88564861822536!2d84.19239820922668!3f335.525927345719!4f7.33692877930126!5f0.7820865974627469`,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRioO8-GRFuWMoa5KadrPxEEvs1kR_AUcxvhw&s",
  },
  {
    name: "Netarhat Hill Station",
    description: "A serene hill station called the “Queen of Chotanagpur,” famous for stunning sunrise and sunset views.",
    iframe: `https://www.google.com/maps/embed?pb=!4v1758386905283!6m8!1m7!1sol88HTIJ95LQu19bJoLnRw!2m2!1d23.48314215373052!2d84.26101454743167!3f72.53620695037355!4f-2.4552746624896713!5f0.7820865974627469`,
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/20130020/netarhat-1.jpeg",
  },
  // Add more places here...
];

const Tour360List: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpots = spots.filter(
    (spot) =>
      spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#003459] mb-6">
          Explore Jharkhand in 360°
        </h2>

        {/* 🔍 Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search tourist spot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A6A6]"
          />
        </div>

        {filteredSpots.length === 0 ? (
          <p className="text-gray-600">No spots found for "{searchTerm}"</p>
        ) : (
          <div className="grid gap-10">
            {filteredSpots.map((spot, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  {/* Left side image */}
                  <div className="relative">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">
                        {spot.name}
                      </h3>
                      <p className="text-sm text-gray-200">{spot.description}</p>
                    </div>
                  </div>

                  {/* Right side iframe */}
                  <div className="p-4 flex flex-col items-center justify-center">
                    <iframe
                      src={spot.iframe}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                    <p className="mt-3 text-gray-600 text-sm">
                      Drag inside the view to look around!
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tour360List;
