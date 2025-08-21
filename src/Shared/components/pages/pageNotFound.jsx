const PageNotFound = () => {
    return ( 
        <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-100 p-0 box-border">
            <img src="/src/assets/404.svg" alt="404" className="w-full max-w-4xl min-w-64 h-auto mb-8 static z-10 self-center md:w-11/12 md:max-w-70 md:min-w-0 md:static md:transform-none md:mb-5 md:self-center" />
            <button className="bg-blue-600 text-white border-none rounded-lg py-3.5 px-5 text-lg font-medium cursor-pointer shadow-md transition-colors duration-200 mt-6 self-center relative z-10 block hover:bg-blue-700">
                Back to Home
            </button>
        </div>
    );
};

export default PageNotFound