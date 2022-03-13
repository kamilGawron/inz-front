import React from "react";
import MainLayout from "../layouts/MainLayout";

const images = [];
for (let i = 1; i < 12; i += 1) {
  const photoName = i < 10 ? `0${i}` : i;
  const photoPath = `/build/gallery/${photoName}.jpg`;
  images.push(photoPath);
}

const Gallery = function () {
  return (
    <MainLayout>
      <div className="o-gallery flex flex-wrap justify-between mt-5">
        {images.map((image) => {
          return (
            <div
              className="o-gallery__image-wrapper"
              style={{
                background: `url(${image})`,
                minWidth: `${Math.random() * 300 + 150}px`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              key={image}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Gallery;
