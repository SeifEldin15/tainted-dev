import Link from 'next/link'

export default function Contact() {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-8 border border-gray-200 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#00D4E1]/10">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 7L12 13L4 7M5 18H19C19.5523 18 20 17.5523 20 17V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18Z" 
                stroke="#00D4E1" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Custom Made Plan</h3>
            <p className="text-gray-600 mb-4">
              EclipseProxy can cater to your specific needs! Terabytes of bandwidth, thousands of threads, or months long plans! We can offer bulk pricing and more, contact us at any time!
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-[#00D4E1] text-white px-4 py-2 rounded-lg hover:bg-[#00D4E1]/90 transition-colors"
            >
              Contact Us
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
