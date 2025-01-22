import { Zap, Shield, Hand, Wrench, Moon } from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant Delivery",
    description: "Discover the unique instant-delivery experience with EclipseProxy. Upon payment approval, expect your product to arrive swiftly within 1-2 minutes. Explore our website to elevate your experience today!"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Bandwidth Assurance",
    description: "When you purchase bandwidth from us, rest assured that 1GB means exactly that – no hidden caps or throttling, no lies, no bs."
  },
  {
    icon: <Hand className="h-6 w-6" />,
    title: "Affordable",
    description: "We believe in providing great quality at reasonable costs, allowing all users to have a positive experience at a lower cost."
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Active Support",
    description: "Our customer service representatives are available around the clock to assist you whenever you need it."
  }
]

export default function Features() {
  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-white text-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <span className="text-black flex items-center justify-center gap-2 mb-1">
            <Moon className="h-5 w-5 text-brand" />
            <span className="text-base">Eclipse Features</span>
          </span>
          <h2 className="text-4xl font-bold tracking-tight">
            Our <span className="text-brand">Features</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg shadow-[0_0_14px_rgba(0,0,0,0.21)] transition-all hover:bg-brand hover:-translate-y-1 bg-white group"
            >
              <div className="mb-2 text-brand group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 group-hover:text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
