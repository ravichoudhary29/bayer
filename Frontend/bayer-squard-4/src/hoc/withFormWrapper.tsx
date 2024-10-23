import Image from "next/image";
import React from "react";

interface FormProps {
  title: string;
  children?: React.ReactNode;
  isImage?: boolean;
}

const withFormWrapper = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P & FormProps) => {
    const { isImage = false, title } = props;

    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md lg:max-w-[480px]"
          style={{ maxWidth: "480px", padding: "10px" }}
        >
          {/* Image Section (Optional) */}
          {isImage && (
            <div className="items-center w-full flex justify-center">
              <Image
                className="mb-4"
                alt=""
                src={"/"} // Add the correct image path
                height={150}
                width={150}
              />
            </div>
          )}

          {/* Title Section */}
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            {title}
          </h2>

          {/* Render the passed component */}
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withFormWrapper;
