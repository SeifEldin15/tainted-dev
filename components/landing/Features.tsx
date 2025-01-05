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
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <span className="text-[#00EBFA] flex items-center justify-center gap-2 mb-1">
            <Moon className="h-5 w-5" />
            <span className="text-base">Eclipse Features</span>
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white">Our Features</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg transition-colors ${
                index === 1 ? 'bg-[#00EBFA]' : ''
              }`}
            >
              <div className={`mb-2 ${index === 1 ? 'text-black' : 'text-white'}`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${index === 1 ? 'text-black' : 'text-white'}`}>
                {feature.title}
              </h3>
              <p className={`text-base ${index === 1 ? 'text-black' : 'text-zinc-400'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
