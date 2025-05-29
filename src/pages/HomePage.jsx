import React from "react";
import { NavLink } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="space-y-12">
      {/** Section 1: About this web */}
      <section className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
          About Our Predictive BI Dashboard
        </h2>
        <div className="prose max-w-none lg:prose-lg text-gray-700 space-y-4">
          {" "}
          {/* Tailwind Typography plugin helps here */}
          <p>
            Welcome to our intelligent analytics platform! This system is
            designed to empower educators and academic institutions by
            leveraging student school information and engagement behaviors –
            such as questions completed and video interaction time.
          </p>
          <p>
            Our core function is to provide accurate{" "}
            <strong className="text-indigo-600">
              predictions on student course outcomes
            </strong>{" "}
            (pass or fail). By identifying at-risk students proactively, we aim
            to facilitate timely interventions, personalize learning support,
            and ultimately enhance student success rates and educational
            quality.
          </p>
          <p>
            Navigate to the{" "}
            <NavLink
              to="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Dashboard
            </NavLink>{" "}
            to visualize these predictions, explore key contributing factors,
            and monitor engagement trends across courses.
          </p>
        </div>
      </section>

      {/* Section 2: Meet the Team */}
      <section className="bg-gray-50 py-8 md:py-12 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Card 1 */}
            <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                src="/images/bruno.webp" // Use imported image or direct path
                alt="bruno"
              />
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-indigo-200 flex items-center justify-center text-4xl font-bold text-indigo-700">
                Magnifico {/* Initials or placeholder */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Mân trưởng
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Top 16 EPL</p>
              <p className="text-gray-600 text-sm">Đội trưởng của nhà hát</p>
            </div>

            {/* Team Member Card 2 (Placeholder) */}
            <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                src="/images/kevin.webp" // Use imported image or direct path
                alt="bruno"
              />
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-700">
                Magnifico {/* Initials */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Tiểu Bruno
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Man Fake</p>
              <p className="text-gray-600 text-sm">
                A Trung Kevin, cứ chung kết là a chấn thương
              </p>
            </div>

            {/* Team Member Card 3 (Placeholder) */}
            <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                src="/images/jackson.jpeg" // Use imported image or direct path
                alt="bruno"
              />
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-700">
                Striker {/* Initials */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                A Những
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Chelsea FC</p>
              <p className="text-gray-600 text-sm">
                Những kẻ chê bai tôi không biết gì về bóng đá
              </p>
            </div>

            {/* Team Member Card 3 (Placeholder) */}
            <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                src="/images/haaland.webp" // Use imported image or direct path
                alt="bruno"
              />
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-700">
                Striker {/* Initials */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Cô gái Hà Lan
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Man Fake</p>
              <p className="text-gray-600 text-sm">Stay humbled</p>
            </div>

            {/* Team Member Card 3 (Placeholder) */}
            <div className="bg-white rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
                src="/images/garnacho.webp" // Use imported image or direct path
                alt="bruno"
              />
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-700">
                Winger {/* Initials */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                A Giỏi
              </h3>
              <p className="text-indigo-600 font-medium mb-2">Man United</p>
              <p className="text-gray-600 text-sm">Giỏi thì vào mà đá</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
