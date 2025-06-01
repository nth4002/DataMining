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
            Chào mừng đến với nền tảng phận tícch thông minh của chúng tôi! Hệ
            thống này được thiết kế nhằm hỗ trợ các nhà giáo dục và các viện
            nghiên cứu học thuật thông qua việc sử dụng thông tin học sinh và
            trường học và các hành vi tương tác trong học tập như số câu hỏi đã
            làm và thời lượng xem video.
          </p>
          <p>
            Chức năng chính của hệ thống là cung cấp chính xác{" "}
            <strong className="text-indigo-600">
              dự đoán về đầu ra kết quả học tập của học sinh
            </strong>
            (pass or fail). Bằng cách chủ động xác định những học sinh đang
            "nguy cấp" (at-risk), chúng tôi nhắm tới việc can thiệp kịp thời, cá
            nhân hóa việc hỗ trợ học tập, và nâng cao tỉ lệ hoàn thành khóa học
            cũng như tăng chất lượng giáo dục.
          </p>
          <p>
            Hãy chuyển hướng tới{" "}
            <NavLink
              to="/dashboard"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Dashboard
            </NavLink>{" "}
            để xem và hình dung những dự đoán này, khám phá các "key
            contributing factors" và giám sát các xu hướng học của các học sinh
            qua các khóa học.
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
            {/* Team Member Card - Nguyễn Thanh Hùng */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full">
              {/* Image */}
              <img
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 dark:border-indigo-400 object-cover shadow-md"
                src="/images/default_user_profile.webp"
                alt="Nguyễn Thanh Hùng"
              />

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 mt-2">
                Nguyễn Thanh Hùng
              </h3>

              {/* Student ID (Optional) */}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
    ID: 22520518
  </p> */}

              {/* Role */}
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 text-sm">
                Tier 1 gánh team {/* Example Role */}
              </p>

              {/* Short Bio/Contribution */}
              <p className="text-gray-600 dark:text-gray-400 text-sm px-2">
                "Cân team" - Đóng góp quan trọng vào việc phát triển các thành
                phần cốt lõi và giải quyết các thách thức kỹ thuật.{" "}
                {/* Example Bio */}
              </p>
            </div>

            {/* Team Member Card - Đỗ Tuấn Trực */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full">
              {/* Image */}
              <img
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 dark:border-indigo-400 object-cover shadow-md"
                src="/images/default_user_profile.webp"
                alt="Đỗ Tuấn Trực"
              />

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 mt-2">
                Đỗ Tuấn Trực
              </h3>

              {/* Student ID (Optional) */}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
    ID: 22521548
  </p> */}

              {/* Role */}
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 text-sm">
                Tier 2 gánh team {/* Example Role */}
              </p>

              {/* Short Bio/Contribution */}
              <p className="text-gray-600 dark:text-gray-400 text-sm px-2">
                "Cân team" - Đóng góp chính vào sự thành công của dự án thông
                qua các giải pháp sáng tạo và nỗ lực không ngừng.{" "}
                {/* Example Bio */}
              </p>
            </div>
            {/* Team Member Card - Hoàng Thanh Trúc */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full">
              {/* Image */}
              <img
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 dark:border-indigo-400 object-cover shadow-md"
                src="/images/default_user_profile.webp"
                alt="Hoàng Thanh Trúc"
              />

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 mt-2">
                Hoàng Thanh Trúc
              </h3>

              {/* Student ID (Optional, if you want to display it for team members too) */}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
    ID: [Trúc's ID if applicable]
  </p> */}

              {/* Role */}
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 text-sm">
                Team Contributor / Analyst {/* Example Role */}
              </p>

              {/* Short Bio/Contribution */}
              <p className="text-gray-600 dark:text-gray-400 text-sm px-2">
                "Tin tưởng vào những người cân team" - Đặt niềm tin vào 2 anh
                Long. {/* Example Bio */}
              </p>
            </div>

            {/* Team Member Card - Dương Tuấn Thịnh */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full">
              {/* Image */}
              <img
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 dark:border-indigo-400 object-cover shadow-md"
                src="/images/default_user_profile.webp"
                alt="Dương Tuấn Thịnh"
              />

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 mt-2">
                Đinh Quốc Thịnh
              </h3>

              {/* Student ID (Optional) */}
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
    ID: [Thịnh's ID if applicable]
  </p> */}

              {/* Role */}
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 text-sm">
                Project Lead / Strategist {/* Example Role */}
              </p>

              {/* Short Bio/Contribution */}
              <p className="text-gray-600 dark:text-gray-400 text-sm px-2">
                "Chỉ đạo" - Định hướng chiến lược tổng thể của dự án và điều
                phối các hoạt động của nhóm. {/* Example Bio */}
              </p>
            </div>
            {/* Team Member Card 3 (Placeholder) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center h-full">
              {/* Image */}
              <img
                className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500 dark:border-indigo-400 object-cover shadow-md"
                src="/images/default_user_profile.webp" // Replace with actual path or dynamic src
                alt="Nguyễn Đức Tài" // Use the person's name for alt text
              />

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 mt-2">
                Nguyễn Đức Tài
              </h3>

              {/* Student ID (Optional, can be styled differently if less important)
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                ID: 22520518
              </p> */}

              {/* Role */}
              <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2 text-sm">
                Lead Documenter {/* Example Role */}
              </p>

              {/* Short Bio/Contribution */}
              <p className="text-gray-600 dark:text-gray-400 text-sm px-2">
                Phụ trách tổng hợp và ghi chép tài liệu, đảm bảo thông tin dự án
                được đầy đủ và rõ ràng. {/* Example Bio */}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
