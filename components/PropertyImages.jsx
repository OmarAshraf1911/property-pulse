// "use client";
import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            property="true"
            priority
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt="image properties"
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  property="true"
                  priority
                  
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertyImages;
