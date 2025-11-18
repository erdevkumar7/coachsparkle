import EastIcon from '@mui/icons-material/East';

export default function ActivityLog() {
  return (
    <>
    <div>
      <h3 className="text-lg font-semibold quick-text">Activity Log</h3>
    </div>
    <div>
      <p>- You sent a request to coach Tracy McCoy (3 days ago)</p>
    </div>
              <div className='log-btn'>
                  <button className="activity-log-btn">
                    View All
                    <EastIcon className="mui-icons" />
                  </button>
              </div>
    </>
  );
}
