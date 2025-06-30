export default function SimilarCoaches() {

    return(
        <>
        <h4>Published Articles</h4>
        <div className="container">
                  <div className="row view-all-coaches-view">
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
                        <div className="card-body">
                          <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                          <p className="card-text">Staff Software Engineer at eBay</p>
                          <div className="software-engineer-list">
                            <a href="#">Software</a>
                            <a href="#">Software</a>
                            <a href="#">Software</a>
                            <a href="#">Software</a>
                            <a href="#">Software</a>
                          </div>
                        </div>
                      </div>
                    </div>
        
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-two.png`} className="card-img-top" alt="Coach Image" />
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
                    </div>
        
                    <div className="col-md-4 col-sm-6 col-md-3 coaches-view-cards">
                      <div className="card h-100">
                        <img src={`/coachsparkle/images/coaches-img-one.png`} className="card-img-top" alt="Coach Image" />
                        <div className="card-body">
                          <h5 className="card-title"><a href="#">Coach Name Will Go Here</a></h5>
                          <p className="card-text">Staff Software Engineer at eBay</p>
                          <div className="software-engineer-list">
                            <a href="#">Software</a>
                            <a href="#">Software</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    )
}