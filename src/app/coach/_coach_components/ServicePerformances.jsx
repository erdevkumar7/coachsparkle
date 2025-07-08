export default function ServicePerformancess() {
  return (
    <>
      <h3 className="text-lg font-semibold quick-text">
        Services Performances
      </h3>

      <table>
        <thead>
          <tr className="service-add">
            <th>Service Packages</th>
            <th>No. of Views</th>
            <th>Inquiry Rate</th>
            <th>Booking Confirmed</th>
            <th>Rating & Reviews</th>
            <th>Total Earnings</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="growth-package">
          <tr>
            <td>Career Growth Package</td>
            <td>12</td>
            <td>12</td>
            <td>2</td>
            <td>5.0</td>
            <td className="total-text">$175</td>
            <td>
              <span className="badge active">Active</span>
            </td>
            <td className="actions">
              <a href="#">
                <i className="bi bi-pencil-square"></i>
              </a>
              <a href="#">
                <i className="bi bi-trash3"></i>
              </a>
              <a href="#">
                <i className="bi bi-eye"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>Confidence Coaching</td>
            <td>12</td>
            <td>12</td>
            <td>0</td>
            <td>0.0</td>
            <td className="total-text">$175</td>
            <td>
              <span className="badge active">Active</span>
            </td>
            <td className="actions">
              <a href="#">
                <i className="bi bi-pencil-square"></i>
              </a>
              <a href="#">
                <i className="bi bi-trash3"></i>
              </a>
              <a href="#">
                <i className="bi bi-eye"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>Group Discussion Coaching</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0.0</td>
            <td className="total-text">$0</td>
            <td>
              <span className="badge unpublished">Unpublish</span>
            </td>
            <td className="actions">
              <a href="#">
                <i className="bi bi-pencil-square"></i>
              </a>
              <a href="#">
                <i className="bi bi-trash3"></i>
              </a>
              <a href="#">
                <i className="bi bi-eye"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="footer-btn">
        <button className="manage-btn">
          Manage Services <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </>
  );
}
