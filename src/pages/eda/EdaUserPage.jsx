// src/pages/eda/EdaUserDemographicsPage.jsx (Consider renaming from EdaCoursePage.jsx)
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
// Consider adding icons for sections if desired
// import { IdentificationIcon, AcademicCapIcon, CakeIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const EdaUserPage = () => {
  // Renamed for clarity based on content
  const fullEdaCodeLink1 =
    "https://www.kaggle.com/code/usrnameisnttakenyet/entities-user-part1";
  const fullEdaCodeLink2 =
    "https://www.kaggle.com/code/usrnameisnttakenyet/entities-user-p2";
  const edaSections = [
    {
      id: "userColumns",
      title: "Thông tin các cột của User (entities.json)",
      // icon: IdentificationIcon,
      content: (
        <>
          <p className="mb-2">
            Dữ liệu người dùng ban đầu chứa các thông tin sau:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>
              <strong>id:</strong> User ID, định dạng bắt đầu với{" "}
              <code>U_</code>.
            </li>
            <li>
              <strong>name:</strong> Tên người dùng (Họ và tên).
            </li>
            <li>
              <strong>gender:</strong> Giới tính.
            </li>
            <li>
              <strong>school:</strong> Trường học của người dùng.
            </li>
            <li>
              <strong>year_of_birth:</strong> Năm sinh.
            </li>
            <li>
              <strong>course_order:</strong> Mảng (array) chứa ID của các khóa
              học người dùng đã đăng ký, theo thứ tự.
            </li>
            <li>
              <strong>enroll_time:</strong> Mảng (array) chứa thời gian đăng ký
              tương ứng với mỗi khóa học trong <code>course_order</code>.
            </li>
          </ul>
          <p>
            Dữ liệu này là nền tảng để hiểu rõ hơn về đặc điểm nhân khẩu học và
            lịch sử học tập ban đầu của người dùng.
          </p>
        </>
      ),
    },
    {
      id: "edaPipeline",
      title: "Pipeline Thực Hiện EDA",
      // icon: AdjustmentsHorizontalIcon, // Example from Heroicons
      content: (
        <>
          <p className="mb-2">
            Quá trình Phân tích Dữ liệu Khám phá (EDA) được thực hiện theo các
            bước chính sau:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Phân tích thống kê mô tả:</strong> Tính toán các chỉ số cơ
              bản như trung bình (mean), trung vị (median), mode, độ lệch chuẩn
              cho các cột số và tần suất cho các cột hạng mục.
            </li>
            <li>
              <strong>Trực quan hóa dữ liệu:</strong> Sử dụng biểu đồ
              (histograms, bar charts, box plots, scatter plots) để hiểu phân
              phối dữ liệu và mối quan hệ giữa các biến. Thư viện chính được sử
              dụng là Matplotlib và Seaborn.
            </li>
            <li>
              <strong>Dò tìm giá trị ngoại lai (Outliers):</strong> Xác định và
              phân tích các điểm dữ liệu bất thường có thể ảnh hưởng đến kết quả
              phân tích hoặc mô hình hóa.
            </li>
            <li>
              <strong>Giảm chiều dữ liệu để quan sát (Nếu có):</strong> Áp dụng
              các kỹ thuật như PCA hoặc t-SNE (nếu thực hiện) để trực quan hóa
              dữ liệu đa chiều trong không gian 2D hoặc 3D.
            </li>
            <li>
              <strong>Tạo dashboard trực quan (Nếu có):</strong> Xây dựng các
              dashboard (ví dụ: sử dụng Plotly Dash, Streamlit, hoặc trong
              notebooks) để theo dõi các chỉ số quan trọng và khám phá các mẫu
              dữ liệu theo thời gian một cách tương tác.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: "genderAnalysis",
      title: 'Phân Tích Cột "gender" (Giới Tính)',
      // icon: UsersIcon, // Example
      content: (
        <>
          <p className="mb-2">
            Cột <code>gender</code> trong dữ liệu người dùng ban đầu thể hiện sự
            thiếu nhất quán và có khả năng chứa nhiễu.
          </p>
          <div className="p-3 my-2 bg-orange-50 border-l-4 border-orange-400 text-orange-700">
            <p className="font-semibold">Nhận xét quan trọng:</p>
            <p>
              Cột này có tới 6 giá trị khác nhau: 0, 1, 2, 3, null, và một giá
              trị bất thường là 232. Điều này cho thấy dữ liệu giới tính cần
              được làm sạch và chuẩn hóa cẩn thận. Các giá trị ngoài 0 và 1
              (hoặc một sơ đồ mã hóa giới tính hợp lệ khác) có thể là lỗi nhập
              liệu hoặc đại diện cho các danh mục không xác định/khác.
            </p>
          </div>
          <div className="mt-4 text-center">
            <img
              src="/images/eda/users/user_gender.png"
              alt="Phân phối giới tính ban đầu"
              className="max-w-md mx-auto rounded-lg shadow-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Biểu đồ phân phối các giá trị trong cột 'gender'.
            </p>
          </div>
          <p className="mt-3">
            Bước tiếp theo sẽ là xác định cách xử lý các giá trị này, có thể bao
            gồm việc ánh xạ lại các giá trị hợp lệ, xử lý giá trị null, và quyết
            định cách đối phó với các giá trị ngoại lai như '232'.
          </p>
        </>
      ),
    },
    {
      id: "schoolAnalysis",
      title: 'Phân Tích Cột "school" (Trường Học)',
      // icon: AcademicCapIcon,
      content: (
        <>
          <p className="mb-2">
            Để hiểu rõ hơn về nguồn gốc người dùng, chúng tôi đã phân tích cột{" "}
            <code>school</code> bằng cách nhóm theo các giá trị duy nhất và đếm
            số lượng người dùng tương ứng với mỗi trường.
          </p>
          <div className="p-3 my-2 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="font-semibold">Phát hiện Outlier:</p>
            <p>
              Một giá trị ngoại lai rất rõ ràng là các mục không có thông tin
              trường học (giá trị rỗng hoặc null). Có hơn{" "}
              <strong>2 triệu người dùng</strong> không cung cấp thông tin về
              trường học, chiếm một tỷ lệ đáng kể trong tập dữ liệu.
            </p>
          </div>
          <p className="my-3">
            Dưới đây là một số biểu đồ minh họa phân phối số lượng người dùng
            theo trường (do số lượng trường lớn, chỉ hiển thị các trường phổ
            biến nhất hoặc theo từng cụm):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img
                src="/images/eda/users/user_school_bar.png"
                alt="Phân phối trường học - Phần 1"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Phân phối các trường phổ biến nhất.
              </p>
            </div>
            <div>
              <img
                src="/images/eda/users/user_school_pie.png"
                alt="Phân phối trường học - Phần 2"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-xs text-gray-500 mt-1 text-center">
                Phân phối theo một cụm trường khác (nếu có).
              </p>
            </div>
            {/* Add more images if you have them */}
          </div>
          <p className="mt-3">
            Việc có một lượng lớn dữ liệu trường học bị thiếu là một thách thức
            cần được giải quyết trong giai đoạn làm sạch dữ liệu, có thể bằng
            cách tạo một danh mục 'Không xác định' hoặc xem xét các chiến lược
            điền giá trị nếu có thể.
          </p>
        </>
      ),
    },
    {
      id: "yobAnalysis",
      title: 'Phân Tích Cột "year_of_birth" (Năm Sinh)',
      // icon: CakeIcon,
      content: (
        <>
          <p className="mb-2">
            Phân tích cột năm sinh được thực hiện tương tự như cột trường học,
            bằng cách đếm số lượng người dùng có cùng năm sinh.
          </p>
          <p className="mb-3">
            Từ các quan sát trong quá trình phân tích, chúng tôi xác định độ
            tuổi hợp lệ của một người dùng sẽ thuộc khoảng từ năm 1950 đến 2020.
            Tuy nhiên, với giả định rằng người dùng phải từ 7 tuổi trở lên mới
            có thể tham gia các khóa học MOOC, miền giá trị hợp lệ của cột{" "}
            <code>year_of_birth</code> được điều chỉnh thành từ{" "}
            <strong>1950 đến 2013</strong> (giả sử dữ liệu được thu thập vào
            khoảng năm 2020).
          </p>
          <p className="mb-3">
            Dưới đây là biểu đồ phân phối số lượng người dùng theo năm sinh sau
            khi áp dụng bộ lọc này:
          </p>
          <div className="my-4 text-center">
            <img
              src="/images/eda/users/user_yob_histogram.png"
              alt="Phân phối năm sinh hợp lệ"
              className="max-w-lg mx-auto rounded-lg shadow-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Biểu đồ phân phối năm sinh sau khi lọc giá trị hợp lệ.
            </p>
          </div>
          <p className="mb-2">
            Biểu đồ cho thấy phần lớn người dùng MOOC có độ tuổi từ 1990 đến
            2000, trong đó khoảng 1996-1998 chiếm số lượng lớn nhất.
          </p>
          <p className="mb-3">
            Tiếp theo, chúng tôi sử dụng biểu đồ boxplot để xác định các giá trị
            ngoại lai trong phạm vi năm sinh hợp lệ:
          </p>
          <div className="my-4 text-center">
            <img
              src="/images/eda/users/user_yob_outliers_boxplot.png"
              alt="Boxplot năm sinh"
              className="max-w-md mx-auto rounded-lg shadow-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Biểu đồ boxplot cho cột năm sinh đã được lọc.
            </p>
          </div>
          <div className="p-3 my-2 bg-green-50 border-l-4 border-green-400 text-green-700">
            <p className="font-semibold">Nhận xét từ Boxplot:</p>
            <ul className="list-disc list-inside">
              <li>
                Trong các năm sinh hợp lệ, trung vị (median) là năm{" "}
                <strong>1995</strong>.
              </li>
              <li>
                Tuổi trung bình (mean year of birth) là khoảng{" "}
                <strong>1992</strong>.
              </li>
              <li>
                25% người dùng sinh trước năm 1987 (Q1), và 75% người dùng sinh
                trước năm 1997 (Q3).
              </li>
              <li>
                Khoảng tứ phân vị (IQR = Q3 - Q1) là 10 năm, cho thấy 50% người
                dùng ở giữa có năm sinh cách nhau trong khoảng 10 năm.
              </li>
              <li>
                Các điểm nằm ngoài "râu" của boxplot được coi là các giá trị
                ngoại lai, cần được xem xét thêm.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "courseOrderAnalysis",
      title: 'Phân Tích Cột "course_order" (Thứ Tự Khóa Học)',
      // icon: ClipboardListIcon, // Example
      content: (
        <>
          <p>
            Cột <code>course_order</code> là một mảng chứa ID của các khóa học
            mà người dùng đã đăng ký. Phân tích cột này có thể bao gồm:
          </p>
          <ul className="list-disc list-inside">
            <li>Phân phối số lượng khóa học mỗi người dùng đăng ký.</li>
            <li>
              Xác định các khóa học phổ biến nhất (xuất hiện nhiều nhất trong
              các mảng <code>course_order</code>).
            </li>
            <li>
              Phân tích trình tự đăng ký khóa học (nếu thời gian đăng ký tương
              ứng trong <code>enroll_time</code> được xem xét).
            </li>
            {/* Add more specific points based on what you found interesting or relevant for this column */}
          </ul>
          <p className="mt-3">
            Thông tin này giúp hiểu rõ hơn về hành vi lựa chọn và tiến trình học
            tập của người dùng qua các khóa học khác nhau.
          </p>
          <p className="mb-2">
            Cột <code>course_order</code> chứa một mảng (array) các ID khóa học
            mà mỗi người dùng đã đăng ký. Phân tích cột này giúp chúng ta hiểu
            về mức độ tham gia và sự đa dạng trong lựa chọn khóa học của người
            dùng. Số lượng khóa học một người dùng đăng ký là một chỉ số quan
            trọng.
          </p>
          <p className="mb-3">
            Trong quá trình phân tích ban đầu, chúng tôi nhận thấy một số trường
            hợp người dùng đăng ký một số lượng khóa học rất lớn (ví dụ: hơn cả
            ngàn khóa học). Điều này có thể là dữ liệu nhiễu hoặc các tài khoản
            đặc biệt (ví dụ: tài khoản quản trị, bot). Chúng tôi đã xem xét các
            trường hợp này song song với năm sinh để đánh giá tính hợp lệ.
          </p>

          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2">
            Trực Quan Hóa Phân Phối Số Lượng Khóa Học
          </h4>
          <p className="mb-3">
            Để hình dung rõ hơn về phân phối số lượng khóa học mà người dùng
            đăng ký, chúng tôi đã sử dụng biểu đồ boxplot (với thang log để xử
            lý sự chênh lệch lớn về giá trị) và histogram.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-start">
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <img
                src="/images/eda/users/course_order_boxplot.png"
                alt="Boxplot số lượng khóa học (thang log)"
                className="max-w-full h-auto mx-auto rounded-md shadow"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Biểu đồ Boxplot (thang log) thể hiện phân phối số lượng khóa học
                đã đăng ký.
              </p>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <img
                src="/images/eda/users/course_order_distribution_histogram.png"
                alt="Histogram số lượng khóa học"
                className="max-w-full h-auto mx-auto rounded-md shadow"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Biểu đồ Histogram cho thấy tần suất của số lượng khóa học.
              </p>
            </div>
          </div>

          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mt-6 mb-2">
            Phân Tích Outliers và Kết Luận Sơ Bộ
          </h4>
          <div className="my-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-400 dark:border-indigo-500 text-indigo-700 dark:text-indigo-200 rounded-md">
            <p className="font-semibold mb-1">
              Thông số từ Boxplot và dữ liệu ngoại lai:
            </p>
            <ul className="list-disc list-inside text-sm">
              <li>
                Giá trị tứ phân vị thứ nhất (Q1): <strong>1.0 khóa học</strong>
              </li>
              <li>
                Giá trị trung vị (Median - Q2): <strong>1.0 khóa học</strong>
              </li>
              <li>
                Giá trị tứ phân vị thứ ba (Q3): <strong>2.0 khóa học</strong>
              </li>
              <li>
                Giới hạn "râu" dưới (Whisker Left): -0.5 (cho thấy không có
                outlier ở phía dưới sau khi tính toán, do số khóa học không thể
                âm)
              </li>
              <li>Giới hạn "râu" trên (Whisker Right): 3.5</li>
            </ul>
            <p className="mt-2 text-sm">
              Dữ liệu cũng cho thấy các trường hợp người dùng đăng ký một số
              lượng khóa học rất lớn, được xác định là các giá trị nhiễu hoặc
              ngoại lai. Ví dụ:
            </p>
            {/* Placeholder for the image of the outlier table */}
            <div className="my-3 text-center">
              <img
                src="/images/eda/users/course_order_table_count.png"
                alt="Bảng ví dụ các user có số lượng khóa học ngoại lai"
                className="max-w-md h-auto mx-auto rounded-md shadow border dark:border-gray-600"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ví dụ về các user có số lượng khóa học ngoại lai.
              </p>
            </div>
          </div>

          <div className="p-3 my-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-600 text-green-700 dark:text-green-200 rounded-md">
            <p className="font-semibold">Kết luận chính:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Đa số người dùng (75%) chỉ đăng ký từ 1 đến 2 khóa học.</li>
              <li>
                Không có giá trị rỗng (null) trong số lượng khóa học đã đăng ký,
                đảm bảo rằng mỗi người dùng trong tập dữ liệu đã phân tích đều
                có ít nhất một khóa học.
              </li>
              <li>
                Sự tồn tại của các outliers với số lượng khóa học rất cao đã
                được xác định và sẽ được xử lý (ví dụ: bằng cách lọc hoặc
                capping) trong các bước làm sạch dữ liệu tiếp theo để đảm bảo
                chất lượng của mô hình dự đoán.
              </li>
            </ul>
          </div>
          <p className="mt-3">
            Những phân tích này cung cấp cái nhìn sâu sắc về hành vi đăng ký
            khóa học và giúp xác định các điểm dữ liệu cần chú ý trong quá trình
            chuẩn bị dữ liệu.
          </p>
          {/* You can add image links here if you have visualizations for course_order */}
        </>
      ),
    },
    // Add more sections if you have EDA for other specific columns from "User.json"
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="mb-6">
        {" "}
        {/* Increased bottom margin for back link */}
        <Link
          to="/data-mining-process" // Link back to the main Data Mining Process page
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
          Back to Data Mining Process Overview
        </Link>
      </div>
      <header className="text-center mb-6">
        {" "}
        {/* Reduced bottom margin here */}
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          EDA Insights: User Data
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Detailed Exploratory Data Analysis for the User Information
          (entities.json).
        </p>
      </header>

      {/* Widget for Full EDA Links - Positioned below header */}
      {(fullEdaCodeLink1 || fullEdaCodeLink2) && (
        <div className="mb-10 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-3">
          {" "}
          {/* Centered on mobile, right on sm+ */}
          {fullEdaCodeLink1 && (
            <a
              href={fullEdaCodeLink1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors w-full sm:w-auto justify-center"
            >
              <CodeBracketIcon className="h-5 w-5 mr-2" />
              View EDA Code 1
            </a>
          )}
          {fullEdaCodeLink2 && (
            <a
              href={fullEdaCodeLink2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors w-full sm:w-auto justify-center"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              View EDA code 2
            </a>
          )}
        </div>
      )}
      {/* Content Sections - Not an accordion here, but distinct sections */}
      {edaSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="bg-white shadow-xl rounded-lg p-6 md:p-8 mb-8"
        >
          <div className="flex items-center mb-4">
            {/* {section.icon && <section.icon className="h-8 w-8 mr-3 text-indigo-600" />} */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {section.title}
            </h2>
          </div>
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-600">
            {section.content}
          </div>
        </section>
      ))}
    </div>
  );
};

export default EdaUserPage; // Renamed component
