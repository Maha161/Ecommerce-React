import backgroundImg from "../../assets/images/bg22.jpg";

export default function Header() {

    // Scroll smoothly to the Featured Products section
    const scrollToFeatured = () => {
        const featuredSection = document.getElementById('featuredProducts');
        featuredSection?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll smoothly to the How It Works section
    const scrollToUse = () => {
        const UseSection = document.getElementById('howItWorks');
        UseSection?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll smoothly to the About section
    const scrollToAbout = () => {
        const UseSection = document.getElementById('about');
        UseSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
        <div className="relative overflow-hidden">

            {/* header with background image and overlay */}
            <header 
                className="h-screen w-full bg-center bg-cover bg-no-repeat relative"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${backgroundImg})`,
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center 30%'
                }}
            >
                {/* Header Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto w-full px-4">

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text text-white">
                                Elevate Your Shopping Experience
                            </span>
                        </h1>

                        {/* Decorative line */}
                        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-pop-400 to-transparent mx-auto mb-6 sm:mb-8"></div>

                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-12 leading-normal sm:leading-relaxed">
                            Discover premium products and exclusive brands with our innovative platform designed for modern shoppers.
                        </p>

                        {/* Buttons to navigate to different sections */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">

                            {/* Button to scroll to Featured Products section */}
                            <button
                                onClick={scrollToFeatured}
                                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-gradient-to-r from-pop-500 to-pop-600 hover:from-pop-600 hover:to-pop-700 text-white rounded-full font-medium transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                <span>Explore Products</span>
                                <i className="fa-solid fa-arrow-right text-sm"></i>
                            </button>

                            {/* Button to scroll to How It Works section */}
                            <button
                                onClick={scrollToUse}
                                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 outline-none bg-transparent border-2 border-white/50 hover:border-white text-white hover:bg-white/10 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                <span>How It Works</span>
                                <i className="fa-solid fa-circle-info"></i>
                            </button>
                        </div>
                    </div>

                    {/* Scroll down indicator */}
                    <div 
                        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        onClick={scrollToAbout}
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-xl border-2 border-white/50 flex justify-center pt-1 sm:pt-2 hover:border-white transition-all">
                                <div className="w-1 h-2 sm:h-3 bg-white rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        </>
    );
}
