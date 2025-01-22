import React from 'react';

const About = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why 2000+ clients choose CatProxies
      </h2>

      {/* Integrity Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Integrity</h3>
          <p className="text-gray-600 mb-4">
            We prioritize quality over quantity in every proxy we offer. Our commitment to excellence is not just a promise, it's a reflection of our genuine care for our customers.
          </p>
          <button className="bg-gradient-to-r from-[#00D4E1] to-[#00D7E4] text-white px-6 py-2 rounded-md hover:opacity-90 w-48">
            Contact Us Now
          </button>
        </div>
        <div className="h-64 rounded-lg overflow-hidden">
          <img 
            src="/security.jpg" 
            alt="Security illustration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Privacy Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
        <div className="md:order-2 max-w-md md:ml-auto">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Privacy</h3>
          <p className="text-gray-600 mb-4">
            With our strict no-log policy, your usage remains completely private and untracked. Your online activities are your business, and we respect that.
          </p>
          <button className="bg-gradient-to-r from-[#00D4E1] to-[#00DCE9] text-white px-6 py-2 rounded-md hover:opacity-90 w-48">
            Contact Us Now
          </button>
        </div>
        <div className="h-64 rounded-lg overflow-hidden md:order-1">
          <img 
            src="/server.jpg" 
            alt="Server infrastructure" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Cat Care Support Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">Cat Care Support</h3>
          <p className="text-gray-600 mb-4">
            Our dedicated team is here to address your questions and requests every day, even on holidays. Not only that, but we are donating a part of our profit every month to animal shelters.
          </p>
          <button className="bg-gradient-to-r from-[#00D4E1] to-[#00DCE9] text-white px-6 py-2 rounded-md hover:opacity-90 w-48">
            Contact Us Now
          </button>
        </div>
        <div className="h-64 rounded-lg overflow-hidden">
          <img 
            src="/network.jpg" 
            alt="Network infrastructure" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
