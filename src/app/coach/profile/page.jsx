import UserImageUploader from '@/app/user/_user_components/ImageUploader';
import CoachUpdateForm from '../_coach_components/CoachUpdateFormData';
import '../_styles/coach_profile.css';
import { getUserProfileData } from '@/app/api/user';
import { getAllMasters } from '@/app/api/guest';
// import { getAgeGroup, getAllCoachServices, getAllContries, getAllLanguages, getCoachType, getDeliveryMode } from '@/app/api/guest';

export default async function CoachProfile() {
    const { data: user, error, removeToken } = await getUserProfileData();
    //     const [countries, deliveryMode, coachTypes, ageGroup, allLanguages, getAllServices] = await Promise.all([
    //     getAllContries(),
    //     getDeliveryMode(),
    //     getCoachType(),
    //     getAgeGroup(),
    //     getAllLanguages(),
    //     getAllCoachServices(),
    // ])

    const allMasters = await getAllMasters();
    // console.log('alll', allMasters)
    let countries;
    let deliveryMode;
    let coachTypes;
    let ageGroup;
    let allLanguages;
    let getAllServices;
    let price_range;
    let experience;

    if (allMasters) {
        countries = allMasters.countries;
        deliveryMode = allMasters.delivery_mode;
        coachTypes = allMasters.coach_type;
        ageGroup = allMasters.age_group;
        allLanguages = allMasters.languages;
        getAllServices = allMasters.services
        price_range = allMasters.budget_range_show
        experience = allMasters.experience_level_show
    }
    // console.log('experience', experience)

    return (
        <div className="main-panel">
            <div className="content-wrapper coach-profile-add">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold quick-text-add my-changes">
                                    Hi {user?.first_name}, <br />
                                    welcome back!
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4>Public Profile</h4>
                </div>

                <div className="profile-form-add">
                    <CoachUpdateForm
                        user={user}
                        countries={countries}
                        deliveryMode={deliveryMode}
                        coachTypes={coachTypes}
                        ageGroup={ageGroup}
                        allLanguages={allLanguages}
                        getAllServices={getAllServices}
                        price_range={price_range}
                        experience={experience}
                    />
                </div>
            </div>
        </div>
    )
}