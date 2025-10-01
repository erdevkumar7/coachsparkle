import "../_styles/dashboard.css";
import "../_styles/profile.css";
import UserUpdateFormData from "../_user_components/UserUpdateForm";
import { getUserProfileData } from "@/app/api/user";
import { getAllMasters, getSubCoachType } from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";

export default async function Profile() {
    const { data: user, error, removeToken } = await getUserProfileData();

    // const countries = await getAllContries();
    // const deliveryMode = await getDeliveryMode();
    // const ageGroup = await getAgeGroup();
    // const languages = await getAllLanguages();

    const [allMasters, allCoachSubtype] = await Promise.all([
        getAllMasters(),
        getSubCoachType(null),
    ]);

    let countries;
    let deliveryMode;
    let ageGroup;
    let languages;
    // let coachTypes;
    // let getAllServices;
    // let price_range;
    // let experience;

    if (allMasters) {
        countries = allMasters.countries;
        deliveryMode = allMasters.delivery_mode;
        ageGroup = allMasters.age_group;
        languages = allMasters.languages;
        // coachTypes = allMasters.coach_type;
        // getAllServices = allMasters.services
        // price_range = allMasters.budget_range_show
        // experience = allMasters.experience_level_show
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12 grid-margin user-profile-add">
                        <div className="row">
                            <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                <h3 className="font-weight-bold quick-text-add my-changes">
                                    Hi {user.first_name}, <br />
                                    Ready to level up?
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-form-add">
                    <div className="card">
                        <h3 className="text-your-name">Your Profile</h3>
                        <UserImageUploader
                            image={user.profile_image}
                            user_type={user?.user_type || 2}
                        />

                        <UserUpdateFormData
                            user={user}
                            countries={countries}
                            deliveryMode={deliveryMode}
                            ageGroup={ageGroup}
                            languages={languages}
                            allCoachSubtype={allCoachSubtype}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
