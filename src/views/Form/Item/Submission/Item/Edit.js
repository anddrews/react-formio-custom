import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux'
import {Form, Errors} from 'components';
import {selectRoot, resetSubmissions, saveSubmission, selectError}from 'modules';
import {push} from 'connected-react-router';
import Loading from '../../../../../containers/Loading'

const Edit = class extends Component {
  render() {
    const {
      hideComponents,
      onSubmit,
      options,
      errors,
      form: {form, isActive: isFormActive},
      submission: {submission, isActive: isSubActive, url}
    } = this.props;

    if (isFormActive || isSubActive) {
      return <Loading />;
    }

    return (
      <div>
        <h3>Edit { form.title } Submission</h3>
        <Errors errors={errors} />
        <Form
          form={form}
          submission={submission}
          url={url}
          hideComponents={hideComponents}
          onSubmit={onSubmit}
          options={options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: selectRoot('form', state),
    submission: selectRoot('submission', state),
    options: {
      noAlerts: true,
    },
    errors: [
      selectError('submission', state),
      selectError('form', state)
    ],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (submission) => {
      dispatch(saveSubmission('submission', submission, ownProps.match.params.formId, (err, submission) => {
        if (!err) {
          dispatch(resetSubmissions('submission'));
          dispatch(push(`/form/${ownProps.match.params.formId}/submission/${submission._id}`))
        }
      }));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
