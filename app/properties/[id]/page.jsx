"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import Image from "next/image";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("error fetching property", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !isLoading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {isLoading && <Spinner isLoading={isLoading} />}
      {!isLoading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButton property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>

          {/* <!-- Images --> */}
          <section className="bg-blue-50 p-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  {/* <Image
                    src="./images/properties/a1.jpg"
                    alt=""
                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                  /> */}
                </div>
                <div className="col-span-2">
                  {/* <Image
                    src="./images/properties/a2.jpg"
                    alt=""
                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                  /> */}
                </div>
                <div className="col-span-2">
                  {/* <Image
                    src="./images/properties/a3.jpg"
                    alt=""
                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                  /> */}
                </div>
                <div className="col-span-2">
                  {/* <Image
                    src="./images/properties/a4.jpg"
                    alt=""
                    className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                  /> */}
                </div>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
