// src/pages/DataMiningPage.jsx
import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid"; // For accordion toggle icons
import { Link } from "react-router-dom";
// You might want specific icons for each section header as well
// import { DocumentTextIcon, TableCellsIcon, PuzzlePieceIcon, LightBulbIcon, CodeBracketIcon, ExclamationTriangleIcon, FolderOpenIcon, MagnifyingGlassIcon, CogIcon } from '@heroicons/react/24/outline';

// Reusable Accordion Item Component
const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  icon: IconComponent,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-3 overflow-hidden">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full px-5 py-4 font-medium text-left text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-150"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="flex items-center">
            {IconComponent && (
              <IconComponent className="h-6 w-6 mr-3 text-indigo-600" />
            )}
            <span className="text-lg">{title}</span>
          </span>
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500 transform" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </h2>
      {isOpen && (
        <div className="px-5 py-4 border-t border-gray-200 bg-white">
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DataMiningPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null); // ID of the currently open accordion item, or null

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id); // Allow only one to be open
  };

  const accordionSections = [
    {
      id: "intro",
      title: "1. Giới thiệu  và Mục đích tổng quan",
      // icon: LightBulbIcon,
      content: (
        <>
          <p>
            Nền tảng xây dựng BI tool và các mô hình dự đoán của nhóm là xuất
            phát sự chuẩn bị dữ liệu kỹ lưỡng. Trang này nhằm bố cục và đưa ra
            quy trình khai phá dữ liệu toàn diện của nhóm để biến đổi dữ liệu
            thô thành thành dữ liệu có thể dùng cho việc xây dựng các mô hình dự
            đoán. Chúng tôi đã lưu trữ dữ liệu đã xử lý thành một bảng thống
            nhất <code>student_data</code>
          </p>
          <p>
            Mục tiêu chính là tạo ra một bộ dataset sạch, đáng tin cậy, và có
            nhiều thuộc tính, phù hợp cho việc dự kết quả đầu ra học tập của học
            sinh-sinh viên (pass/ fail) và cung cấp các trực quan hóa có ý nghĩa
            trên dashboard.
          </p>
        </>
      ),
    },
    {
      id: "sources",
      title: "2. Nguồn dữ liệu thô ban đầu",
      // icon: FolderOpenIcon,
      content: (
        <>
          <p>
            Dữ liệu thô ban đầu được lấy từ
            <Link to={"https://github.com/THU-KEG/MOOCCubeX/tree/main"}>
              {" "}
              <strong className="text-indigo-600">MOOCCubex Dataset</strong>
            </Link>{" "}
            Các file dữ liệu là file JSON và file txt rất lớn (thường là
            MBs/GBs), bao gồm:{" "}
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Course.json:</strong> Chứa metadata about courses (e.g.,
              course introduction, field, prerequisite, course name,, course
              id).
            </li>
            <li>
              <strong>User-video.json:</strong> Detailed student interactions
              with video content. (including user_id and the sequences of time
              the user watching video, including start and end time of the
              video, the speed of watching the video)
            </li>
            <li>
              <strong>User-problem.json:</strong> Logged student attempts and
              performance on problems/questions. The columns include:{" "}
              <code>user_id</code>, <code>problem_id</code>,{" "}
              <code>attempts</code>, <code>score</code>,{" "}
              <code>submit time</code>, etc.
            </li>
            <li>
              <strong>Problem.json:</strong> Metadata about the problems
              themselves (e.g., problem ID, type, score, answer, exercise id).
            </li>
            <li>
              <strong>Exercise-problem.txt:</strong> Mapped problems to specific
              exercises or modules within courses.
            </li>
          </ul>
          <p>These files were sourced from [MOOCCubex Dataset].</p>
        </>
      ),
    },
    {
      id: "eda",
      title: "3. Exploratory Data Analysis (EDA) Highlights",
      // icon: MagnifyingGlassIcon,
      content: (
        <>
          <p>
            Trước khi tiến hành biến đổi dữ liệu, quy trình EDA được áp dụng
            toàn diện bằng cách sử dụng các thư viện của Python như{" "}
            <strong>Pandas</strong> và <strong>Matplotlib</strong>. Một số thông
            tin chi tiết về EDA cho từng nguồn dữ liệu được trình bày riêng để
            dễ theo dõi:
          </p>
          <ul className="list-disc list-inside space-y-2 my-4">
            <li>
              <strong>
                File <code>user.json</code>:
              </strong>{" "}
              Khám phá thông tin về user, và metadata liên quan.
              <Link
                to="/data-mining-process/eda/users"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
            <li>
              <strong>
                File <code>Course.json</code>:
              </strong>{" "}
              Phân tích cấu trúc khóa học, số lượng video/bài tập, phân bố lĩnh
              vực.
              <Link
                to="/data-mining-process/eda/course"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
            <li>
              <strong>
                File <code>User-video.json</code>:
              </strong>{" "}
              Kiểm tra thời gian xem, tốc độ xem, các mẫu tương tác video của
              người dùng.
              <Link
                to="/data-mining-process/eda/user-video"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
            <li>
              <strong>
                File <code>User-problem.json</code>:
              </strong>{" "}
              Phân tích số lần thử, điểm số, thời gian nộp bài cho các câu hỏi.
              <Link
                to="/data-mining-process/eda/user-problem"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
            <li>
              <strong>
                File <code>Problem.json</code>:
              </strong>{" "}
              Khám phá các loại câu hỏi, độ khó, và metadata liên quan.
              <Link
                to="/data-mining-process/eda/problem"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
            <li>
              <strong>
                File <code>Exercise-problem.txt</code>:
              </strong>{" "}
              Phân tích mối quan hệ giữa bài tập và câu hỏi, cấu trúc module.
              <Link
                to="/data-mining-process/eda/exercise-problem"
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Xem chi tiết EDA
              </Link>
            </li>
          </ul>
          <p>
            Bạn cũng có thể tham khảo bản báo cáo tổng hợp về chiến lược gộp
            file và các phát hiện EDA ban đầu tại đây:
            <a
              href="https://docs.google.com/document/d/1ZiXJ-HDHoT9k7mmgNuYs0fNvu608_qbX6u_c6IfqKJA/edit?tab=t.0#heading=h.tbqj2q20u698"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Báo cáo gộp file & EDA
            </a>
            .
          </p>
          <p className="mt-2 p-3 bg-sky-50 rounded-md text-sm text-sky-700">
            <strong className="font-semibold">
              Tóm tắt Insight chính từ EDA tổng thể:
            </strong>{" "}
            File <code>user_info.json</code> ban đầu chứa khoảng 3 triệu user,
            với cột <code>gender</code> có 6 giá trị khác nhau (0, 1, 2, 3, 232,
            và null), điều này cho thấy sự cần thiết phải làm sạch và chuẩn hóa
            dữ liệu giới tính.
          </p>
        </>
      ),
    },
    {
      id: "cleaning",
      title: "4. Data Cleaning & Preprocessing",
      // icon: CogIcon,
      content: (
        <>
          <p>
            Giai đoạn này tập trung vào tinh chỉnh data đáp ứng các tiêu chí
            accuracy và consistency, chủ yếu sử dụng <strong>Polars</strong> and{" "}
            <strong>Pandas</strong> do tính hiệu quả và tốc độ xử lý của chúng
            với các datasets lớn.
          </p>
          <div className="space-y-4">
            {" "}
            {/* Adds space between list items if they become multi-line */}
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  ✔
                </span>{" "}
                {/* Checkmark icon or other */}
                Lọc Dữ Liệu (Filtering):
              </h5>
              <p className="ml-6 text-gray-600 dark:text-gray-400">
                Các users được giới hạn trong phạm vi những người học{" "}
                <strong>từ 50 khóa học trở xuống</strong>. Những users không đáp
                ứng điều kiện này được xem là các trường hợp ngoại lệ
                (outliers), có khả năng không phải là tài khoản học sinh thông
                thường, và đã được loại bỏ để tập trung phân tích vào nhóm đối
                tượng chính. Ngoài ra, [đề cập đến bất kỳ bộ lọc chính nào khác,
                ví dụ: "các tài khoản test của quản trị viên cũng đã được loại
                bỏ"].
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">
                  ✔
                </span>
                Xử Lý Giá Trị Bị Thiếu (Fill Missing Values):
              </h5>
              <p className="ml-6 text-gray-600 dark:text-gray-400 mb-2">
                Một thách thức đáng kể là tỉ lệ giá trị bị thiếu cao trong cột{" "}
                <code>score</code> của bộ dữ liệu <code>user-problem.json</code>{" "}
                (trên 50%). Để giải quyết vấn đề này, nhóm đã tham chiếu thêm bộ
                dữ liệu <code>entities/problem.json</code>. Tuy nhiên,{" "}
                <code>problem.json</code> cũng có tỉ lệ thiếu cột{" "}
                <code>score</code> khoảng 24%.
              </p>
              <p className="ml-6 text-gray-600 dark:text-gray-400">
                Do đó, một chiến lược điền khuyết chéo (cross-imputation) giữa
                hai bộ dữ liệu này đã được áp dụng. Các giá trị{" "}
                <code>score</code> bị thiếu trong một file được cố gắng điền từ
                thông tin có sẵn trong file kia, dựa trên các khóa chung (ví dụ:{" "}
                <code>problem_id</code>).
              </p>
              <div className="ml-6 mt-3 p-3 bg-sky-50 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700 rounded-md">
                <p className="text-sm text-sky-700 dark:text-sky-300">
                  <strong className="font-medium">Chi tiết chiến lược:</strong>{" "}
                  Phương pháp điền khuyết cụ thể, bao gồm các quy tắc ưu tiên và
                  xử lý trường hợp cả hai nguồn đều thiếu, được mô tả chi tiết
                  trong báo cáo kỹ thuật của chúng tôi.
                  <a
                    href="https://docs.google.com/document/d/1ZiXJ-HDHoT9k7mmgNuYs0fNvu608_qbX6u_c6IfqKJA/edit?tab=t.0#heading=h.onwosjrsps3g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
                  >
                    Đọc báo cáo chi tiết tại đây →
                  </a>
                </p>
              </div>
            </div>
            {/* Add more list items here if you have other cleaning steps */}
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Các bước làm sạch khác bao gồm việc chuẩn hóa định dạng ngày tháng,
            sửa lỗi không nhất quán về kiểu dữ liệu và xử lý các mục nhập rõ
            ràng là sai sót.
          </p>
        </>
      ),
    },
    {
      id: "integration",
      title: "5. Data Integration & Merging",
      // icon: PuzzlePieceIcon, // Example
      content: (
        <>
          <p className="mb-3">
            Việc kết hợp các tập dữ liệu đã được làm sạch thành một khung nhìn
            thống nhất là một bước phức tạp nhưng vô cùng quan trọng. Quá trình
            này bao gồm nhiều thao tác join (kết hợp) dựa trên các định danh
            chung như <code>user_id</code>, <code>course_id</code>, và{" "}
            <code>problem_id</code>.
          </p>

          {/* Sub-section 1: Combine user with user-problem and course */}
          <div className="mt-6 mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              5.1 Kết Hợp Dữ Liệu User, User-Problem, và Course
            </h4>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Các bộ dữ liệu chính được sử dụng trong bước này:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-3">
              <li>
                <code>relations/user-problem.json</code>
              </li>
              <li>
                <code>entities/problem.json</code>
              </li>
              <li>
                <code>entities/course.json</code>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              <a
                href="[LINK_TO_YOUR_CODE_FOR_DATA_SPLITTING_AND_INITIAL_MERGE]"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-sky-100 dark:bg-sky-700 text-sky-700 dark:text-sky-200 rounded-full hover:bg-sky-200 dark:hover:bg-sky-600 transition-colors"
              >
                Link Code Chia Data & Merge Ban Đầu
              </a>
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <a
                href="[LINK_TO_PART_1_DATA]"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Dữ liệu (46 files đầu)
              </a>
              <a
                href="[LINK_TO_PART_2_DATA]"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Dữ liệu (4 files cuối)
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Đầu tiên, chúng tôi tiến hành lọc để lấy các user hợp lệ (những
              người dùng học từ 50 khóa học trở xuống).
            </p>
            <div className="my-3 text-center">
              <img
                src="/images/combine_images/combine_up_with_valid_user.png"
                alt="Kết quả sau khi lọc user hợp lệ và kết hợp user-problem"
                className="max-w-full md:max-w-lg h-auto mx-auto rounded-md shadow border dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minh họa kết quả sau khi lọc user và kết hợp user-problem.
              </p>
            </div>
          </div>

          {/* Sub-section 2: Combine exercise-problem with user-problem and course */}
          <div className="mt-6 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              5.2 Kết Hợp Exercise-Problem với User-Problem và Course
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Tiếp theo, chúng tôi kết hợp và thêm cột <code>exercise_id</code>{" "}
              tương ứng cho cột <code>problem_id</code>. Điều này cung cấp cơ sở
              để gán nhãn dữ liệu và xác định <code>course_id</code> cho từng
              problem.
            </p>
            <div className="my-3 text-center">
              <img
                src="/images/combine_images/combine_ep_with_up.png"
                alt="Kết hợp exercise-problem với user-problem"
                className="max-w-full md:max-w-lg h-auto mx-auto rounded-md shadow border dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minh họa việc thêm <code>exercise_id</code>.
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Từ <code>exercise_id</code>, chúng tôi xác định problem này thuộc
              course nào bằng cách tham chiếu đến dữ liệu trong file{" "}
              <code>course.json</code>. Một thống kê đáng chú ý từ file course:{" "}
              <strong>11 khóa học không có video</strong>, và{" "}
              <strong>577 khóa học không có bài tập</strong>.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Chúng tôi đã lọc và chỉ giữ lại các khóa học có đủ cả exercises và
              videos. Sau khi kết hợp file user-problem với ánh xạ
              exercise-course, các problem có <code>course_id</code> là null (do
              exercise không tồn tại trong file <code>course.json</code> đã được
              lọc) đã bị loại bỏ.
            </p>
            <div className="mt-3 p-3 bg-sky-50 dark:bg-sky-900/40 border border-sky-200 dark:border-sky-700 rounded-md">
              <p className="text-sm text-sky-700 dark:text-sky-300 font-semibold">
                Kết quả sau khi sàng lọc và kết hợp:
              </p>
              <ul className="list-disc list-inside text-sm ml-4">
                <li>
                  Số lượng khóa học giảm xuống còn <strong>1250 courses</strong>
                  .
                </li>
                <li>
                  Số lượng exercises giảm từ ~888,742 xuống còn{" "}
                  <strong>19,012 exercises</strong>.
                </li>
              </ul>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <img
                    src="/images/combine_images/num_courses_after_merging.png"
                    alt="Số lượng course sau merge"
                    className="w-full h-auto rounded-md shadow border dark:border-gray-600"
                  />
                  <p className="text-xs text-center mt-1">
                    Số lượng course sau khi merge.
                  </p>
                </div>
                <div>
                  <img
                    src="/images/combine_images/num_exercises_after_merging.png"
                    alt="Số lượng exercise sau merge"
                    className="w-full h-auto rounded-md shadow border dark:border-gray-600"
                  />
                  <p className="text-xs text-center mt-1">
                    Số lượng exercise sau khi merge.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6">
            Đây là các bước chính trong việc tích hợp và gộp file. Logic chi
            tiết, bao gồm việc xử lý các mức độ chi tiết khác nhau và đảm bảo
            tính toàn vẹn dữ liệu qua các phép join, rất phức tạp.
          </p>
          <p className="mt-4">
            <a
              href="https://docs.google.com/document/d/1ZiXJ-HDHoT9k7mmgNuYs0fNvu608_qbX6u_c6IfqKJA/edit?tab=t.0#heading=h.onwosjrsps3g" // Your existing link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />{" "}
              {/* Optional icon */}
              Đọc Báo Cáo Chi Tiết Về Gộp Dữ Liệu →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "aggregation",
      title: "6. Feature Engineering & Aggregation",
      // icon: TableCellsIcon,
      content: (
        <>
          <p>
            To prepare data for modeling and dashboarding, many features in the
            final <code>student_data</code> table were engineered through
            aggregation. This primarily involved:
          </p>
          <ul className="list-disc list-inside">
            <li>
              Calculating weekly summaries for each student in each course:{" "}
              <code>questions_done_weekN</code>,{" "}
              <code>attempts_count_weekN</code>,{" "}
              <code>correct_answer_weekN</code>, <code>total_score_weekN</code>,{" "}
              <code>user_watching_time_weekN</code>.
            </li>
            <li>
              Computing overall course-level engagement metrics per student:{" "}
              <code>total_watch_time_minutes_per_course</code>,{" "}
              <code>average_watch_time_per_video_per_course</code>,{" "}
              <code>average_speed</code>.
            </li>
          </ul>
          <p>
            These aggregated features provide a time-series and summary view of
            student engagement.
          </p>
        </>
      ),
    },
    {
      id: "outcomes",
      title: "7. Định Nghĩa Kết Quả Đầu Ra (Pass/Fail)",
      // icon: CheckBadgeIcon, // Example from Heroicons
      content: (
        <>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            Việc xác định cột <code>classification</code> (Đậu/Rớt) cho mỗi bản
            ghi sinh viên-khóa học là một bước then chốt, đòi hỏi một phương
            pháp luận rõ ràng dựa trên các chỉ số kết quả có sẵn trong dữ liệu
            nguồn. Quá trình này không chỉ đơn thuần là gán nhãn mà còn phản ánh
            cách chúng tôi định nghĩa "sự thành công" trong bối cảnh khóa học.
          </p>

          <div className="mt-4 mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Phương Pháp Tiếp Cận:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Với mỗi khóa học, thường có một lượng lớn các bài tập (exercises).
              Chúng tôi đã tiến hành thống kê và quyết định sử dụng
              <strong>điểm số của bài tập cuối cùng</strong> trong mỗi khóa học
              làm một trong những tiêu chí chính để đánh giá việc hoàn thành
              khóa học của sinh viên.
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Link code cho quá trình phân tích và gán nhãn:
              <a
                href="https://www.kaggle.com/code/februarysmith/assigning-label"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
              >
                Xem Code Chi Tiết
              </a>
            </div>
          </div>

          <div className="mt-6 mb-6">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Phân Tích Thang Điểm (Score Scale Analysis):
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Thống kê sơ bộ cho thấy có khoảng{" "}
              <strong>74 thang điểm (score scales)</strong> khác nhau trong bộ
              dữ liệu. Sau khi nghiên cứu các hệ thống thang điểm phổ biến trên
              thế giới, chúng tôi đã xác định một số thang điểm chính xác và hợp
              lệ thường gặp, ví dụ (score và số lần xuất hiện - count):
            </p>
            {/* Simple table for score distribution */}
            <div className="overflow-x-auto mb-4">
              <table className="min-w-[300px] text-sm border border-gray-300 dark:border-gray-600 rounded-md">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                      Score (f64)
                    </th>
                    <th className="px-3 py-2 font-medium text-gray-600 dark:text-gray-300">
                      Count (u32)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { score: 100.0, count: 31 },
                    { score: 20.0, count: 89 },
                    { score: 10.0, count: 159 },
                    { score: 7.0, count: 42 },
                    { score: 6.0, count: 77 },
                    { score: 5.0, count: 107 },
                    { score: 4.0, count: 67 },
                  ].map((item) => (
                    <tr
                      key={item.score}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-3 py-1.5 text-center">
                        {item.score.toFixed(1)}
                      </td>
                      <td className="px-3 py-1.5 text-center">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sự đa dạng này đòi hỏi một chiến lược gán nhãn linh hoạt nhưng vẫn
              đảm bảo tính nhất quán.
            </p>
          </div>

          <div className="mt-6 mb-6">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Tiêu Chí Phân Loại Pass/Fail:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Dựa trên chiến lược gán nhãn đã được xác định (chi tiết trong báo
              cáo), chúng tôi đã tiến hành phân loại sinh viên thành "Pass" hoặc
              "Fail".
            </p>
            <div className="my-4 text-center">
              <img
                src="/images/combine_images/classify_score_criteria.png"
                alt="Tiêu chí phân loại điểm số Pass/Fail"
                className="max-w-full md:max-w-xl h-auto mx-auto rounded-lg shadow-lg border dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minh họa tiêu chí phân loại điểm để xác định Pass/Fail.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/40 border-l-4 border-indigo-500 dark:border-indigo-600 rounded-md">
            <p className="text-sm text-indigo-700 dark:text-indigo-200">
              <strong className="font-semibold">Đọc thêm:</strong> Để hiểu rõ
              hơn về phương pháp luận và các quy tắc cụ thể được áp dụng trong
              việc gán nhãn kết quả Pass/Fail, vui lòng tham khảo tài liệu chi
              tiết của chúng tôi.
              <a
                href="https://docs.google.com/spreadsheets/d/1iyjJKD2AcPRlwTGBC4qaktrEPIjYSSmI/edit?usp=sharing&ouid=104667150871511393748&rtpof=true&sd=true" // Your existing link
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
              >
                Chiến Lược Gán Nhãn Chi Tiết →
              </a>
            </p>
          </div>
        </>
      ),
    },
    {
      id: "challenges",
      title: "8. Khó khăn và thách thức",
      // icon: ExclamationTriangleIcon,
      content: (
        <>
          <p>
            Những khó khăn mà nhóm đã gặp phải trong quá trình Khai phá dữ liệu
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Dữ liệu lớn:</strong> Các file dữ liệu rất lớn, gây cản
              trở trong quá trình EDA. Việc sử dụng các nguồn tài nguyên sẵn có
              không thể đáp ứng được quy trình này. Vì thế nhónm phải tối ưu
              code lại nhiều lần. Việc sử dụng<strong>Polars</strong>, là nhân
              tố chủ chố lần này, vì Polars có thể đáp ứng được việc xử lý và
              cho hiệu năng tốt trên các dataset được xem là larger-than-memory,
              cùng với việc sử dụng các thao tác trên thư virện Pandas cần
              thiết.
            </li>
            <li>
              <strong>Thiếu hụt lượng lớn các giá trị:</strong> Một số course
              trong user-problem không tồn tại trong danh sách course mà dataset
              gốc cung vcấp, dẫn đến 1 số thông tin về bài tập mà user đã làm
              không thể dùng được. Tương tự với file user-video.
            </li>
          </ul>
          <p className="mt-4">
            <a
              href="[LINK_TO_YOUR_MISSING_VALUE_STRATEGY_DOC]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Details on our Missing Value Handling Strategy →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "finalDataset",
      title: "9. Final Dataset: student_data",
      // icon: CircleStackIcon,
      content: (
        <>
          <p>
            Thành quả cuối cùng của những thao tác trên là bộ dữ liệu dạn g bảng
            (tabular data) <code>student_data</code> table, được sử dụng làm đầu
            vào chính cho các mô hình dự đoán và xây dựng các hình ảnh trực quan
            về hành vi học tập của học sinh trên dashboard.
          </p>
          <p className="mt-4">
            <a
              href="https://www.kaggle.com/datasets/februarysmith/final-dataset-with-classification-cs313"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
            >
              Link dataset tại đây →
            </a>
          </p>
        </>
      ),
    },
    {
      id: "tools",
      title: "10. Các tools & công nghệ đã sử dụng",
      // icon: CodeBracketIcon,
      content: (
        <>
          <p>
            Project này dựa phần lớn vào hệ sinh thái Python cho Khoa học dữ
            liệu
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Python:</strong> Ngôn ngữ lập trình chính
            </li>
            <li>
              <strong>Pandas:</strong> Sử dụng cho "data manipulation" và phân
              tích data.
            </li>
            <li>
              <strong>Polars:</strong> Tương tự như Polars nhưng được tối ưu để
              chạy nhanh hơn.
            </li>
            <li>
              <strong>Matplotlib (pyplot):</strong> Dùng để tạo ra các plot,
              graph tĩnh, hoặc các hình ảnh có thể tương tác trong quá trình
              EDA.
            </li>
            <li>
              <strong>NumPy:</strong> Sử dụng cho quá trình tính toán.
            </li>
            <li>
              <strong>PostgreSQL:</strong> Lưu trữ data và truy vấn
            </li>
            {/* Add any other key libraries or tools */}
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Constrained width for readability */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          The Journey of Our Data
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          How raw information is transformed into predictive insights.
        </p>
      </header>
      <div className="space-y-1">
        {" "}
        {/* Minimal space between accordion items themselves */}
        {accordionSections.map((section) => (
          <AccordionItem
            key={section.id}
            title={section.title}
            isOpen={openAccordion === section.id}
            onToggle={() => toggleAccordion(section.id)}
            // icon={section.icon} // Uncomment if you add icons to the array
          >
            {section.content}
          </AccordionItem>
        ))}
      </div>
      <footer className="text-center text-gray-500 text-sm mt-16">
        <p>
          This meticulous data process enables the insights you see on our
          dashboard.
        </p>
      </footer>
    </div>
  );
};

export default DataMiningPage;
