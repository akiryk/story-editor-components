import React from 'react'
import { connect } from 'react-redux'
import { getFilterStatus, getFilterName } from '../../../state/reducers'
import { toggleCheckboxFilters } from '../../../state/list/actions'
import styles from './filterstyle.css'

const Checkbox = ({ active, onChange, id, children }) => (
  <div className={styles.filterTag}>
    <input
      onChange={onChange}
      className={styles.tagStyle}
      type="checkbox"
      checked={active}
      id={id}
    />
    <label htmlFor={id}>{children}</label>
  </div>
)

const mapStateToProps = (state, props) => ({
  active: getFilterStatus(state, props),
  id: getFilterName(props),
})

const mapDispatchToProps = (dispatch, props) => ({
  onChange: () => dispatch(toggleCheckboxFilters(props.filter)),
})

export const CheckboxFilter = connect(mapStateToProps, mapDispatchToProps)(Checkbox);
