import { CheckCircle, Info } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonType: string;
  isPopular: boolean;
  discountBadge?: string;
}

interface PricingSectionProps {
  badgeText?: string;
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
  bottomNoteHeading?: string;
  bottomNoteText?: string;
  disclaimer?: string;
}

const defaultPricingPlans: PricingPlan[] = [
  {
    name: "STARTER",
    price: "$1,497",
    originalPrice: "$2,097",
    description: "For solo agencies getting started.",
    features: [
      "Up to 3 active projects",
      "Dedicated project manager",
      "72-hour turnaround",
      "Email support",
      "Monthly check-in"
    ],
    buttonText: "Get Started",
    buttonType: "outline",
    isPopular: false
  },
  {
    name: "GROWTH",
    price: "$2,997",
    originalPrice: "$4,197",
    description: "For growing agencies.",
    features: [
      "Up to 8 active projects",
      "Dedicated project manager",
      "48-hour turnaround",
      "Slack channel access",
      "Bi-weekly strategy calls"
    ],
    buttonText: "Start Growing",
    buttonType: "outline",
    isPopular: false
  },
  {
    name: "SCALE",
    price: "$5,497",
    originalPrice: "$7,697",
    description: "For scaling agencies.",
    features: [
      "Up to 20 active projects",
      "Priority turnaround (24hr)",
      "Weekly strategy calls",
      "Custom brand portal",
      "Dedicated design & dev team"
    ],
    buttonText: "Scale Your Agency",
    buttonType: "solid",
    isPopular: true
  },
  {
    name: "ENTERPRISE",
    price: "$9,997",
    originalPrice: "$13,997",
    description: "For high-volume agencies.",
    features: [
      "Unlimited active projects",
      "Same-day turnaround",
      "Daily standups",
      "White-glove onboarding",
      "Custom SLA & reporting"
    ],
    buttonText: "Book a Call",
    buttonType: "outline",
    isPopular: false,
    discountBadge: "Save 29%"
  }
];

export function PricingSection({
  badgeText = "FLEXIBLE PRICING",
  heading = "Simple, Transparent Pricing",
  description = "Choose the plan that fits your agency's growth stage. All plans include dedicated account management.",
  plans = defaultPricingPlans,
  bottomNoteHeading = "Limited time offer:",
  bottomNoteText = "Lock in these promotional rates forever. Standard onboarding fees waived.",
  disclaimer = "All contracts subject to strict white-label NDA protections. Custom terms available."
}: PricingSectionProps) {
  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('form-cta-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAFBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-block bg-[#EEF2FF] text-[#4F46E5] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {badgeText}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] mb-4">
            {heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            {description}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10 max-w-sm md:max-w-3xl lg:max-w-none mx-auto">
          {(plans?.length ? plans : defaultPricingPlans).map((plan, idx) => {
            const isDark = plan.isPopular;
            return (
              <div 
                key={idx} 
                className={`relative rounded-3xl p-8 flex flex-col ${
                  isDark 
                    ? 'bg-[#1E1B4B] text-white shadow-2xl lg:scale-105 z-10 border border-[#312E81]' 
                    : 'bg-white text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4F46E5] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg whitespace-nowrap">
                    MOST POPULAR
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-bold tracking-widest text-sm ${isDark ? 'text-indigo-200' : 'text-blue-700'}`}>
                    {plan.name}
                  </h3>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-blue-50 text-blue-600'}`}>
                    {plan.discountBadge || "Save 29%"}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-sm font-medium ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>
                </div>
                
                <div className="mb-6 flex items-center gap-1.5">
                  <span className={`text-sm line-through font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{plan.originalPrice}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>original price</span>
                </div>

                <p className={`text-sm mb-8 font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className={`rounded-full p-0.5 mt-0.5 shrink-0 ${isDark ? 'bg-[#4F46E5]' : 'bg-blue-50'}`}>
                        <CheckCircle className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={scrollToCTA}
                  className={`w-full cursor-pointer py-3.5 rounded-xl font-bold text-sm transition-all ${
                    plan.buttonType === 'solid'
                      ? 'bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-lg hover:shadow-indigo-500/25'
                      : 'bg-transparent border-2 border-indigo-100 text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 sm:mt-20 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <p className="text-gray-600">
              <span className="font-bold text-indigo-600">{bottomNoteHeading}</span> {bottomNoteText}
            </p>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
