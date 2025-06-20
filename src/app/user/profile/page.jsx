import "../_styles/dashboard.css";
import "../_styles/profile.css";
import UserSideBarComp from "../_user_components/UserSideBar";
import UserUpdateFormData from "../_user_components/UserUpdateForm";
import { getUserProfileData } from "@/app/api/user";
import { getAllContries, getDeliveryMode } from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";

export default async function Profile() {
    const { data: user, error, removeToken } = await getUserProfileData();
    if (!user) {
        return redirect('/login');
    }

    const countries = await getAllContries();
    const deliveryMode = await getDeliveryMode();


    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <UserSideBarComp />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
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
                                />

                                <UserUpdateFormData
                                    user={user}
                                    countries={countries}
                                    deliveryMode={deliveryMode}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
