import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { receiveReportThunk } from '../store/reports';

const ReportShow = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [goToReport, setGoToReport] = useState(reportId);
  const dispatch = useDispatch();
  const report = useSelector(state => state.reports[reportId]);

  useEffect(()=> {
    dispatch(receiveReportThunk(reportId));
  }, [dispatch, reportId]);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/reports/${goToReport}`);
  }

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <section>
      <table id="report-table">
        <thead>
          <tr>
            <th colSpan="2">Report #{reportId}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="attribute">Understanding:</td>
            <td className="value">{report?.understanding}</td>
          </tr>
          <tr>
            <td className="attribute">Improvement:</td>
            <td className="value">{report?.improvement}</td>
          </tr>
        </tbody>
      </table>
      <div className="footer">
        <Link
          className="back-button"
          to="/"
        >
          Back to Report Index
        </Link>
        <form className="go-to-report-form" onSubmit={handleSubmit}>
          Go to Report #
          <input
            type="number"
            min={1}
            max={99}
            value={goToReport}
            onChange={(e) => setGoToReport(e.target.value)}
            required
          />
          <button>Go!</button>
        </form>
      </div>
    </section>
  );
};

export default ReportShow;
