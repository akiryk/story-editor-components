import React from 'react'
import styles from './paginationStyle.css'

const CustomPagination = ({ components }) => (
  <div className={styles.paginationContainer}>
    <div className={styles.pageList}>{components.pageList}</div>
  </div>
)

CustomPagination.propTypes = {
  components: React.PropTypes.shape({
  	pageList: React.PropTypes.object,
  }),
}

export default CustomPagination
