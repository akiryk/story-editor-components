import React from 'react'
import { CheckboxFilter } from './CheckboxFilter'
import { RadioButtonFilter } from './RadioButtonFilter'
import styles from './filterstyle.css'

const StoryFilters = () => (
  <div className={styles.filters}>
    <div className={styles.filterHeading}>Filters</div>
    <div className={styles.subHeading}>Published Status</div>
     <RadioButtonFilter filter="unpublished" siblings={["published"]}>
      Unpublished
    </RadioButtonFilter>
    <RadioButtonFilter filter="published" siblings={["unpublished"]}>
      Published
    </RadioButtonFilter>
    <div className={styles.subHeading}>Media Assets</div>
    <CheckboxFilter filter="audio">
      Includes Audio
    </CheckboxFilter>
    <CheckboxFilter filter="image">
      Includes Image(s)
    </CheckboxFilter>
     <div className={styles.subHeading}>Test Filters</div>
    <CheckboxFilter filter="body">
      Includes Body Copy
    </CheckboxFilter>
    <CheckboxFilter filter="byline">
      Includes Byline(s)
    </CheckboxFilter>
  </div>
)

export default StoryFilters
