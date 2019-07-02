import React from 'react';
import { connect } from 'react-redux';
import { FormEdit, Errors} from 'components';
import { saveForm, selectForm, selectError} from 'modules'

const Edit = props => (
  <div>
    <h2>Edit {props.form.title} Form</h2>
    <hr />
    <Errors errors={props.errors} />
    <FormEdit {...props} onSave />
  </div>
)

const mapStateToProps = (state) => {
  return {
    form: selectForm('form', state),
    saveText: 'Save Form2',
    errors: selectError('form', state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveForm: (form) => dispatch(saveForm('form', form, (err, form) => {
      if (!err) {
        // TODO: Display a save success message here.
      }
    }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
