import UserImageUploader from '@/app/user/_user_components/ImageUploader';
import CoachUpdateForm from '../_coach_components/CoachUpdateFormData';
import '../_styles/coach_profile.css';
import { getUserProfileData } from '@/app/api/user';
import { getAllContries, getDeliveryMode } from '@/app/api/guest';

export default async function CoachProfile() {
    const { data: user, error, removeToken } = await getUserProfileData();
    if (!user) {
        return redirect('/login');
    }

    const countries = await getAllContries();
    const deliveryMode = await getDeliveryMode();

    return (
        <div className="main-panel">
            <div className="content-wrapper">
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

                <div className="profile-form-add">
                    <div className="card">
                        <UserImageUploader
                            image={user?.profile_image}
                            user_type={user?.user_type || 3}
                        />

                        <CoachUpdateForm
                            user={user}
                            countries={countries}
                            deliveryMode={deliveryMode}

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}