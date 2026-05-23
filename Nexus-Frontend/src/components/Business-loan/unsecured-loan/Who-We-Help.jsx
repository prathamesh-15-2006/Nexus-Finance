import { FaHospital, FaBriefcaseMedical, FaHardHat, FaShoppingCart, FaUserTie, FaStar } from "react-icons/fa";
import { useTheme } from "../../../contexts/ThemeContext";

export default function WhoWeHelp() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-sky-600 to-blue-700 text-white'} py-16 px-4`}>
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Who We Help */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Who We Help</h2>
          <p className="text-lg">
            Nexus Finance proudly supports a wide range of n businesses across these sectors:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 flex flex-col items-center text-center transition`}>
              <FaHospital className="text-4xl mb-2" />
              <p className="font-semibold text-lg">Hospitality</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 flex flex-col items-center text-center transition`}>
              <FaBriefcaseMedical className="text-4xl mb-2" />
              <p className="font-semibold text-lg">Allied Healthcare</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 flex flex-col items-center text-center transition`}>
              <FaHardHat className="text-4xl mb-2" />
              <p className="font-semibold text-lg">Construction & Trades</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 flex flex-col items-center text-center transition`}>
              <FaShoppingCart className="text-4xl mb-2" />
              <p className="font-semibold text-lg">Retail & eCommerce</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 flex flex-col items-center text-center transition`}>
              <FaUserTie className="text-4xl mb-2" />
              <p className="font-semibold text-lg">Professional Services</p>
            </div>
          </div>
        </div>

        {/* Recent Success Stories */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Recent Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 transition`}>
              <FaStar className="text-4xl mb-2 mx-auto" />
              <p className="text-center">
                A Melbourne café secured <strong>$80K</strong> to renovate and reopen.
              </p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 transition`}>
              <FaStar className="text-4xl mb-2 mx-auto" />
              <p className="text-center">
                A Brisbane digital agency streamlined cash flow between large projects.
              </p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-white/10 hover:bg-white/20'} rounded-2xl p-6 transition`}>
              <FaStar className="text-4xl mb-2 mx-auto" />
              <p className="text-center">
                A Sydney allied health clinic funded the launch of a second location.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
