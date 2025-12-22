import { FRONTEND_BASE_URL } from "@/utiles/config";
import SwiperSecond from "@/components/SwiperSecond";
import SwiperOne from "@/components/SwiperOne";
import Image from 'next/image';
import EastIcon from '@mui/icons-material/East';
import ExploreCoachs from "./_components/HomeComp/ExploreCoachs";
import FindCoach from "./_components/HomeComp/FIndCoach";
import LatestArticles from "./_components/HomeComp/LatestArticles";
import FeaturedCoaches from "./_components/HomeComp/FeaturedCoaches";
import Link from "next/link";
import CoachPlans from "./_components/HomeComp/CoachPlans";
import SmartMatching from "./_components/HomeComp/SmartMatching";
import { HandleValidateTokenOnServer } from "../api/user";

export default async function Home() {
  const tokenData = await HandleValidateTokenOnServer();
  let user;

  if (tokenData) {
    user = tokenData?.data;
  }

  // Fetch both APIs concurrently using Promise.all
  const [featuredCoachesResponse, globalPartnersResponse, homePageContentResponse] = await Promise.all([
    // Featured coaches API call
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/featuredCoachList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    }),

    // Global partners API call
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getGlobalPartnersList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    }),

    // Home Page contents
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getHomePageSection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    }),
  ]);


  // Safely parse responses (guard against HTML error pages or non-JSON bodies)
  async function parseJsonSafe(response, label) {
    try {
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) {
        console.error(`${label} returned non-OK status`, response.status, await response.text());
        return {};
      }
      if (!contentType.includes('application/json')) {
        console.error(`${label} did not return JSON. Content-Type:`, contentType, await response.text());
        return {};
      }
      return await response.json();
    } catch (err) {
      console.error(`Failed to parse ${label} response as JSON:`, err);
      return {};
    }
  }

  const [featuredCoachesData, globalPartnersData, homePageContentData] = await Promise.all([
    parseJsonSafe(featuredCoachesResponse, 'featuredCoachList'),
    parseJsonSafe(globalPartnersResponse, 'getGlobalPartnersList'),
    parseJsonSafe(homePageContentResponse, 'getHomePageSection'),
  ]);

  // Extract data safely
  const coaches = featuredCoachesData?.success ? featuredCoachesData.data : [];
  const globalPartners = globalPartnersData?.global_partners || [];
  const home_page_content = homePageContentData?.success ? homePageContentData.data : [];

  // Extract specific sections
  const topSection = home_page_content.find(item => item.section_name === "top");
  const homePageCountData = home_page_content.find(item => item.section_name === "home_page_data");  // conut of available coach

  const globalPartnersSection = home_page_content.find(item => item.section_name === "global_partners");
  const middleOneSection = home_page_content.find(item => item.section_name === "middle_one");
  const middleTwoSection = home_page_content.find(item => item.section_name === "middle_two");
  const categorySection = home_page_content.find(item => item.section_name === "category");
  const planSection = home_page_content.find(item => item.section_name === "plan");
  const corporateSection = home_page_content.find(item => item.section_name === "corporate");

  // console.log("Home Page Data:", categorySection);
  return (
    <>
      <SmartMatching
        coaches={coaches}
        sectionData={topSection}
        homePageCountData={homePageCountData}
      />

      <div className="global-companies">
        <div className="container">
          <h1 className="text-center">{globalPartnersSection?.title || "Trusted by 500+ Global Partners"}</h1>
          <SwiperSecond partners={globalPartners} />
        </div>
      </div>

      <div className="dedicated-career-coach">
        <div className="container">
          <div className="row dedicated-career-coach-inner">
            <div className="col-md-6 mb-4 mb-md-0 dedicated-career-coach-left">
              <h1 className="mb-3">{middleOneSection?.title || "Coach Sparkle uses AI to deliver personalized coach matches - faster and smarter"} </h1>
              <p>
                {middleOneSection?.description || "Coach Sparkle uses smart AI to understand your coaching goals, preferences, and availability — then instantly matches you with coaches who align with your needs. Whether you’re looking to build confidence, grow your career, or improve a skill, our AI cuts through the noise to connect you with the right coach — saving you time and ensuring a better fit from the start. You can also use CoachSparkle to find the right coach for your child, a loved one, or even aging parents — because growth and support matter at every stage of life."}
              </p>

              <a href="#" className="learn-more-btn-add">Try Now <EastIcon className="mui-icons" /></a>
            </div>


            <div className="col-md-6 dedicated-career-coach-right">
              <Image
                src={middleOneSection?.image ? middleOneSection.image : `${FRONTEND_BASE_URL}/images/career-coach-img.webp`}
                className="card-img-top" alt="career-coach"
                width={1000} height={226}
              />
            </div>
          </div>

          <div className="row coaching-approach-inner">
            <div className="col-md-6 coaching-approach-right">
              <Image
                src={middleTwoSection?.image ? middleTwoSection.image : `${FRONTEND_BASE_URL}/images/coaching-approach-img.webp`}
                className="card-img-top" alt="coaching approach"
                width={1000} height={226}
              />
            </div>

            <div className="col-md-6 mb-4 mb-md-0 coaching-approach-left">
              <h1 className="mb-3">
                {middleTwoSection?.title || "It’s always free to use - for learners, users and curious browsers"}
              </h1>
              <div className="clear-informative">
                <div className="informative-text">
                  <div>
                    <p>
                      {middleTwoSection?.description || "Coach Sparkle is free to use for anyone looking for coaching. Whether you're exploring options, comparing profiles, or sending a coaching request, there’s no cost to browse, match, or message coaches. No hidden fees. No commitment required — just the freedom to find the right support at your own pace."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExploreCoachs sectionData={categorySection} />

      <FeaturedCoaches />

      <FindCoach />

      <div className="people-love-living">
        <div className="container">
          <h1>People Love Using Coach Sparkle</h1>
          <p>Hear What the Coachees have to say</p>
          <SwiperOne />
        </div>
      </div>

      <LatestArticles />

      <CoachPlans
        userData={user}
        sectionData={planSection}
      />

      <div className="your-organization-coach">
        <div className="container">
          <div className="row organization-coach">
            <h1 className="text-center">{corporateSection?.title || "Unlock Human Potential in Your Workforce"}</h1>
            <p className="text-center">
              {corporateSection?.subtitle || `From executive coaching to team development and mental wellness — Coach Sparkle helps companies elevate people,
              culture, and performance through curated coaching solutions`}
            </p>
            <div className="register-add">
              <Link href="/coach-detail/list?isCorporate=1" className="register-now-btn">Find Corporate Coaches</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}