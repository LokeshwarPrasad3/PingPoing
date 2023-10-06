import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>

    <div className="text-white font-overpass">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <figure className="errimg bg-white px-10 py-5 rounded-md m-1 shadow-md shadow-green-500">
            <img src="./Images/404.png" alt="ErrorImage" className="w-64 rounded-md" />
          </figure>
          <h1 className="text-xl text-gray-100 font-bold mt-5 mb-2">
            Sorry, the page you were looking for does not exist.
          </h1>
          <div className="flex justify-center items-center">
            <Link to="/auth" className="text-white">
              HOME
            </Link>
            <HomeIcon className="m-1 text-red-500 relative top-[-3px] flex justify-center items-center" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ErrorPage;
