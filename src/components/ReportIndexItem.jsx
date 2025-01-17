import { Link } from 'react-router-dom';
import { removeReportThunk } from '../store/reports';
import { useDispatch } from 'react-redux';

const ReportIndexItem = ({ report }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(removeReportThunk(report.id));
  };

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    <li>
      <div className="li-contents-flex">
        <Link to={`/reports/${report.id}`}>Report #{report.id}</Link>
        <div className="buttons-container">
          <Link
            className="edit-link"
            to={`/reports/${report.id}/edit`}
          >
            Edit
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default ReportIndexItem;
