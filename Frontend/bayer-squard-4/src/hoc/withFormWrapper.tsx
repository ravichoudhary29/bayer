import Image from "next/image";
import React from "react";
interface FormProps {
  title: string;
  children?: React.ReactNode;
  isImage?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const withFormWrapper = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P & FormProps) => {
    const { isImage = false, title } = props;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          {isImage && (
            <div className="items-center w-full flex justify-center">
              <Image
                className="mb-4"
                alt=""
                src={"/"}
                height={150}
                width={150}
              />
            </div>
          )}
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            {title}
          </h2>
          <Component {...props} />
        </div>
      </div>
    );
  };
};

export default withFormWrapper;
