import "../_styles/dashboard.css";
import "../_styles/profile.css";
import UserUpdateFormData from "../_user_components/UserUpdateForm";
import { getUserBookedGoalsListData, getUserProfileData } from "@/app/api/user";
import { getAllMasters } from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";

export default async function Profile() {
    const { data: user, error, removeToken } = await getUserProfileData(); 

    const [allMasters, userGoalRes] = await Promise.all([
        getAllMasters(),
        getUserBookedGoalsListData()
    ]);

    const countries = allMasters?.countries || [];
    const deliveryMode = allMasters?.delivery_mode || [];
    const ageGroup = allMasters?.age_group || [];
    const languages = allMasters?.languages || [];
    const userGoals = userGoalRes?.data || [];
  
    
    // console.log('userGoals', userGoals)

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
                            userGoals={userGoals}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
