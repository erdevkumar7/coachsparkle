import { FRONTEND_BASE_URL } from "@/utiles/config";
import SwiperSecond from "@/components/SwiperSecond";
// import SwiperThird from "@/components/SwiperThird";
import SwiperOne from "@/components/SwiperOne";
// import SwiperFour from "@/components/SwiperFour";
import Image from 'next/image';
import EastIcon from '@mui/icons-material/East';
import ExploreCoachs from "./_components/HomeComp/ExploreCoachs";
import FindCoach from "./_components/HomeComp/FIndCoach";
import LatestArticles from "./_components/HomeComp/LatestArticles";
import FeaturedCoaches from "./_components/HomeComp/FeaturedCoaches";
import Link from "next/link";
import CoachPlans from "./_components/HomeComp/CoachPlans";
import SmartMatching from "./_components/HomeComp/SmartMatching";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store" // comment if you don't want caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch coaches");
  }

  const data = await res.json();
  let coaches = [];
  if (data.success) {
    coaches = data.data;
  }

  return (
    <>
      <SmartMatching coaches={coaches}/>

      <div className="global-companies">
        <div className="container">
          <h1 className="text-center">Trusted by 500+ Global Partners</h1>
          <SwiperSecond />
          {/* <SwiperThird />      */}
        </div>
      </div>

      <div className="dedicated-career-coach">
        <div className="container">
          <div className="row dedicated-career-coach-inner">

            <div className="col-md-6 mb-4 mb-md-0 dedicated-career-coach-left">
              <h1 className="mb-3">Coach Sparkle uses AI to deliver personalized coach matches - faster and smarter</h1>
              <p>
                Coach Sparkle uses smart AI to understand your coaching goals, preferences, and availability — then instantly matches you with coaches who align with your needs. Whether you’re looking to build confidence, grow your career, or improve a skill, our AI cuts through the noise to connect you with the right coach — saving you time and ensuring a better fit from the start. You can also use CoachSparkle to find the right coach for your child, a loved one, or even aging parents — because growth and support matter at every stage of life.
              </p>

              <a href="#" className="learn-more-btn-add">Try Know <EastIcon className="mui-icons" /></a>
            </div>


            <div className="col-md-6 dedicated-career-coach-right">
              <Image src={`${FRONTEND_BASE_URL}/images/career-coach-img.webp`} className="card-img-top" alt="career-coach" width={1000} height={226} />

            </div>
          </div>

          <div className="row coaching-approach-inner">

            <div className="col-md-6 coaching-approach-right">
              <Image src={`${FRONTEND_BASE_URL}/images/coaching-approach-img.webp`} className="card-img-top" alt="coaching approach" width={1000} height={226} />

            </div>


            <div className="col-md-6 mb-4 mb-md-0 coaching-approach-left">
              <h1 className="mb-3">
                It’s always free to use - for learners, users and curious browsers
              </h1>
              <div className="clear-informative">
                <div className="informative-text">
                  <div>
                    <p>
                      Coach Sparkle is free to use for anyone looking for coaching. Whether you're exploring options, comparing profiles, or sending a coaching request, there’s no cost to browse, match, or message coaches. No hidden fees. No commitment required — just the freedom to find the right support at your own pace.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <ExploreCoachs />

      <FeaturedCoaches />

      <FindCoach />

      <div className="people-love-living">
        <div className="container">
          <h1>People Love Using Coach Sparkle</h1>
          <p>Hear What the Coachees have to say</p>
          <SwiperOne />
          {/* <SwiperFour /> */}
        </div>
      </div>

      <LatestArticles />

      <CoachPlans />

      <div className="your-organization-coach">
        <div className="container">
          <div className="row organization-coach">
            <h1 className="text-center">Unlock Human Potential in Your Workforce</h1>
            <p className="text-center">
              From executive coaching to team development and mental wellness — Coach Sparkle helps companies elevate people,
              culture, and performance through curated coaching solutions
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