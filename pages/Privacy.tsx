import { CheckCircle, FileText, Shield, AlertCircle, Lock, UserCheck, Eye, ArrowLeft, ChevronRight, Mail, Database, Cookie, Globe, Bell, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  const handleBack = () => {
    window.location.hash = '/';
  };

  const tableOfContents = [
    { id: 'introduction', title: '1. Introduction', icon: <FileText className="w-4 h-4" /> },
    { id: 'information-collected', title: '2. Information We Collect', icon: <Database className="w-4 h-4" /> },
    { id: 'how-we-use', title: '3. How We Use Your Information', icon: <Eye className="w-4 h-4" /> },
    { id: 'information-sharing', title: '4. Information Sharing', icon: <Globe className="w-4 h-4" /> },
    { id: 'cookies', title: '5. Cookies & Tracking', icon: <Cookie className="w-4 h-4" /> },
    { id: 'data-security', title: '6. Data Security', icon: <Lock className="w-4 h-4" /> },
    { id: 'data-retention', title: '7. Data Retention', icon: <Database className="w-4 h-4" /> },
    { id: 'your-rights', title: '8. Your Privacy Rights', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'children', title: '9. Children\'s Privacy', icon: <Shield className="w-4 h-4" /> },
    { id: 'international', title: '10. International Transfers', icon: <Globe className="w-4 h-4" /> },
    { id: 'changes', title: '11. Changes to Privacy Policy', icon: <Bell className="w-4 h-4" /> },
    { id: 'contact', title: '12. Contact Us', icon: <Mail className="w-4 h-4" /> }
  ];

  const summary = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Data Collection',
      description: 'We collect information you provide, usage data, and technical information to improve our services.'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Data',
      description: 'Your data helps us deliver services, communicate with you, and enhance user experience.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      description: 'We use industry-standard security measures to protect your personal information.'
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      description: 'We use cookies and similar technologies to improve functionality and analyze usage.'
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Your Rights',
      description: 'You have the right to access, correct, delete, or export your personal data.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Third-Party Sharing',
      description: 'We share data only with trusted service providers and as required by law.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background gradient blurs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[60px] opacity-28 -translate-y-20 translate-x-20" />
        <div className="absolute top-[354px] left-10 w-[546px] h-[546px] bg-green-400/5 rounded-full blur-[45px]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-block backdrop-blur-md bg-white/60 border border-green-500/20 rounded-full px-5 py-2.5 shadow-sm mb-6">
            <p className="text-sm font-semibold text-green-700 tracking-[2px] uppercase flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Your Privacy Matters
            </p>
          </div>

          <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information.
          </p>

          {/* Last updated */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-6 py-3 rounded-full text-sm">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="text-gray-700">
              <span className="font-bold">Last Updated:</span> May 18, 2026
            </span>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5 shadow-sm mb-4">
              <p className="text-sm font-semibold text-green-600 tracking-[2px] uppercase">
                Quick Overview
              </p>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Privacy at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Here's a brief overview of our privacy practices. Please read the full policy below for complete details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-white/80 border border-white/60 rounded-[24px] shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Important notice */}
          <div className="mt-12 backdrop-blur-md bg-blue-50 border-l-4 border-blue-500 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Your Privacy Rights</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  You have the right to access, correct, delete, or export your personal data at any time.
                  Contact us at privacy@zevenstone.com to exercise your rights or if you have any questions about this policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[32px] shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Table of Contents
                  </h3>

                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm ${
                          activeSection === item.id
                            ? 'bg-green-50 text-green-700 font-bold'
                            : 'text-gray-600 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <span className={activeSection === item.id ? 'text-green-600' : 'text-gray-400'}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-[40px] shadow-lg p-10 md:p-12 space-y-12">

                {/* Section 1: Introduction */}
                <section id="introduction">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      1
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Zevenstone LLC ("Company," "we," "our," or "us") respects your privacy and is committed to protecting
                      your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                      information when you use our website, services, and applications.
                    </p>
                    <p>
                      This policy applies to all information collected through our services and any related services, sales,
                      marketing, or events (collectively, the "Services").
                    </p>
                    <p className="font-semibold text-gray-900">
                      By using our Services, you agree to the collection and use of information in accordance with this policy.
                      If you do not agree with our policies and practices, please do not use our Services.
                    </p>
                  </div>
                </section>

                {/* Section 2: Information We Collect */}
                <section id="information-collected" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      2
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p className="font-semibold text-gray-900">Personal Information You Provide:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-semibold">Contact Information:</span> Name, email address, phone number, mailing address</li>
                      <li><span className="font-semibold">Account Information:</span> Username, password, profile information</li>
                      <li><span className="font-semibold">Business Information:</span> Company name, job title, industry, business size</li>
                      <li><span className="font-semibold">Payment Information:</span> Billing address, payment method details (processed securely by third-party providers)</li>
                      <li><span className="font-semibold">Communications:</span> Information you provide when contacting us or subscribing to newsletters</li>
                      <li><span className="font-semibold">Project Information:</span> Details about your projects, goals, and requirements</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Information Automatically Collected:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-semibold">Device Information:</span> IP address, browser type, operating system, device identifiers</li>
                      <li><span className="font-semibold">Usage Data:</span> Pages viewed, time spent on pages, links clicked, navigation paths</li>
                      <li><span className="font-semibold">Location Data:</span> General geographic location based on IP address</li>
                      <li><span className="font-semibold">Cookies & Tracking:</span> Information collected through cookies, web beacons, and similar technologies</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Information from Third Parties:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Social media platforms (if you connect your accounts)</li>
                      <li>Analytics providers and advertising partners</li>
                      <li>Business partners and affiliates</li>
                      <li>Public databases and data enrichment services</li>
                    </ul>
                  </div>
                </section>

                {/* Section 3: How We Use Your Information */}
                <section id="how-we-use" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      3
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>We use the information we collect for the following purposes:</p>

                    <p className="font-semibold text-gray-900">Service Delivery:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide, operate, and maintain our Services</li>
                      <li>Process transactions and send transaction notifications</li>
                      <li>Manage your account and provide customer support</li>
                      <li>Deliver services requested through our platform</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Communication:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Send service-related announcements and updates</li>
                      <li>Respond to inquiries and support requests</li>
                      <li>Send marketing and promotional communications (with your consent)</li>
                      <li>Conduct surveys and gather feedback</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Improvement & Analytics:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Analyze usage patterns and improve our Services</li>
                      <li>Develop new features and functionality</li>
                      <li>Conduct research and data analysis</li>
                      <li>Monitor and analyze trends, usage, and activities</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Security & Legal:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Protect against fraud, abuse, and security threats</li>
                      <li>Comply with legal obligations and enforce our terms</li>
                      <li>Resolve disputes and troubleshoot problems</li>
                      <li>Protect our rights, property, and safety</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Marketing & Personalization:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Personalize your experience and content</li>
                      <li>Display targeted advertisements and offers</li>
                      <li>Measure advertising effectiveness</li>
                      <li>Send promotional materials (you can opt-out anytime)</li>
                    </ul>
                  </div>
                </section>

                {/* Section 4: Information Sharing */}
                <section id="information-sharing" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      4
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Information Sharing & Disclosure</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>We may share your information in the following circumstances:</p>

                    <p className="font-semibold text-gray-900">Service Providers:</p>
                    <p>
                      We share information with third-party service providers who perform services on our behalf, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Payment processors and financial institutions</li>
                      <li>Cloud hosting and infrastructure providers</li>
                      <li>Email delivery and marketing automation platforms</li>
                      <li>Analytics and data analysis services</li>
                      <li>Customer support and communication tools</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Business Transfers:</p>
                    <p>
                      If we are involved in a merger, acquisition, reorganization, or sale of assets, your information
                      may be transferred as part of that transaction. We will notify you of any such change.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">Legal Requirements:</p>
                    <p>We may disclose your information if required to do so by law or in response to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Valid legal processes (subpoenas, court orders, etc.)</li>
                      <li>Government or regulatory requests</li>
                      <li>Protecting our rights, property, or safety</li>
                      <li>Investigating potential violations of our terms</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">With Your Consent:</p>
                    <p>
                      We may share your information for other purposes with your explicit consent or at your direction.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">Aggregated & De-identified Data:</p>
                    <p>
                      We may share aggregated or de-identified information that cannot reasonably be used to identify
                      you for research, marketing, or other purposes.
                    </p>
                  </div>
                </section>

                {/* Section 5: Cookies & Tracking */}
                <section id="cookies" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      5
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Cookies & Tracking Technologies</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We use cookies and similar tracking technologies to collect and track information about your use
                      of our Services. Cookies are small data files stored on your device.
                    </p>

                    <p className="font-semibold text-gray-900">Types of Cookies We Use:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-semibold">Essential Cookies:</span> Required for the website to function properly (e.g., authentication, security)</li>
                      <li><span className="font-semibold">Functional Cookies:</span> Remember your preferences and settings</li>
                      <li><span className="font-semibold">Analytics Cookies:</span> Help us understand how visitors use our website (e.g., Google Analytics)</li>
                      <li><span className="font-semibold">Advertising Cookies:</span> Used to deliver relevant advertisements and track campaign performance</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Other Tracking Technologies:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-semibold">Web Beacons:</span> Small graphics that track user behavior</li>
                      <li><span className="font-semibold">Pixels:</span> Code snippets that collect information about your visit</li>
                      <li><span className="font-semibold">Local Storage:</span> Data stored locally in your browser</li>
                      <li><span className="font-semibold">Session Storage:</span> Temporary data stored during your browsing session</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Managing Cookies:</p>
                    <p>
                      You can control and manage cookies through your browser settings. Most browsers allow you to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>View and delete cookies</li>
                      <li>Block all cookies or only third-party cookies</li>
                      <li>Clear cookies when you close your browser</li>
                      <li>Set up rules to manage cookies on a site-by-site basis</li>
                    </ul>
                    <p>
                      Note that disabling cookies may affect the functionality of our Services and your user experience.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">Third-Party Analytics:</p>
                    <p>We use third-party analytics services including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Google Analytics (to understand website usage)</li>
                      <li>Facebook Pixel (for advertising and remarketing)</li>
                      <li>LinkedIn Insights (for B2B analytics)</li>
                    </ul>
                  </div>
                </section>

                {/* Section 6: Data Security */}
                <section id="data-security" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      6
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We implement appropriate technical and organizational security measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <p className="font-semibold text-gray-900">Security Measures Include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of data in transit (SSL/TLS) and at rest</li>
                      <li>Secure authentication and access controls</li>
                      <li>Regular security assessments and vulnerability testing</li>
                      <li>Firewall protection and intrusion detection systems</li>
                      <li>Employee training on data protection and security</li>
                      <li>Restricted access to personal data on a need-to-know basis</li>
                      <li>Regular backups and disaster recovery procedures</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Limitations:</p>
                    <p>
                      While we strive to protect your personal information, no method of transmission over the internet
                      or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">Your Responsibility:</p>
                    <p>You are responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Keeping your account credentials confidential</li>
                      <li>Using strong, unique passwords</li>
                      <li>Notifying us immediately of any unauthorized access</li>
                      <li>Logging out of your account when finished</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Data Breach Notification:</p>
                    <p>
                      In the event of a data breach that may affect your personal information, we will notify you and
                      relevant authorities as required by law, and take appropriate steps to remediate the issue.
                    </p>
                  </div>
                </section>

                {/* Section 7: Data Retention */}
                <section id="data-retention" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      7
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Data Retention</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We retain your personal information only for as long as necessary to fulfill the purposes outlined
                      in this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>

                    <p className="font-semibold text-gray-900">Retention Periods:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><span className="font-semibold">Account Information:</span> Retained while your account is active and for a reasonable period thereafter</li>
                      <li><span className="font-semibold">Transaction Records:</span> Retained for 7 years for tax and accounting purposes</li>
                      <li><span className="font-semibold">Marketing Data:</span> Retained until you unsubscribe or request deletion</li>
                      <li><span className="font-semibold">Support Communications:</span> Retained for 3 years for quality assurance</li>
                      <li><span className="font-semibold">Analytics Data:</span> Aggregated data retained indefinitely; individual data retained for 26 months</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Deletion Criteria:</p>
                    <p>We determine retention periods based on:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The nature and sensitivity of the information</li>
                      <li>Potential risk of harm from unauthorized use or disclosure</li>
                      <li>Purposes for which we process the information</li>
                      <li>Legal, regulatory, and contractual obligations</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Secure Deletion:</p>
                    <p>
                      When we no longer need your information, we securely delete or anonymize it in accordance with
                      industry best practices and applicable data protection laws.
                    </p>
                  </div>
                </section>

                {/* Section 8: Your Privacy Rights */}
                <section id="your-rights" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      8
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose space-y-4">
                      <div className="flex items-start gap-3">
                        <Eye className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Access</h4>
                          <p className="text-sm text-gray-700">Request a copy of the personal information we hold about you</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Rectification</h4>
                          <p className="text-sm text-gray-700">Request correction of inaccurate or incomplete information</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Trash2 className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Deletion</h4>
                          <p className="text-sm text-gray-700">Request deletion of your personal information (subject to legal obligations)</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Download className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Data Portability</h4>
                          <p className="text-sm text-gray-700">Request a copy of your data in a structured, machine-readable format</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Lock className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Restriction</h4>
                          <p className="text-sm text-gray-700">Request restriction of processing under certain circumstances</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Object</h4>
                          <p className="text-sm text-gray-700">Object to processing based on legitimate interests or for direct marketing</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <UserCheck className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Right to Withdraw Consent</h4>
                          <p className="text-sm text-gray-700">Withdraw consent for processing at any time (where consent is the legal basis)</p>
                        </div>
                      </div>
                    </div>

                    <p className="font-semibold text-gray-900 mt-6">How to Exercise Your Rights:</p>
                    <p>To exercise any of these rights, please contact us at:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Email: privacy@zevenstone.com</li>
                      <li>Subject line: "Privacy Rights Request"</li>
                      <li>Include: Your name, email, and specific request</li>
                    </ul>

                    <p>
                      We will respond to your request within 30 days. We may ask you to verify your identity before
                      processing your request.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">Marketing Opt-Out:</p>
                    <p>You can opt-out of marketing communications by:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Clicking the "unsubscribe" link in our emails</li>
                      <li>Updating your account preferences</li>
                      <li>Contacting us at privacy@zevenstone.com</li>
                    </ul>
                  </div>
                </section>

                {/* Section 9: Children's Privacy */}
                <section id="children" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      9
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Children's Privacy</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Our Services are not intended for children under the age of 18. We do not knowingly collect
                      personal information from children under 18.
                    </p>
                    <p>
                      If you are a parent or guardian and believe your child has provided us with personal information,
                      please contact us immediately at privacy@zevenstone.com. We will take steps to delete such
                      information from our systems.
                    </p>
                    <p>
                      If we become aware that we have collected personal information from a child under 18 without
                      verification of parental consent, we will take steps to remove that information.
                    </p>
                  </div>
                </section>

                {/* Section 10: International Transfers */}
                <section id="international" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      10
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">International Data Transfers</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Your information may be transferred to and processed in countries other than your country of
                      residence. These countries may have data protection laws that are different from the laws of
                      your country.
                    </p>

                    <p className="font-semibold text-gray-900">Data Protection Safeguards:</p>
                    <p>When we transfer your data internationally, we ensure appropriate safeguards are in place:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Standard Contractual Clauses approved by the European Commission</li>
                      <li>Adequacy decisions recognizing equivalent data protection</li>
                      <li>Privacy Shield frameworks (where applicable)</li>
                      <li>Binding Corporate Rules and other approved mechanisms</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Your Rights:</p>
                    <p>
                      You have the right to obtain information about the safeguards we use for international transfers.
                      Contact us at privacy@zevenstone.com for more information.
                    </p>
                  </div>
                </section>

                {/* Section 11: Changes to Privacy Policy */}
                <section id="changes" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      11
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Changes to This Privacy Policy</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices,
                      technology, legal requirements, or other factors.
                    </p>

                    <p className="font-semibold text-gray-900">Notification of Changes:</p>
                    <p>We will notify you of material changes by:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Posting the updated policy on our website</li>
                      <li>Updating the "Last Updated" date at the top of this page</li>
                      <li>Sending email notification (for material changes)</li>
                      <li>Displaying a prominent notice on our Services</li>
                    </ul>

                    <p className="font-semibold text-gray-900 mt-6">Your Acceptance:</p>
                    <p>
                      Your continued use of our Services after we post changes constitutes your acceptance of the
                      updated Privacy Policy. We encourage you to review this policy periodically.
                    </p>

                    <p>
                      If you do not agree with the changes, you must stop using our Services and may request deletion
                      of your account and personal information.
                    </p>
                  </div>
                </section>

                {/* Section 12: Contact Us */}
                <section id="contact" className="pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      12
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                    <p>
                      If you have questions, concerns, or requests regarding this Privacy Policy or our data practices,
                      please contact us:
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 not-prose">
                      <h4 className="font-bold text-gray-900 mb-4">Zevenstone LLC - Privacy Team</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Email (Privacy):</div>
                            <a href="mailto:privacy@zevenstone.com" className="text-green-600 hover:underline">
                              privacy@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Email (General):</div>
                            <a href="mailto:hello@zevenstone.com" className="text-green-600 hover:underline">
                              hello@zevenstone.com
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-700">Phone:</div>
                            <a href="tel:+15551234567" className="text-green-600 hover:underline">
                              +1 (555) 123-4567
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 italic">
                      We aim to respond to all privacy-related inquiries within 30 days. For urgent matters, please
                      mark your email with "URGENT" in the subject line.
                    </p>
                  </div>
                </section>

                {/* Acceptance Statement */}
                <div className="pt-12 border-t-2 border-gray-300">
                  <div className="backdrop-blur-md bg-green-50 border border-green-200 rounded-[32px] p-8 text-center">
                    <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Privacy Commitment
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      By using Zevenstone's services, you acknowledge that you have read and understood this Privacy
                      Policy and agree to the collection, use, and disclosure of your information as described herein.
                    </p>
                    <div className="text-sm text-gray-600">
                      <span className="font-bold">Effective Date:</span> May 18, 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
