import "../_styles/faq_support.css";

export default function Faq(){
    return(
        <div className="main-panel">
           
           <div className="new-content-wrapper coach-wrap">
              <div className="faq-support-add">
              
              <h4>Contact Support</h4>
        <form>
            <div className="row mb-3 ">
                <div className="col-md-6">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Your name" />
                </div>
                <div className="col-md-6">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="you@example.com" />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label for="userType" className="form-label">I am a...</label>
                    <select id="userType" className="form-select">
                        <option>User</option>
                        <option>Coach</option>
                        <option>Admin</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label for="reason" className="form-label">Reason for Contact</label>
                    <select id="reason" className="form-select">
                        <option>Technical Issue</option>
                        <option>Billing Inquiry</option>
                        <option>General Question</option>
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <label for="subject" className="form-label">Subject</label>
                <input type="text" id="subject" className="form-control" placeholder="Enter subject" />
            </div>

            <div className="mb-3">
                <label for="description" className="form-label">Description of The Issue</label>
                <textarea id="description" className="form-control" rows="3" placeholder="Describe your issue"></textarea>
            </div>

           
          <div className="attach-screenshot"> 
            <p>Attach a Screenshot</p>
            <div className="custom-file-input-wrapper">
               
               <input type="file" id="cert-upload" accept=".jpg,.jpeg" className="custom-file-hidden" multiple="" name="upload_credentials"/>
                <label for="cert-upload" className="custom-file-btn">Choose file</label>
                <span className="custom-file-placeholder">No file chosen</span>
            </div>
            </div>



            <div className="form-checkbox">
              <input className="form-checkbox-input" id="corporateCheck" type="checkbox" name="is_corporate" />
              <label className="form-checkbox-label" for="corporateCheck">
              I agree to be contacted via email.</label>
            </div>


            <button type="submit" className="btn btn-primary">
                Submit <i className="bi bi-arrow-right"></i>
            </button>
        </form>

              </div>


           </div>
        
        </div>
    );
}