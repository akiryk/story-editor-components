import React from 'react'
import styles from './tablestyle.css'

const CustomToolbar = ({ components }) => (
  <div className={styles.search}>
    { components.searchPanel }
  </div>
)

CustomToolbar.propTypes = {
  components: React.PropTypes.shape({
  	searchPanel: React.PropTypes.object,
  }),
}

export default CustomToolbar
