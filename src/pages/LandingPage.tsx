import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Award, Brain, Database, BarChart3, Bot, Target, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import mentorImage from '../images/mentor promise-2.PNG';
import aboutImage from '../images/recognised.png';
import brochurePDF from '../images/DAwithAI_compressed.pdf';

const successStories = [
  {
    name: 'Priya Sharma',
    before: 'IT Support Specialist',
    after: 'Data Scientist at FinTech Corp',
    quote: 'The hands-on projects and mentorship were game-changers. I went from solving IT tickets to building predictive models that impact the business.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
  },
  {
    name: 'Rohan Singh',
    before: 'Marketing Analyst',
    after: 'Product Analyst at E-commerce Giant',
    quote: 'Career Redefine taught me the "why" behind the data. I can now analyze user behavior to drive product strategy, a skill my company values immensely.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face',
  },
  {
    name: 'Anjali Desai',
    before: 'Recent Graduate (B.Tech)',
    after: 'AI/ML Engineer at a SaaS Startup',
    quote: 'As a fresher, I was worried about getting a good job. This program gave me the practical AI skills and interview confidence to land my dream role.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
  }
];


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative bg-slate-900 text-white overflow-hidden" 
        style={{ backgroundImage: `url('https://i.pinimg.com/736x/df/8f/c2/df8fc2bb2bcae7b2d26c34f387f49014.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-constellation-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-purple-500/20">
                Transform your career journey →
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
                Master AI-Powered Data Analytics
              </h1>
              <p className="text-xl lg:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto">
                Go beyond dashboards. Become an AI-first data professional who drives strategy and solves complex business problems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                to="/register"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full transition-all duration-300 text-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute w-full h-full bg-white/20 -left-full top-0 -rotate-45 group-hover:left-full transition-all duration-500"></span>
                <span className="relative">Book Free Interview</span>
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href={brochurePDF}
                download="DAwithAI_compressed.pdf"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-purple-600 text-white font-bold rounded-full transition-all duration-300 text-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative">Download Brochure</span>
              </a>
              <div className="flex items-center space-x-4 text-purple-400 mt-4 sm:mt-0">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Only 30 Seats</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Interview-Based</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <Bot className="h-5 w-5 text-purple-400" />
              <span>AI-Powered Workflows</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <span>Product & Statistical Analytics</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-gray-300">
              <Award className="h-5 w-5 text-purple-400" />
              <span>Mentorship from IIT Alumni</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
            <section id="curriculum" className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What You’ll Learn</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">This isn’t just a course. It’s a career accelerator designed to make you a top 1% data professional.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Database className="h-6 w-6 text-blue-400" />, 
                title: "Step 1: Strong Foundations", 
                description: "Build the must-have toolkit every Data Analyst needs:",
                points: ["SQL & BigQuery → Work with real company databases", "Python & Pandas → Clean, analyze, and manipulate data fast", "Tableau & Excel → Create dashboards that drive decisions"]
              },
              { 
                icon: <Brain className="h-6 w-6 text-purple-400" />, 
                title: "Step 2: Advanced Skills", 
                description: "Move from just making reports to solving real business problems:",
                points: ["Statistical Analysis → Understand patterns, predict outcomes", "Product Analytics → Learn how Zomato, Swiggy measure growth", "AI-Powered Automation → Use GenAI, APIs, and workflow tools"]
              },
              { 
                icon: <Target className="h-6 w-6 text-green-400" />, 
                title: "Step 3: Career Preparation", 
                description: "Get ready for the real interviews that land jobs:",
                points: ["Dedicated Interview Prep Module", "Mock interviews + aptitude tests + case studies", "ATS Resume building + personalized career guidance"]
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-slate-700 rounded-full p-3 mr-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: point.replace(/→/g, '<span class="text-gray-500">→</span>') }}></span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-5 bg-slate-900 flex justify-center">
              <Link 
                    to="/register"
                    className="group relative inline-flex items-center justify-center px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full transition-all duration-300 text-base overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="absolute w-full h-full bg-white/20 -left-full top-0 -rotate-45 group-hover:left-full transition-all duration-500"></span>
                    <span className="relative">Apply Now & Secure Your Spot</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
            </section>
      {/* Mentor's Promise Section */}
            <section id="mentor" className="py-12 bg-slate-900/70 bg-constellation-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <img 
                src={mentorImage}
                alt="Shivam Yadav, Mentor at Career Redefine"
                className="rounded-full w-80 h-80 mx-auto sm:w-96 sm:h-96 lg:w-full lg:h-auto lg:rounded-2xl shadow-2xl shadow-blue-500/10 border-4 border-slate-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="relative bg-slate-800/50 border border-blue-500/30 rounded-xl p-8 backdrop-blur-sm">
                <Quote className="absolute -top-5 -left-5 h-16 w-16 text-slate-700/80 transform -rotate-12" />
                <p className="text-sm text-blue-400 font-semibold mb-2">My Mission With Career Redefine...</p>
                <h2 className="text-3xl font-bold text-white mb-4">A Mentor's Promise to You</h2>
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-6">
                  I've seen careers transform when professionals stop chasing tools and start mastering real analytics, AI workflows, and product thinking. My mission with this course is simple: to help you unlock that transformation and lead in the AI-driven future without burning lakhs on overpriced programs. Learning should be premium, but it should never be expensive.
                </blockquote>
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white">Shivam Yadav</h3>
                  <p className="text-blue-300">AI-ML Instructor-Mentor </p>
                  <p className="text-gray-400">x-DataScience Instructor@Scaler | IIT Kanpur</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* What Happens Next */}
            <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Your Journey to a New Career</h2>
            <p className="text-lg lg:text-xl text-gray-400">A clear, transparent path to your transformation.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2"></div>
            {[
              { title: "Application Review", description: "Our team reviews your details within 24–48 hours" },
              { title: "Mentor Interview", description: "A short 1:1 discussion to assess your goals and readiness" },
              { title: "Selection & Offer", description: "If shortlisted, you’ll secure your seat in the 30-member cohort" },
              { title: "Begin Your Journey", description: "Start transforming your career with expert guidance" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start md:items-center mb-8"
              >
                <div className="hidden md:flex w-1/2 justify-end pr-8 text-right">
                  {index % 2 === 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  )}
                </div>
                <div className="absolute md:relative flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 left-4 md:left-1/2 -translate-x-1/2 shadow-lg shadow-purple-500/20">
                  <span className="font-sans">{index + 1}</span>
                </div>
                <div className="w-full md:w-1/2 pl-16 md:pl-8">
                  <div className="md:hidden">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                  {index % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            <section className="py-6 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link 
              to="/register"
              className="group relative inline-flex items-center justify-center px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full transition-all duration-300 text-base overflow-hidden"
            >
              <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute w-full h-full bg-white/20 -left-full top-0 -rotate-45 group-hover:left-full transition-all duration-500"></span>
              <span className="relative">Apply Now & Secure Your Spot</span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-gray-400">Join the next batch of career transformers.</p>
          </motion.div>
        </div>
      </section>
        
      {/* About Career Redefine */}
      {/* About Career Redefine */}
            <section id="about" className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">About Career Redefine</h2>
              <p className="text-xl text-purple-400 font-semibold mb-6">
                Redefining Careers with Premium Quality, Made Affordable.
              </p>
              
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  At Career Redefine, we are on a mission to make world-class Data Science and AI education accessible to every ambitious professional in India.
                </p>
                <p>
                  We focus only on serious learners who are committed to growth. That's why our programs are cohort-based with personal guidance, live follow-ups, and mentor support at every step.
                </p>
                
                <div className="bg-slate-800/50 rounded-lg p-6 my-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-4">We believe learning should be:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span><strong>Premium in quality</strong> – guided by IIT alumni & industry experts</span></li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span><strong>Practical in approach</strong> – built on real projects, not theory</span></li>
                    <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /><span><strong>Affordable in cost</strong> – because career growth shouldn't demand lakhs</span></li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border-l-4 border-purple-500 p-4 rounded-r-lg">
                  <p className="font-bold text-white">We are not another "course provider."</p>
                  <p className="text-gray-300">We are a career accelerator helping professionals thrive in the AI-driven future.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={aboutImage}
                alt="Mentors guiding professionals"
                className="rounded-2xl shadow-2xl shadow-blue-500/10"
              />
              
            </motion.div>

          </div>
          
        </div>
      </section>
      

      {/* Success Stories */}
      {/* <section className="py-20 bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Real Careers, Real Transformations</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. See how we've helped professionals like you.</p>
          </motion.div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 flex flex-col group"
              >
                <div className="flex-grow mb-6">
                  <blockquote className="text-gray-300 italic relative">
                    <span className="absolute -top-2 -left-4 text-6xl text-slate-700 font-serif">“</span>
                    {story.quote}
                  </blockquote>
                </div>
                <div className="flex items-center mt-auto">
                  <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full mr-4 border-2 border-purple-500" />
                  <div>
                    <h4 className="font-bold text-white">{story.name}</h4>
                    <p className="text-sm text-gray-400">
                      <span className="text-red-400">{story.before}</span> 
                      <ArrowRight className="inline-block h-4 w-4 mx-1 text-gray-500" /> 
                      <span className="text-green-400 font-semibold">{story.after}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}




      <Footer />
    </div>
  );
};

export default LandingPage;
