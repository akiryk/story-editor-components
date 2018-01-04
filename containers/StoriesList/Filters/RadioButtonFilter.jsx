import React from 'react'
import { connect } from 'react-redux'
import { getFilterStatus, getFilterName } from '../../../state/reducers'
import { toggleRadioButtonFilters } from '../../../state/list/actions'
import styles from './filterstyle.css'

export const RadioButton = ({ id, onChange, active, children }) => (
  <div className={styles.filterTag}>
    <input
      type="radio"
      id={id}
      className={styles.tagStyle}
      checked={active}
      onChange={onChange}
    />
    <label htmlFor={id}>
      {children}
    </label>
  </div>
)

const mapStateToProps = (state, props) => ({
  id: getFilterName(props),
  active: getFilterStatus(state, props)
})

const mapDispatchToProps = (dispatch, props) => ({
  onChange: () => dispatch(toggleRadioButtonFilters(props)),
})

export const RadioButtonFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioButton);
