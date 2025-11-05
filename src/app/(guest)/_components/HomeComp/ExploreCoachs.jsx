import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import { FRONTEND_BASE_URL } from '@/utiles/config';
import Image from 'next/image';
import Link from 'next/link';
import { getCoachType, getSubCoachType } from "@/app/api/guest";

export default async function ExploreCoachs({ sectionData }) {
    // Fetch all coach types
    const types = await getCoachType();

    // Fetch subtypes for each type in parallel
    const typesWithSubtypes = await Promise.all(
        types.map(async (type) => {
            const subtypes = await getSubCoachType(type.id);
            return {
                ...type,
                subtypes
            };
        })
    );


    return (
        <div className="explore-coaches">
            <div className="container">
                <div className="explore-coaches-section">
                    <div className="row explore-coaches-inner-content">
                        <div className="col-md-12 adipiscing-text">
                            <h1>{sectionData?.title || "Explore 1,000+ Available Coaches"}</h1>
                            {sectionData?.description ? <p className='section-decrp-dynamic'>{sectionData?.description}</p> :
                                <p>
                                    Browse by category, read real profiles, and connect with a coach who truly gets you.<br />
                                    Start your journey today — it’s free, personalized, and built around your goals.
                                </p>}

                        </div>
                        <div className="professional-top">
                            <Link href="/coach-detail/list" className="view-all-add-btn text-right">VIEW ALL <EastIcon className="mui-icons" /></Link>
                            {/* <div className="professional-cards">
                                <div className="card">
                                    <Image src={`${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`} alt="Personal Development" width={1000} height={226} />
                                    <h5>Personal Development & Life Coaches</h5>
                                    <ul>
                                        <li><CheckIcon className="mui-icons" />Life Coach</li>
                                        <li><CheckIcon className="mui-icons" />Confidence Coach</li>
                                        <li><CheckIcon className="mui-icons" />Mindset Coach</li>
                                    </ul>
                                </div>
                            </div> */}

                            <div className="professional-cards">
                                {typesWithSubtypes.map((type) => (
                                    <Link
                                        key={type.id}
                                        href={{
                                            pathname: "/coach-detail/list",
                                            query: {
                                                coaching_sub_categories: type.subtypes.map(sub => sub.id).join(',')
                                            }
                                        }}
                                        className="card-link"
                                    >
                                        <div key={type.id} className="card">
                                            <Image
                                                src={type.image || `${FRONTEND_BASE_URL}/images/explore-ellipse-one.png`}
                                                alt="Img"
                                                width={1000}
                                                height={226}
                                            />
                                            <h5>{type.type_name}</h5>
                                            <ul>
                                                {type.subtypes.slice(0, 3).map((subtype) => (
                                                    <li key={subtype.id}>
                                                        <CheckIcon className="mui-icons" />
                                                        {subtype.subtype_name}
                                                    </li>
                                                ))}

                                                {type.subtypes.length > 3 && (
                                                    <li className="more-subtypes">View More</li>
                                                )}
                                            </ul>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}