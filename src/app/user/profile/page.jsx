import { cookies } from "next/headers";
import "../_styles/dashboard.css";
import "../_styles/profile.css";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import UserSideBarComp from "../_user_components/UserSideBar";
import UserUpdateFormData from "../_user_components/UserUpdateForm";


export default async function Profile() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const res = await fetch(`${apiUrl}/getuserprofile`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    const data = await res.json();
    let user = data.data
    user.token = token;

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
                                <div className="upload-photo-add">
                                    <img src={`${FRONTEND_BASE_URL}/assets/images/faces/face-img.png`} alt="profile" />
                                    <div className="upload-btn">
                                        <a href="#"><i className="bi bi-upload"></i> Upload photo</a>

                                    </div>
                                </div>
                                <UserUpdateFormData user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
