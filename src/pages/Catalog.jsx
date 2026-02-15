import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from "../components/common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { catalogData } from "../services/apis"
import { studentEndpoints } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"

function Catalog() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null); // 🔥 track which course is buying

  // 🔹 Fetch All Courses
  const fetchCourses = async () => {
    try {
      const response = await apiConnector("GET", catalogData.CATALOGPAGEDATA_API)

      setApiData(response.data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔥 Buy Course Function
  const handleBuy = async (courseId) => {
    try {
      setBuyingId(courseId);

      const response = await apiConnector("POST",studentEndpoints.COURSE_PAYMENT_API);
      console.log(response)

      // const response = await axios.post(
      //   "http://localhost:4000/api/v1/course/buyCourse",
      //   { courseId },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`, // if using auth
      //     },
      //   }
      // );

      alert("Course Purchased Successfully 🎉");
      console.log(response.data);
    } catch (error) {
      console.log("Purchase Error:", error);
      alert("Something went wrong ❌");
    }

    setBuyingId(null);
  };

  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-12">
      <h1 className="text-3xl text-richblack-5 mb-8">
        All Courses
      </h1>

      {loading ? (
        <p className="text-richblack-100">Loading...</p>
      ) : apiData?.Data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apiData.Data.map((course) => (
            <div
              key={course._id}
              className="rounded-xl bg-richblack-800 p-6 shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-between"
            >
              <div>
                {/* Course Name */}
                <h2 className="text-xl font-semibold text-richblack-5">
                  {course.courseName}
                </h2>

                {/* Description */}
                <p className="mt-3 text-sm text-richblack-200">
                  {course.courseDescription}
                </p>

                {/* Learn */}
                <p className="mt-3 text-sm text-richblack-300">
                  <span className="text-yellow-50 font-semibold">
                    What you'll learn:
                  </span>{" "}
                  {course.WhatYouWillLearn}
                </p>

                {/* Price */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-yellow-50">
                    ₹{course.price}
                  </p>

                  <p className="text-sm text-richblack-300">
                    Students: {course.studentEnrolled?.length || 0}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-3 text-sm text-richblack-300">
                  ⭐ {course.ratingAndReviews?.length || 0} Reviews
                </div>
              </div>

              {/* 🔥 Buy Button */}
              <button
                onClick={() => handleBuy(course._id)}
                disabled={buyingId === course._id}
                className="mt-6 w-full rounded-lg bg-yellow-50 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100 disabled:opacity-50"
              >
                {buyingId === course._id ? "Processing..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-richblack-100">No Courses Found</p>
      )}
    </div>
  );


































  // const { loading } = useSelector((state) => state.profile)
  // const { catalogName } = useParams()
  // const [active, setActive] = useState(1)
  // const [catalogPageData, setCatalogPageData] = useState(null)
  // const [categoryId, setCategoryId] = useState("")
  // // Fetch All Categories
  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const res = await apiConnector("GET", catalogData.CATALOGPAGEDATA_API)
  //       console.log("catalog-----------",res)
  //       const category_id = res?.data?.data?.filter(
  //         (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
  //       )[0]._id
  //       setCategoryId(category_id)
  //     } catch (error) {
  //       console.log("Could not fetch Categories.", error)
  //     }
  //   })()
  // }, [catalogName])
  // useEffect(() => {
  //   if (categoryId) {
  //     ;(async () => {
  //       try {
  //         const res = await getCatalogPageData(categoryId)
  //         setCatalogPageData(res)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     })()
  //   }
  // }, [categoryId])

  // if (loading || !catalogPageData) {
  //   return (
  //     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
  //       <div className="spinner"></div>
  //     </div>
  //   )
  // }
  // if (!loading && !catalogPageData.success) {
  //   return <Error />
  // }

  // return (
  //   <>
  //     {/* Hero Section */}
  //     <div className=" box-content bg-richblack-800 px-4">
  //       <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
  //         <p className="text-sm text-richblack-300">
  //           {`Home / Catalog / `}
  //           <span className="text-yellow-25">
  //             {catalogPageData?.data?.selectedCategory?.name}
  //           </span>
  //         </p>
  //         <p className="text-3xl text-richblack-5">
  //           {catalogPageData?.data?.selectedCategory?.name}
  //         </p>
  //         <p className="max-w-[870px] text-richblack-200">
  //           {catalogPageData?.data?.selectedCategory?.description}
  //         </p>
  //       </div>
  //     </div>

  //     {/* Section 1 */}
  //     <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
  //       <div className="section_heading">Courses to get you started</div>
  //       <div className="my-4 flex border-b border-b-richblack-600 text-sm">
  //         <p
  //           className={`px-4 py-2 ${
  //             active === 1
  //               ? "border-b border-b-yellow-25 text-yellow-25"
  //               : "text-richblack-50"
  //           } cursor-pointer`}
  //           onClick={() => setActive(1)}
  //         >
  //           Most Populer
  //         </p>
  //         <p
  //           className={`px-4 py-2 ${
  //             active === 2
  //               ? "border-b border-b-yellow-25 text-yellow-25"
  //               : "text-richblack-50"
  //           } cursor-pointer`}
  //           onClick={() => setActive(2)}
  //         >
  //           New
  //         </p>
  //       </div>
  //       <div>
  //         <Course_Slider
  //           Courses={catalogPageData?.data?.selectedCategory?.courses}
  //         />
  //       </div>
  //     </div>
  //     {/* Section 2 */}
  //     <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
  //       <div className="section_heading">
  //         Top courses in {catalogPageData?.data?.differentCategory?.name}
  //       </div>
  //       <div className="py-8">
  //         <Course_Slider
  //           Courses={catalogPageData?.data?.differentCategory?.courses}
  //         />
  //       </div>
  //     </div>

  //     {/* Section 3 */}
  //     <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
  //       <div className="section_heading">Frequently Bought</div>
  //       <div className="py-8">
  //         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  //           {catalogPageData?.data?.mostSellingCourses
  //             ?.slice(0, 4)
  //             .map((course, i) => (
  //               <Course_Card course={course} key={i} Height={"h-[400px]"} />
  //             ))}
  //         </div>
  //       </div>
  //     </div>

  //     <Footer />
  //   </>
  // )
}

export default Catalog
