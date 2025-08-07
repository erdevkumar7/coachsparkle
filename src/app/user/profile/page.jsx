import "../_styles/dashboard.css";
import "../_styles/profile.css";
import UserUpdateFormData from "../_user_components/UserUpdateForm";
import { getUserProfileData } from "@/app/api/user";
import { getAllContries, getDeliveryMode, getAgeGroup, getAllLanguages } from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";

export default async function Profile() {
    const { data: user, error, removeToken } = await getUserProfileData();
    // if (!user) {
    //     return redirect('/login');
    // } else if (user.user_type == 3) {
    //     return redirect('/coach/dashboard');
    // }

    const countries = await getAllContries();
    const deliveryMode = await getDeliveryMode();
    const ageGroup = await getAgeGroup();
    const languages = await getAllLanguages();


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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
