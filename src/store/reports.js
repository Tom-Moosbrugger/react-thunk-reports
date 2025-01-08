import { createSelector } from 'reselect';

/** Action Type Constants: */
export const LOAD_REPORTS = 'reports/LOAD_REPORTS';
export const RECEIVE_REPORT = 'reports/RECEIVE_REPORT';
export const UPDATE_REPORT = 'reports/UPDATE_REPORT';
export const REMOVE_REPORT = 'reports/REMOVE_REPORT';

/**  Action Creators: */
export const loadReports = (reports) => ({
  type: LOAD_REPORTS,
  reports
});

export const receiveReport = (report) => ({
  type: RECEIVE_REPORT,
  report
});

export const editReport = (report) => ({
  type: UPDATE_REPORT,
  report
});

export const removeReport = (reportId) => ({
  type: REMOVE_REPORT,
  reportId
});

/** Thunk Action Creators: */

// Your code here 
export const loadReportsThunk = () => async dispatch => {
  const response = await fetch('/api/reports', { method: 'GET'});

  if (response.ok) {
    const reports = await response.json();

    console.log(reports);

    dispatch(loadReports(reports));
  }
}

export const receiveReportThunk = (id) => async dispatch => {
  const response = await fetch(`/api/reports/${id}`);

  if (response.ok) {
    const report = await response.json();


    dispatch(receiveReport(report));
  }
}

export const createReportThunk = (report) => async dispatch => {
  const response = await fetch(`/api/reports/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(report)
  });

  const newReport = await response.json();

  console.log('\nresponse contents\n', newReport);

  if (response.ok) {
    dispatch(receiveReport(newReport));
    return newReport;
  } else {
    return newReport.errors;
  }
} 

export const removeReportThunk = (id) => async dispatch => {
  const response = await fetch(`/api/reports/${id}`, {
    method: 'DELETE'
  });

  // console.log(response);

  if (response.ok) {
    dispatch(removeReport(id));
  }
}

/** Selectors: */

const selectAllReports = state => state.reports
export const allReportsSelector = createSelector(selectAllReports, (reports) => Object.values(reports));

/** Reducer: */

/** The reports reducer is complete and does not need to be modified */
const reportsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_REPORTS: {
      const reportsState = {};
      action.reports.forEach((report) => {
        reportsState[report.id] = report;
      });
      return reportsState;
    }
    case RECEIVE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case UPDATE_REPORT:
      return { ...state, [action.report.id]: action.report };
    case REMOVE_REPORT: {
      const newState = { ...state };
      delete newState[action.reportId];
      return newState;
    }
    default:
      return state;
  }
};

export default reportsReducer;
