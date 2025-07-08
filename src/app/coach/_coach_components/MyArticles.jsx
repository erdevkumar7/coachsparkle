export default function MyArticles() {
  return (
    <>
      <h3 className="text-lg font-semibold quick-text">My Articles</h3>

      <table>
        <thead>
          <tr className="articles-add">
            <th className="name-art">Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          <tr style={{ height: "10px" }}></tr>
        </thead>
        <tbody>
          <tr className="info-add">
            <td>
              <div className="article-info">
                <img
                  src="/coachsparkle/assets/images/articles-one.png"
                  alt="Article"
                />
                <span>Article Name</span>
              </div>
            </td>
            <td className="voluptatem-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae...
            </td>
            <td>
              <span className="badge published">Published</span>
            </td>
            <td className="actions">
              <i className="bi bi-pencil-square"></i>
              <i className="bi bi-trash3"></i>
            </td>
          </tr>
          <tr style={{ height: "10px" }}></tr>

          <tr className="info-add">
            <td>
              <div className="article-info">
                <img
                  src="/coachsparkle/assets/images/articles-two.png"
                  alt="Article"
                />
                <span>Article Name</span>
              </div>
            </td>
            <td className="voluptatem-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae...
            </td>
            <td>
              <span className="badge published">Published</span>
            </td>
            <td className="actions">
              <i className="bi bi-pencil-square"></i>
              <i className="bi bi-trash3"></i>
            </td>
          </tr>
          <tr style={{ height: "10px" }}></tr>

          <tr className="info-add">
            <td>
              <div className="article-info">
                <img
                  src="/coachsparkle/assets/images/articles-three.png"
                  alt="Article"
                />
                <span>Article Name</span>
              </div>
            </td>
            <td className="voluptatem-text">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae...
            </td>
            <td>
              <span className="badge pending">Pending</span>
            </td>
            <td className="actions">
              <i className="bi bi-pencil-square"></i>
              <i className="bi bi-trash3"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
