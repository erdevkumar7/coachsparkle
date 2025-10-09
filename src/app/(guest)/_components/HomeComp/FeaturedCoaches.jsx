import Image from "next/image";
import EastIcon from '@mui/icons-material/East';
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Link from "next/link";

export default async function FeaturedCoaches() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featuredCoachList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store" // comment if you don't want caching
  });

  const data = await res.json();
  let coaches = [];
  if (data.success) {
    coaches = data.data;
  }
  // console.log('cooocccc', coaches)
  return (
    <div className="view-all-coaches-list">
      <div className="container">
        <div className="search-container">
          <div>
            <h1>Featured Coaches</h1>
          </div>
          <div className="view-all-btn">
            <Link href="/coach-detail/list">View All Coaches <EastIcon className="mui-icons" /></Link>
          </div>
        </div>

        <div className="row view-all-coaches-view">
          {coaches.length > 0 ? coaches.map((coach) =>
            <div className="col-12 col-sm-6 col-md-3 coaches-view-cards" key={coach.user_id}>
              <div className="card h-100">
                <Image src={coach.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} className="card-img-top" alt="Coach Image" width={315} height={250} />
                <div className="card-body">
                  <h5 className="card-title"><Link href={`/coach-detail/${coach.user_id}`}>{coach.first_name} {coach.last_name}</Link></h5>
                  <p className="card-text">{coach?.professional_title}{" "}
                    {coach?.company_name && (
                      <>
                        <span> at </span>
                        {coach.company_name}
                      </>
                    )}
                  </p>
                  {coach.service_names && (
                    <div className="software-engineer-list">
                      {coach.service_names?.slice(0,4).map((service) => (<Link href="#" key={service}>{service}</Link>))}
                    </div>)}
                </div>
              </div>
            </div>
          ) : 
          (<div className="col-12 col-sm-6 col-md-3 coaches-view-cards" >No Featured Coach Available </div>)}

          {/* <div className="col-12 col-sm-6 col-md-3 coaches-view-cards">
            <div className="card h-100">
              <Image src={`${FRONTEND_BASE_URL}/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" width={1000} height={226} />
              <div className="card-body">
                <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                <p className="card-text">Staff Software Engineer at eBay</p>
                <div className="software-engineer-list">
                  <a href="#">Software</a>
                  <a href="#">Software</a>
                  <a href="#">Software</a>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  )
}