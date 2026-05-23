import React from 'react';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick: () => void;
  showIcon?: boolean;
  showBehindGlow?: boolean;
  behindGlowColor?: string;
  customInnerGradient?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = false,
  enableMobileTilt = false,
  onContactClick,
  showIcon = false,
  showBehindGlow = false,
  behindGlowColor = 'rgba(125, 190, 255, 0.67)',
  customInnerGradient = 'linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)',
}) => {
  return (
    <div
      className={`relative rounded-3xl p-8 max-w-6xl mx-auto border backdrop-blur-sm shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-glow maxwidth-800 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start ${
        showBehindGlow ? '' : ''
      }`}
      style={{
        background: customInnerGradient,
        boxShadow: showBehindGlow ? `0 0 20px ${behindGlowColor}` : undefined,
        transform: enableTilt ? 'perspective(1000px) rotateX(0deg) rotateY(0deg)' : undefined,
      }}
    >
      {/* Background Glow Effect */}
      {showBehindGlow && (
        <div
          className="absolute inset-0 z-0 opacity-50 blur-3xl transform scale-150 transition-all duration-1000"
          style={{ backgroundColor: behindGlowColor }}
        ></div>
      )}

      {/* Avatar Image - Left Side */}
      <div className="relative z-10 group w-full">
        <div className="relative rounded-2xl overflow-hidden shadow-finance-lg aspect-[3/4] hover:scale-105 transition-all duration-500 group-hover:shadow-glow-blue">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Profile Content - Right Side */}
      <div className="relative z-10 text-center md:text-left">
        {showUserInfo && (
          <div className="flex items-center justify-center md:justify-start mb-6">
            {showIcon && (
              <div className="w-10 h-10 mr-4 bg-nexus-gradient rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-lg text-gray-600">{title}</p>
              <p className="text-sm text-gray-500">@{handle}</p>
              <p className="text-sm text-green-500">{status}</p>
            </div>
          </div>
        )}

        <p className="text-lg leading-relaxed mb-4 text-gray-600 dark:text-gray-300">
          Our brokers are not just accredited professionals; they are dedicated advisors with years of experience navigating the complexities of the n finance and lending markets. As a leading Business Loan Broker in , we provide expert guidance on tailored financing solutions, including business loans for small and medium enterprises, fast approval low doc business loans, and flexible unsecured business loan options.
        </p>
        <p className="text-lg leading-relaxed mb-8 text-gray-600 dark:text-gray-300">
          We work closely with each client to deeply understand their unique financial goals and aspirations. Our mission is to provide you with unmatched clarity and confidence in your financial decision-making, ensuring a seamless and stress-free journey from application to approval. Beyond simply securing a loan, we aim to empower you with the knowledge and strategies to make informed choices for the long term. We believe in building lasting relationships, offering ongoing support well after your financing is complete. With us, you gain a trusted partner committed to guiding you at every stage of your financial journey as your preferred business finance advisor and loan broker in .
        </p>

        <button
          onClick={onContactClick}
          className="bg-nexus-gradient text-white px-6 py-3 rounded-xl transition-all duration-300 font-bold transform hover:scale-105 shadow-lg mb-6"
        >
          {contactText}
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mt-6 lg:mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-5 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-lg sm:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">2+</div>
            <div className="text-xs text-gray-600 font-medium">Years of Experience</div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
              <div className="text-lg sm:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent text-center mb-2">
                Decision
              </div>
              <div className="text-xs text-gray-600 font-medium text-center">
                In 59 <br />mins
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-5 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-lg sm:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">Free</div>
            <div className="text-xs text-gray-600 font-medium">Consultation</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-5 text-center border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-lg sm:text-2xl font-bold bg-nexus-gradient bg-clip-text text-transparent">20+</div>
            <div className="text-xs text-gray-600 font-medium">Panel of Lenders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
