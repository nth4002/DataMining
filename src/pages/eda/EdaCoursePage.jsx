// src/pages/eda/EdaCoursePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// You might add specific icons for sections if you like
// import { InformationCircleIcon, TagIcon, DocumentMagnifyingGlassIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const EdaCoursePage = () => {
  const codeLink =
    "https://www.kaggle.com/code/hungthanhnguyen/courseandcoursefieldeda-c26cde/edit";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {" "}
      {/* Increased base spacing */}
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
          EDA Insights: <code>Course.json</code>
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Phân tích Khám phá Dữ liệu chi tiết cho metadata của các Khóa học.
        </p>
      </header>
      {/* General Information Section */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        {/* <InformationCircleIcon className="h-8 w-8 text-indigo-600 mb-3" /> */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Thông Tin Chung về File <code>Course.json</code>
        </h2>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert space-y-4">
          <p>
            File <code>Course.json</code> chứa metadata quan trọng mô tả các
            khóa học trong bộ dữ liệu MOOCCubeX. Phân tích file này giúp chúng
            tôi hiểu rõ hơn về đặc điểm, cấu trúc và nội dung của các khóa học
            được cung cấp.
          </p>
          <p>
            Tổng cộng có khoảng <strong>3781 khóa học (courses)</strong> được
            ghi nhận trong file dữ liệu này.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-start">
            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <img
                src="/images/eda/courses/course_info.png"
                alt="Sơ đồ thông tin chung của Course.json"
                className="max-w-full h-auto mx-auto rounded-md shadow"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Minh họa cấu trúc thông tin khóa học (Course Info).
              </p>
            </div>
            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <img
                src="/images/eda/courses/resource_info.png"
                alt="Sơ đồ thông tin tài nguyên (resource) của khóa học"
                className="max-w-full h-auto mx-auto rounded-md shadow"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Minh họa cấu trúc thông tin tài nguyên (Resource Info).
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Column Analysis Sections */}
      {/* Name Column */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Phân Tích Cột <code>name</code> (Tên Khóa Học)
        </h3>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
          <p>
            Số lượng giá trị rỗng (null) trong cột này là <strong>0</strong>,
            cho thấy tất cả các khóa học đều có tên.
          </p>
          <p>Một vài ví dụ về tên khóa học:</p>
          <ul className="list-disc list-inside text-sm my-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <li>Viết sáng tạo hướng dẫn thực tế</li>
            <li>
              Những điều cơ bản về lập trình máy tính (các khóa học trước yêu
              cầu)
            </li>
            <li>Lý thuyết và thực hành xây dựng xã hội chủ nghĩa</li>
            <li>
              Logic kinh doanh bootcamp: logic cơ bản mà giới tinh hoa đang học
            </li>
            <li>Hành chính công</li>
          </ul>
        </div>
      </section>
      {/* Field Column */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Phân Tích Cột <code>field</code> (Lĩnh Vực)
        </h3>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
          <p>
            Số lượng giá trị rỗng (null) trong cột này là <strong>3224</strong>,
            cho thấy một phần lớn các khóa học không có thông tin lĩnh vực được
            chỉ định.
          </p>
          <p>
            Số lượng lĩnh vực (field) duy nhất trong dữ liệu là{" "}
            <strong>145</strong>.
          </p>
          <p>Một vài ví dụ về lĩnh vực:</p>
          <ul className="list-disc list-inside text-sm my-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <li>Khoa học hệ thống</li>
            <li>Hành chính công, địa lý</li>
            <li>Khoa học và Công nghệ công cụ, Kỹ thuật quang học</li>
            <li>
              Công việc chính trị quân sự, tư tưởng quân sự và lịch sử quân sự,
              khoa học chính trị
            </li>
          </ul>
        </div>
      </section>
      {/* About Column */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Phân Tích Cột <code>about</code> (Mô Tả Khóa Học)
        </h3>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
          <p>
            Số lượng giá trị rỗng (null) trong cột này là <strong>87</strong>.
          </p>
          <p>
            Một vài ví dụ về mô tả khóa học (đã được dịch hoặc giữ nguyên nếu có
            ký tự đặc biệt):
          </p>
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-2 text-sm">
            <p>
              "Khóa học này giải thích quá trình cơ bản, khái niệm và phương
              pháp thiết kế cấu trúc quần áo, phân tích mối quan hệ giữa cấu
              trúc cơ thể con người của quần áo và xương người, cơ bắp, v.v..."
            </p>
            <p>
              "Phổ biến khoa học lúc đầu trong khi vui chơi mở rộng kiến thức,
              khám phá khoa học. Trong khóa học, chúng tôi sẽ giới thiệu cách
              các nhà khoa học cách tìm các phân tử đó, chẳng hạn như morphin,
              aspirin, taxol, insulin, đã thay đổi thế giới. Và chúng tôi cũng
              sẽ giới thiệu Hiến pháp hóa học, cơ chế và ảnh hưởng của các phân
              tử đó."
            </p>
          </blockquote>
        </div>
      </section>
      {/* Data Splitting Section */}
      <section className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        {/* <CpuChipIcon className="h-8 w-8 text-indigo-600 mb-3" /> */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Tách Dữ Liệu từ Cột <code>resource</code>
        </h2>
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert space-y-4">
          <p>
            Thông tin về tài nguyên khóa học (video, bài tập) ban đầu có thể
            được cấu trúc trong một cột phức hợp như <code>resource</code>. Để
            phục vụ cho việc phân tích chi tiết hơn, chúng tôi đã tiến hành tách
            cột này thành các cột riêng biệt và có ý nghĩa hơn:
            <code>title</code> (tiêu đề tài nguyên), <code>resource_id</code>{" "}
            (ID tài nguyên), và <code>chapter</code> (chương/phần mục mà tài
            nguyên thuộc về).
          </p>
          <div className="my-4 text-center">
            <img
              src="/images/eda/courses/exercise_video_info.png"
              alt="Minh họa việc tách cột resource"
              className="max-w-full md:max-w-lg h-auto mx-auto rounded-md shadow border dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Sơ đồ minh họa quá trình tách dữ liệu từ cột <code>resource</code>
              .
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
          Phân tích chi tiết file <code>Course.json</code> cung cấp nền tảng
          vững chắc cho việc hiểu và xử lý dữ liệu khóa học.
        </p>
      </footer>
    </div>
  );
};

export default EdaCoursePage;
