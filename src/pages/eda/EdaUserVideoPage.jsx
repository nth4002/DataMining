// src/pages/eda/EdaUserVideoPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// Optional: Consider icons for specific sections
// import { PlayCircleIcon, ClockIcon, ForwardIcon, EyeIcon } from '@heroicons/react/24/outline';

const EdaUserVideoPage = () => {
  const codeLink = "https://www.kaggle.com/code/usrnameisnttakenyet/user-video";
  const speedData = [
    { speed: 1.0, num_users: 1596641, percentage: 61.87 },
    { speed: 2.0, num_users: 368258, percentage: 14.27 },
    { speed: 1.25, num_users: 320498, percentage: 12.42 },
    { speed: 1.5, num_users: 294334, percentage: 11.41 },
    { speed: 0.5, num_users: 754, percentage: 0.03 },
  ];

  const yearData = [
    { year: 2020, unique_user_count: 81787 },
    { year: 2019, unique_user_count: 3 },
    { year: 2011, unique_user_count: 2 },
    { year: 2001, unique_user_count: 2 },
    { year: 2022, unique_user_count: 1 },
    { year: 2021, unique_user_count: 1 },
    { year: 2013, unique_user_count: 1 },
    { year: 2009, unique_user_count: 1 },
    { year: 2008, unique_user_count: 1 },
    { year: 2006, unique_user_count: 1 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="mb-6">
        <Link
          to="/data-mining-process"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
          Back to Data Mining Process
        </Link>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          EDA Insights: <code>User-video.json</code>
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Phân tích Khám phá Dữ liệu chi tiết về tương tác của người dùng với
          nội dung video.
        </p>
      </header>

      {/* Section 1: File Information */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        {/* <PlayCircleIcon className="h-8 w-8 text-indigo-600 mb-3" /> */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Thông Tin File <code>User-video.json</code>
        </h2>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert space-y-4">
          <p>
            File này chứa dữ liệu chi tiết về cách người dùng tương tác với các
            bài giảng video trong các khóa học. Thông tin chính bao gồm một mảng
            (array) <code>seq</code>, đại diện cho chuỗi các hành động xem video
            của người dùng.
          </p>
          <div className="my-4 text-center">
            <img
              src="/images/eda/user-videos/uv_info.png"
              alt="Cấu trúc thông tin trong User-video.json"
              className="max-w-full md:max-w-xl h-auto mx-auto rounded-md shadow border dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minh họa cấu trúc dữ liệu <code>User-video.json</code>.
            </p>
          </div>
          <p>
            Mỗi đối tượng trong mảng <code>seq</code> ghi lại trình tự thời gian
            người dùng xem một video cụ thể, bao gồm các phân đoạn (segments)
            xem. Mỗi segment chứa các thông tin:
          </p>
          <ul className="list-disc list-inside text-sm my-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <li>
              <code>video_id</code>: ID của video được xem.
            </li>
            <li>
              <code>start_point</code>: Thời điểm bắt đầu xem trong video (tính
              bằng giây).
            </li>
            <li>
              <code>end_point</code>: Thời điểm kết thúc xem trong video (tính
              bằng giây).
            </li>
            <li>
              <code>speed</code>: Tốc độ xem video (ví dụ: 1.0, 1.25, 1.5).
            </li>
            <li>
              <code>local_start_time</code>: Dấu thời gian (timestamp) Unix ghi
              lại thời điểm bắt đầu của phân đoạn xem này.
            </li>
          </ul>
          <p>
            <strong>
              Ví dụ một phần tử trong mảng <code>seq</code>:
            </strong>
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md text-xs overflow-x-auto">
            <code>
              {`{
  'video_id': 'V_1395633',
  'segment': [
    {
      'start_point': 130.0,
      'end_point': 190.0,
      'speed': 1.0,
      'local_start_time': 1588431144
    },
    {
      'start_point': 220.0,
      'end_point': 250.0,
      'speed': 1.0,
      'local_start_time': 1588431234
    },
    // ... more segments
  ]
}`}
            </code>
          </pre>
          <p className="mt-3">
            Trong quá trình tiền xử lý, chúng tôi đã tiến hành phân tách cột{" "}
            <code>seq</code> thành các cột riêng biệt: <code>video_id</code>, và
            từ mỗi phần tử trong <code>segment</code>, chúng tôi trích xuất{" "}
            <code>start_point</code>, <code>end_point</code>, <code>speed</code>
            , và <code>local_start_time</code> để phục vụ cho việc phân tích chi
            tiết hơn.
          </p>
        </div>
      </section>

      {/* Section 2: Key EDA Insights */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        {/* <EyeIcon className="h-8 w-8 text-indigo-600 mb-3" /> */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Một Số Key EDA Insights
        </h2>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Phạm Vi Thời Gian Xem Video
            </h4>
            <p>
              Dựa trên cột <code>local_start_time</code>, thời gian người dùng
              xem video sớm nhất được ghi nhận bắt đầu từ{" "}
              <strong>ngày 13 tháng 12 năm 2001</strong>, và lần xem video cuối
              cùng trên nền tảng là vào{" "}
              <strong>ngày 12 tháng 2 năm 2022</strong>.
            </p>
            <div className="my-4 text-center">
              <img
                src="/images/eda/user-videos/first_and_last_watching_time.png"
                alt="Thời gian xem video sớm nhất và muộn nhất"
                className="max-w-full md:max-w-lg h-auto mx-auto rounded-md shadow border dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minh họa phạm vi thời gian xem video.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Phân Tích Cột <code>local_start_time</code> (Năm Xem Video)
            </h4>
            <p>
              Phân tích sâu hơn về thời gian xem cho thấy phần lớn người dùng
              (unique users) xem video tập trung vào năm <strong>2020</strong>.
              Các năm khác có số lượng người dùng xem video rất ít.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-start">
              <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img
                  src="/images/eda/user-videos/video_watch_timestamps_histogram.png"
                  alt="Histogram thời gian xem video"
                  className="w-full h-auto rounded-md shadow"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Histogram phân bố các lượt xem video theo thời gian.
                </p>
              </div>
              <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img
                  src="/images/eda/user-videos/number_of_watch_events_every_year_bar.png"
                  alt="Số lượt xem video mỗi năm"
                  className="w-full h-auto rounded-md shadow"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Biểu đồ cột số lượng lượt xem video theo từng năm.
                </p>
              </div>
            </div>
            <p className="mb-2">
              Bảng thống kê số lượng người dùng duy nhất xem video theo năm:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-[300px] text-sm border border-gray-300 dark:border-gray-600 rounded-md">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                      Năm (Year)
                    </th>
                    <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                      Số User Duy Nhất (Unique User Count)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {yearData
                    .sort((a, b) => b.unique_user_count - a.unique_user_count)
                    .map(
                      (
                        item // Sort by count desc
                      ) => (
                        <tr
                          key={item.year}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-3 py-1.5 text-center">
                            {item.year}
                          </td>
                          <td className="px-3 py-1.5 text-center">
                            {item.unique_user_count.toLocaleString()}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            <p className="p-3 my-2 bg-sky-50 dark:bg-sky-900/40 border-l-4 border-sky-400 dark:border-sky-500 text-sky-700 dark:text-sky-200 rounded-md">
              <strong className="font-semibold">Nhận xét:</strong> Hoạt động xem
              video chủ yếu diễn ra vào năm 2020. Điều này có thể do thời điểm
              thu thập dữ liệu, sự phổ biến của các khóa học trong năm đó, hoặc
              các yếu tố bên ngoài như đại dịch COVID-19 làm tăng nhu cầu học
              trực tuyến.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Phân Tích Cột <code>speed</code> (Tốc Độ Xem Video)
            </h4>
            <p>
              Người dùng có thể điều chỉnh tốc độ phát video. Dưới đây là thống
              kê các chế độ tốc độ xem và tỷ lệ người dùng sử dụng:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-md">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                        Tốc Độ (Speed)
                      </th>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                        Số Users
                      </th>
                      <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                        Tỷ Lệ (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {speedData.map((item) => (
                      <tr
                        key={item.speed}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-3 py-1.5 text-center">
                          {item.speed.toFixed(2)}x
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          {item.num_users.toLocaleString()}
                        </td>
                        <td className="px-3 py-1.5 text-center">
                          {item.percentage.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center p-3">
                <img
                  src="/images/eda/user-videos/speed_watching_video.png"
                  alt="Phân phối tốc độ xem video"
                  className="max-w-xs h-auto mx-auto rounded-md shadow"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Biểu đồ tròn thể hiện phân phối % người dùng theo tốc độ xem.
                </p>
              </div>
            </div>
            <p className="p-3 my-2 bg-sky-50 dark:bg-sky-900/40 border-l-4 border-sky-400 dark:border-sky-500 text-sky-700 dark:text-sky-200 rounded-md">
              <strong className="font-semibold">Nhận xét:</strong> Phần lớn
              người dùng (gần 62%) xem video ở tốc độ bình thường (1.0x). Tuy
              nhiên, một tỷ lệ đáng kể cũng tăng tốc độ xem (1.25x, 1.5x, 2.0x),
              cho thấy nhu cầu tùy chỉnh trải nghiệm học tập. Rất ít người dùng
              giảm tốc độ xem (0.5x).
            </p>
          </div>
          <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700 rounded-md text-sm">
            <p className="text-sky-700 dark:text-sky-300">
              <strong className="font-medium">Chi tiết kỹ thuật:</strong> Việc
              phân tích cụ thể và mã nguồn cho quá trình tách dữ liệu này có thể
              được tham khảo tại:
              <a
                href={codeLink} // Use the variable defined at the top
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
              >
                Xem Code Tách Dữ Liệu →
              </a>
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-12">
        <p>
          Những phân tích này về <code>User-video.json</code> giúp hiểu rõ hơn
          về hành vi tương tác video của người dùng.
        </p>
      </footer>
    </div>
  );
};

export default EdaUserVideoPage;
