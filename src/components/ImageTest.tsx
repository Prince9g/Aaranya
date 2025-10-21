import React from 'react';

const ImageTest: React.FC = () => {
  const testImages = [
    '/hundrufalls.jpg',
    '/BetlaNationalPark.jpg', 
    '/NetarhatHillstation.jpg',
    '/saree.jpg',
    '/art.jpg'
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test</h1>
      <div className="grid grid-cols-2 gap-4">
        {testImages.map((image, index) => (
          <div key={index} className="border p-4">
            <p className="mb-2">Path: {image}</p>
            <img 
              src={image} 
              alt={`Test ${index}`}
              className="w-full h-32 object-cover"
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                e.currentTarget.style.border = '2px solid red';
              }}
              onLoad={() => {
                console.log(`Successfully loaded image: ${image}`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTest;
