import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ReportForm from './ReportForm';
import { receiveReportThunk } from '../store/reports';

const EditReportForm = () => {
  const { reportId } = useParams();
  const report = useSelector(state => state.reports[reportId]);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(receiveReportThunk(reportId));
  }, [dispatch, reportId]);

  if (!report) return(<></>);

  /* **DO NOT CHANGE THE RETURN VALUE** */
  return (
    Object.keys(report).length > 1 && (
      <>
        <ReportForm
          report={report}
          formType="Update Report"
        />
      </>
    )
  );
};

export default EditReportForm;

